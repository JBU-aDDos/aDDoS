from kafka import KafkaConsumer
import json
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# 필요한 필드 정의
filtered_logs_required_fields = [
    '@timestamp', 'src_ip', 'src_port', 'dest_ip', 'dest_port', 'proto', 'tcp_flags', 'syn', 'ack',
    'state', 'reason', 'flow_id', 'app_proto', 'tcp_flags_ts', 'tcp_flags_tc', 'bytes_toserver',
    'pkts_toserver', 'bytes_toclient', 'pkts_toclient', 'start', 'end', 'age', 'http_method', 'url',
    'http_user_agent', 'status', 'length', 'http_content_type', 'query_type', 'query_name',
    'icmp_type', 'icmp_code', 'response_code', 'Network Segment', 'event_type', 'in_iface'
]

# 로그 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# MongoDB Atlas 설정
mongo_uri = "mongodb+srv://test:1234@cluster0.hqxzgtw.mongodb.net/network_catcher_database?retryWrites=true&w=majority&appName=Cluster0"
try:
    client = MongoClient(mongo_uri, tls=True, tlsAllowInvalidCertificates=True, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("MongoDB Atlas 연결 성공")
except ConnectionFailure as e:
    print("MongoDB Atlas 연결 실패: %s" % e)
    exit(1)

# 데이터베이스와 컬렉션 설정
db = client['network_catcher_database']
collection = db['traffic']

# TTL 인덱스 생성
collection.create_index([('@timestamp', 1)], expireAfterSeconds=5*24*60*60)

# Kafka 설정 및 Consumer 생성
consumer = KafkaConsumer(
    'filtered_logs',
    bootstrap_servers='localhost:9092',
    group_id='suricata_consumer_group',
    auto_offset_reset='latest',
    enable_auto_commit=True
)

def extract_filtered_data(data, required_fields):
    message_data = data.get('message')
    if message_data:
        try:
            message_json = json.loads(message_data)
            combined_data = {**data, **message_json}
            if 'timestamp' in message_json:
                combined_data['@timestamp'] = message_json['timestamp']
        except json.JSONDecodeError:
            combined_data = data
    else:
        combined_data = data
    
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
            message_value = msg.value.decode('utf-8')
            try:
                data = json.loads(message_value)
                filtered_data = extract_filtered_data(data, filtered_logs_required_fields)
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