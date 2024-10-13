/*
  - Traffic: 그래프를 표현하는 컴포넌트로, 사용자가 설정한 시간 간격과 표기 시간에 따라 데이터를 시각화한다.
  - timeInterval: 시간 간격을 설정하는 상태 변수 (기본값: 5분)
  - duration: 그래프의 전체 지속 시간을 설정하는 상태 변수 (기본값: 60분)
  - handleChangeTimeInterval: 시간 간격 입력 필드의 변경을 처리하는 함수
  - inputValue: 사용자가 입력한 시간 간격 값을 숫자로 변환한 값
  - newValue: 유효한 범위(1분 ~ 10080분)로 제한된 새로운 시간 간격 값
  - setTimeInterval: 시간 간격 상태를 업데이트하는 함수
  - handleChangeDuration: 지속 시간 입력 필드의 변경을 처리하는 함수
  - setDuration: 표기 시간 상태를 업데이트하는 함수
  - endDate: 현재 시간을 기준으로 설정된 종료 시간
  - formatTime: 주어진 날짜를 "HH:mm" 형식의 문자열로 변환하는 함수
  - hours: 주어진 날짜의 시간
  - minutes: 주어진 날짜의 분, 1자리 수는 0으로 패딩
  - maxPoints: 그래프에서 표시할 최대 데이터 포인트 수 (49)
  - points: 주어진 표기 시간을 시간 간격으로 나눈 포인트 수
  - timesLength: 생성할 시간 배열의 길이, 최대 포인트 수와의 비교
  - times: 생성된 시간 배열, 지정된 형식으로 반환된 각 시간
  - generateRandomData: 랜덤 데이터 배열을 생성하는 함수
  - randomData: 랜덤 데이터 배열, 각 포인트에 대한 랜덤 값
*/

import React, { useState, useEffect } from 'react';
import styles from './Traffic.module.css';
import axios from 'axios';

type TrafficProps = {
  setMaxValue: (value: number) => void; // 최대 값 상태 업데이트 함수
  setMinValue: (value: number) => void; // 최소 값 상태 업데이트 함수
  setAverageValue: (value: number) => void; // 평균 값 상태 업데이트 함수
};

