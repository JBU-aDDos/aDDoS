from kafka import KafkaConsumer
import json
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from datetime import datetime, timezone, timedelta

# 필요한 필드 정의
filtered_logs_required_fields = [
    '@timestamp', 'src_ip', 'src_port', 'dest_ip', 'dest_port', 'proto', 'tcp_flags', 'syn', 'ack',
    'state', 'reason', 'flow_id', 'app_proto', 'tcp_flags_ts', 'tcp_flags_tc', 'bytes_toserver',
    'pkts_toserver', 'bytes_toclient', 'pkts_toclient', 'start', 'end', 'age', 'http_method', 'url',
    'http_user_agent', 'status', 'length', 'http_content_type', 'query_type', 'query_name',
    'icmp_type', 'icmp_code', 'response_code', 'Network Segment', 'event_type', 'in_iface' 
]

# 로그 설정
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# MongoDB Atlas 설정
mongo_uri = "[mongo uri]"
try:
    client = MongoClient(mongo_uri, tls=True, tlsAllowInvalidCertificates=True, serverSelectionTimeoutMS=5000)
    # 서버 상태 확인
    client.admin.command('ping')
    print("MongoDB Atlas 연결 성공")
except ConnectionFailure as e:
    print("MongoDB Atlas 연결 실패: %s" % e)
    exit(1)

# 데이터베이스와 컬렉션 설정
db = client['[db name]']
collection = db['[collection name]']

# TTL 인덱스 생성
collection.create_index([('@timestamp', 1)], expireAfterSeconds=5*24*60*60)

# Kafka 설정 및 Consumer 생성
consumer = KafkaConsumer(
    ["kafka 설정"]
)

def extract_filtered_data(data, required_fields):
    # 'message' 필드가 JSON 문자열인 경우, 이를 파싱하여 추가 필드를 포함한 딕셔너리 생성
    message_data = data.get('message')
    if message_data:
        try:
            message_json = json.loads(message_data)
            # 'message' 데이터와 주 데이터에서 필드 추출
            combined_data = {**data, **message_json}
            # 'message' 안의 'timestamp' 값을 '@timestamp'로 설정
            if 'timestamp' in message_json:
                combined_data['@timestamp'] = message_json['timestamp']
        except json.JSONDecodeError:
            # 'message' 필드가 JSON 형식이 아닐 경우 원본 데이터 반환
            combined_data = data
    else:
        combined_data = data
    
    # 각 필드의 값을 데이터에서 추출
    filtered_data = {}
    for field in required_fields:
        if field in combined_data:
            filtered_data[field] = combined_data[field]
        elif field in combined_data.get('tcp', {}):
            filtered_data[field] = combined_data['tcp'].get(field)
        elif field in combined_data.get('flow', {}):
            filtered_data[field] = combined_data['flow'].get(field)
        elif field in combined_data.get('http', {}):
            filtered_data[field] = combined_data['http'].get(field)
        elif field in combined_data.get('fileinfo', {}):
            filtered_data[field] = combined_data['fileinfo'].get(field)
        else:
            filtered_data[field] = None

    return filtered_data

try:
    for msg in consumer:
        if msg.value:
            # 메시지 값을 문자열로 디코딩
            message_value = msg.value.decode('utf-8')
            logging.debug("수신한 메시지: %s", message_value)
            try:
                # JSON 데이터로 파싱
                data = json.loads(message_value)
                logging.debug("파싱된 JSON 데이터: %s", json.dumps(data, indent=2, ensure_ascii=False))
                
                # 필터링된 데이터 추출
                filtered_data = extract_filtered_data(data, filtered_logs_required_fields)
                logging.debug("추출된 데이터: %s", json.dumps(filtered_data, indent=2, ensure_ascii=False))
                
                # MongoDB에 필터링된 데이터 삽입
                collection.insert_one(filtered_data)

            except json.JSONDecodeError as e:
                logging.error("JSON 디코딩 오류: %s", e)
        else:
            logging.debug("빈 메시지 수신")

except KeyboardInterrupt:
    logging.info("Consumer 종료")
finally:
    consumer.close()
    client.close()