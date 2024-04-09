import re
import pandas as pd
import os.path

#로그 데이터를 확인하고 추출하고 싶은 데이터만 정규표현식을 이용해서 추출
#시간, 웹서버요청정보, 요청결과, 크기
pattern = re.compile( '^\S+ \S+ \S+ \[(.*)\] "(.*)" (\S+) (\S+) ".*"$')
    
def parse_access_log( path ):
    for line in open( path ):
        for m in pattern.finditer( line ):
            yield m.groups()

#데이터프레임 만들기
columns = [ 'time', 'request', 'status', 'bytes' ]
df = pd.DataFrame( parse_access_log( 'access.log' ), columns=columns )
#print( df )

#시간을 보기쉽게 형식 변경
df.time = pd.to_datetime( df.time, format='%d/%b/%Y:%X', exact=False )
print( df.head( 5 ) )

#데이터프레임을 csv파일로 저장
file = '.\\access_log.csv'
if os.path.isfile( file ):
    os.remove( file )
df.to_csv( 'access_log.csv', index=False )