export default function Traffic({
  setMaxValue,
  setMinValue,
  setAverageValue,
}: TrafficProps) {
  const [timeInterval, setTimeInterval] = useState(5); // 시간 간격 (기본값: 5분)
  const [duration, setDuration] = useState(60); // 지속 시간 (기본값: 60분)
  const [randomData, setRandomData] = useState<number[]>([]); // 랜덤 데이터 상태

  // 시간 간격 변경 처리 함수
  const handleChangeTimeInterval = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = Number(event.target.value); // 입력 값 숫자로 변환
    const newValue = Math.min(Math.max(inputValue, 1), 10080); // 1분 ~ 10080분 범위로 제한
    setTimeInterval(newValue); // 시간 간격 상태 업데이트
  };

  // 지속 시간 변경 처리 함수
  const handleChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value); // 입력 값 숫자로 변환
    const newValue = Math.min(Math.max(inputValue, 1), 10080); // 1분 ~ 10080분 범위로 제한
    setDuration(newValue); // 지속 시간 상태 업데이트
  };

  // 현재 시간을 기준으로 한 종료 날짜 계산
  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes(), 0, 0); // 현재 분을 기준으로 정각으로 설정

  // 시간을 형식화하는 함수
  const formatTime = (date: Date) => {
    const hours = date.getHours(); // 시간 추출
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(); // 분이 1자리 수일 경우 0으로 패딩
    return `${hours}:${minutes}`; // "HH:mm" 형식 반환
  };

  // 유효한 배열 길이를 보장하기 위해 Math.max를 사용하여 0보다 작은 값을 방지
  const maxPoints = 49; // 그래프에서 표시할 최대 데이터 포인트 수
  const points = Math.max(Math.ceil(duration / timeInterval), 0); // 그래프 포인트 수 계산
  const timesLength = Math.min(points, maxPoints); // 최대 포인트 수와 비교하여 길이 결정
  const times = Array.from({ length: timesLength }, (_, i) =>
    formatTime(new Date(endDate.getTime() - timeInterval * 60000 * i))
  ); // 생성된 시간 배열, 지정된 형식으로 반환

  useEffect(() => {
    // GET 요청
    //   axios.get('http://localhost:8000/traffic-data')
    //     .then((response) => {
    //       const data = response.data;
    //       // API 응답에 따라 상태를 업데이트
    //       setMaxValue(data.max);
    //       setMinValue(data.min);
    //       setAverageValue(data.average);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching traffic data:', error);
    //     });
    // }, [setMaxValue, setMinValue, setAverageValue]);

    // 랜덤 데이터 생성 함수
    const generateRandomData = () => {
      return Array.from(
        { length: timesLength },
        () => Math.floor(Math.random() * 101) // 0 ~ 100 사이의 랜덤 값 생성
      ).filter((value) => !isNaN(value)); // NaN 제거
    };

    const newRandomData = generateRandomData(); // 랜덤 데이터 배열 생성
    setRandomData(newRandomData); // 상태 업데이트

    // 최대, 최소, 평균 값 계산
    const maxValue = Math.max(...newRandomData); // 최대 값
    const minValue = Math.min(...newRandomData); // 최소 값
    const averageValue =
      newRandomData.reduce((sum, val) => sum + val, 0) / newRandomData.length; // 평균 값

    // 상위 컴포넌트에 값 설정
    setMaxValue(maxValue);
    setMinValue(minValue);
    setAverageValue(averageValue);
  }, [
    timeInterval, // 시간 간격이 변경될 때마다 효과 실행
    duration, // 지속 시간이 변경될 때마다 효과 실행
    setMaxValue,
    setMinValue,
    setAverageValue,
    timesLength, // 생성된 시간 배열 길이
  ]);

  const a = times.length; // 시간 배열 길이
  const b = times.length > 1 ? 300 / (times.length - 1) : 0; // x축 간격 계산
  const c = (a - 1) * b; // x축 길이

  const d = 6; // y축 기준선 수
  const e = 20; // y축 간격
  const f = (d - 1) * e; // y축 높이 계산

  return (
    <div>
      <div className={styles.graph}>
        <h3>그래프</h3>
        <svg viewBox="-20 -5 340 120" style={{ fontSize: '5px' }}>
          {Array.from({ length: d }, (_, i) => (
            <React.Fragment key={`hline-${i}`}>
              <line
                x1="0"
                y1={100 - e * i} // 수평 기준선 y좌표
                x2={c} // x축 끝 좌표
                y2={100 - e * i}
                stroke="#ccc"
                strokeWidth="0.3"
              />
              <text key={`htext-${i}`} x="-5" y={102 - e * i} textAnchor="end">
                {0 + 20 * i} {/* y축 라벨 */}
              </text>
            </React.Fragment>
          ))}
          {Array.from({ length: a }, (_, i) => (
            <React.Fragment key={`vline-${i}`}>
              <line
                x1={b * i} // 수직 기준선 x좌표
                y1={100 - f}
                x2={b * i} // 수직 기준선 x좌표
                y2={100}
                stroke="#ccc"
                strokeWidth="0.3"
              />
              {i < a - 1 &&
                !isNaN(randomData[i]) && // NaN 확인 후 데이터 포인트 연결
                !isNaN(randomData[i + 1]) && (
                  <line
                    key={`line-${i}`}
                    x1={b * i} // 선의 시작 x좌표
                    y1={100 - randomData[i]} // 선의 시작 y좌표
                    x2={b * (i + 1)} // 선의 끝 x좌표
                    y2={100 - randomData[i + 1]} // 선의 끝 y좌표
                    stroke="red" // 선 색상
                    strokeWidth="0.8"
                  />
                )}
              {!isNaN(randomData[i]) && ( // 원형 데이터 포인트
                <circle
                  key={`circle-${i}`}
                  cx={b * i} // x좌표
                  cy={100 - randomData[i]} // y좌표
                  r="1.1" // 반지름
                  fill="red" // 색상
                />
              )}
            </React.Fragment>
          ))}
          {times.reverse().map((time, i) => (
            <text
              key={`time-${i}`}
              x={b * i} // x축 시간 라벨의 x좌표
              y="110" // y좌표
              textAnchor="middle"
              transform={b < 15 ? `rotate(-45, ${b * i}, 110)` : ''} // 간격이 좁아지면 회전 적용
            >
              {time} {/* x축 시간 라벨 */}
            </text>
          ))}
        </svg>
      </div>
      <div className={styles.label}>
        <label>
          시간 간격 (분):
          <input
            type="number" // 숫자 타입
            id="interval" // 시간 간격 입력 필드
            value={timeInterval} // 상태에서 가져온 값
            onChange={handleChangeTimeInterval} // 변경 시 처리
          />
        </label>
        &nbsp;
        <label>
          표기 시간 (분):
          <input
            type="number" // 숫자 타입
            id="duration" // 표기 시간 입력 필드
            value={duration} // 상태에서 가져온 값
            onChange={handleChangeDuration} // 변경 시 처리
          />
        </label>
      </div>
    </div>
  );
}
