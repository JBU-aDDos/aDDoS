import csv
import json

# CSV 파일 경로
csv_file_path = '../access_log.csv'
# JSON 파일 경로
json_file_path = '../access_log.json'

# CSV 파일을 열고 각 행을 JSON 형식으로 변환하여 JSON 파일에 저장
with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
    reader = csv.DictReader(csv_file)
    json_data = [row for row in reader]

# JSON 파일에 데이터 쓰기
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, ensure_ascii=False, indent=4)
