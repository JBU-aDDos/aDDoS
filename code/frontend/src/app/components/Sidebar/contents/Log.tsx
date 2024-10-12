/*
  - Graph: 그래프를 표현하는 컴포넌트로, 사용자가 설정한 시간 간격과 표기 시간에 따라 데이터를 시각화한다.
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

import React, { useState } from 'react';
import styles from './Traffic.module.css';

const Graph = () => {
  const [timeInterval, setTimeInterval] = useState(5); // 시간 간격 (기본값: 5분)
  const [duration, setDuration] = useState(60); // 지속 시간 (기본값: 60분)

  // 시간 간격 변경 처리
  const handleChangeTimeInterval = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = Number(event.target.value);
    const newValue = Math.min(Math.max(inputValue, 1), 10080);
    setTimeInterval(newValue);
  };

  // 지속 시간 변경 처리
  const handleChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    const newValue = Math.min(Math.max(inputValue, 1), 10080);
    setDuration(newValue);
  };

  // 현재 시간을 기준으로 한 종료 날짜 계산
  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes(), 0, 0); // 현재 분을 기준으로 정각으로 설정

  // 시간을 형식화하는 함수
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  };

  // 유효한 배열 길이를 보장하기 위해 Math.max를 사용하여 0보다 작은 값을 방지
  const maxPoints = 49;
  const points = Math.max(Math.ceil(duration / timeInterval), 0);
  const timesLength = Math.min(points, maxPoints);
  const times = Array.from({ length: timesLength }, (_, i) =>
    formatTime(new Date(endDate.getTime() - timeInterval * 60000 * i))
  );

  // 랜덤 데이터 생성
  const generateRandomData = () => {
    return Array.from({ length: timesLength }, () =>
      Math.floor(Math.random() * 101)
    );
  };

  const randomData = generateRandomData(); // 랜덤 배열 생성

  const a = times.length; // 시간 배열 길이
  const b = times.length > 1 ? 300 / (times.length - 1) : 0; // x축 간격 계산
  const c = (a - 1) * b; // x축 길이

  const d = 6; // y축 기준선 수
  const e = 20; // y축 간격
  const f = (d - 1) * e; // y축 높이 계산

  return (
    <div>
      <div className={styles.graph}>
        <h1>로그</h1>
        <svg viewBox="-110 -10 500 130" style={{ fontSize: '5px' }}>
          {Array.from({ length: d }, (_, i) => (
            <React.Fragment key={`hline-${i}`}>
              <line // 수평 기준선
                x1="0"
                y1={100 - e * i}
                x2={c}
                y2={100 - e * i}
                stroke="#ccc"
                strokeWidth="0.3"
              />
              <text x="-5" y={102 - e * i} textAnchor="end">
                {0 + 20 * i} {/* y축 라벨 */}
              </text>
            </React.Fragment>
          ))}
          {Array.from({ length: a }, (_, i) => (
            <>
              <line // 수직 기준선
                key={`vline-${i}`}
                x1={b * i}
                y1={100 - f}
                x2={b * i}
                y2={100}
                stroke="#ccc"
                strokeWidth="0.3"
              />
              {i < a - 1 && (
                <line // 데이터 포인트 연결 선
                  key={`line-${i}`}
                  x1={b * i}
                  y1={100 - randomData[i]}
                  x2={b * (i + 1)}
                  y2={100 - randomData[i + 1]}
                  stroke="blue"
                  strokeWidth="0.8"
                />
              )}
              <circle
                cx={b * i}
                cy={100 - randomData[i]} // 랜덤 데이터 값을 y 좌표로 사용
                r="1.1"
                fill="blue"
              />
            </>
          ))}
          {times.reverse().map((time, i) => (
            <text
              key={`time-${i}`}
              x={b * i}
              y="110"
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
            value={timeInterval} // 시간 간격 입력 필드
            onChange={handleChangeTimeInterval} // 변경 시 처리
          />
        </label>
        &nbsp;
        <label>
          표기 시간 (분):
          <input
            type="number" // 숫자 타입
            value={duration} // 표기 시간 입력 필드
            onChange={handleChangeDuration} // 변경 시 처리
          />
        </label>
        {/* {b} */}
      </div>
    </div>
  );
};

export default Graph;
