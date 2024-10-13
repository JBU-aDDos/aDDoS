import React, { useState } from 'react';
import styles from './Traffic.module.css';

const Graph = () => {
  const [timeInterval, setTimeInterval] = useState(5); // 시간 간격 (기본값: 5분)
  const [duration, setDuration] = useState(60); // 지속 시간 (기본값: 60분)

  const handleChangeTimeInterval = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = Number(event.target.value);
    const newValue = Math.min(Math.max(inputValue, 1), 10080);
    setTimeInterval(newValue);
  };

  const handleChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    const newValue = Math.min(Math.max(inputValue, 1), 10080);
    setDuration(newValue);
  };

  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes(), 0, 0); // 현재 분을 기준으로 정각으로 설정

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

  const randomData = generateRandomData();

  const a = times.length;
  const b = times.length > 1 ? 300 / (times.length - 1) : 0;
  const c = (a - 1) * b;

  const d = 6;
  const e = 20;
  const f = (d - 1) * e;

  return (
    <div>
      <div className={styles.graph}>
        <h1>로그</h1>
        <svg viewBox="-110 -10 500 130" style={{ fontSize: '5px' }}>
          {Array.from({ length: d }, (_, i) => (
            <React.Fragment key={`hline-${i}`}>
              <line
                x1="0"
                y1={100 - e * i}
                x2={c}
                y2={100 - e * i}
                stroke="#ccc"
                strokeWidth="0.3"
              />
              <text x="-5" y={102 - e * i} textAnchor="end">
                {0 + 20 * i}
              </text>
            </React.Fragment>
          ))}
          {Array.from({ length: a }, (_, i) => (
            <>
              <line
                key={`vline-${i}`}
                x1={b * i}
                y1={100 - f}
                x2={b * i}
                y2={100}
                stroke="#ccc"
                strokeWidth="0.3"
              />
              {i < a - 1 && (
                <line
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
              transform={b < 15 ? `rotate(-45, ${b * i}, 110)` : ''}
            >
              {time}
            </text>
          ))}
        </svg>
      </div>
      <div className={styles.label}>
        <label>
          시간 간격 (분):
          <input
            type="number"
            value={timeInterval}
            onChange={handleChangeTimeInterval}
          />
        </label>
        &nbsp;
        <label>
          표기 시간 (분):
          <input
            type="number"
            value={duration}
            onChange={handleChangeDuration}
          />
        </label>
        {/* {b} */}
      </div>
    </div>
  );
};

export default Graph;
