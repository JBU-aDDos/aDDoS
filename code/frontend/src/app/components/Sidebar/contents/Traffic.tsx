import React, { useState, useEffect } from 'react';
import styles from './Traffic.module.css';

type TrafficProps = {
  setMaxValue: (value: number) => void;
  setMinValue: (value: number) => void;
  setAverageValue: (value: number) => void;
};

export default function Traffic({
  setMaxValue,
  setMinValue,
  setAverageValue,
}: TrafficProps) {
  const [timeInterval, setTimeInterval] = useState(5); // 시간 간격 (기본값: 5분)
  const [duration, setDuration] = useState(60); // 지속 시간 (기본값: 60분)
  const [randomData, setRandomData] = useState<number[]>([]);

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

  useEffect(() => {
    // 랜덤 데이터 생성
    const generateRandomData = () => {
      return Array.from({ length: timesLength }, () =>
        Math.floor(Math.random() * 101)
      ).filter((value) => !isNaN(value));
    };

    const newRandomData = generateRandomData();
    setRandomData(newRandomData);

    const maxValue = Math.max(...newRandomData);
    const minValue = Math.min(...newRandomData);
    const averageValue =
      newRandomData.reduce((sum, val) => sum + val, 0) / newRandomData.length;

    setMaxValue(maxValue);
    setMinValue(minValue);
    setAverageValue(averageValue);
  }, [
    timeInterval,
    duration,
    setMaxValue,
    setMinValue,
    setAverageValue,
    timesLength,
  ]);

  const a = times.length;
  const b = times.length > 1 ? 300 / (times.length - 1) : 0;
  const c = (a - 1) * b;

  const d = 6;
  const e = 20;
  const f = (d - 1) * e;

  return (
    <div>
      <div className={styles.graph}>
        <h3>그래프</h3>
        <svg viewBox="-20 -5 340 120" style={{ fontSize: '5px' }}>
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
              <text key={`htext-${i}`} x="-5" y={102 - e * i} textAnchor="end">
                {0 + 20 * i}
              </text>
            </React.Fragment>
          ))}
          {Array.from({ length: a }, (_, i) => (
            <React.Fragment key={`vline-${i}`}>
              <line
                x1={b * i}
                y1={100 - f}
                x2={b * i}
                y2={100}
                stroke="#ccc"
                strokeWidth="0.3"
              />
              {i < a - 1 &&
                !isNaN(randomData[i]) &&
                !isNaN(randomData[i + 1]) && (
                  <line
                    key={`line-${i}`}
                    x1={b * i}
                    y1={100 - randomData[i]}
                    x2={b * (i + 1)}
                    y2={100 - randomData[i + 1]}
                    stroke="red"
                    strokeWidth="0.8"
                  />
                )}
              {!isNaN(randomData[i]) && (
                <circle
                  key={`circle-${i}`}
                  cx={b * i}
                  cy={100 - randomData[i]}
                  r="1.1"
                  fill="red"
                />
              )}
            </React.Fragment>
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
            id="interval"
            value={timeInterval}
            onChange={handleChangeTimeInterval}
          />
        </label>
        &nbsp;
        <label>
          표기 시간 (분):
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={handleChangeDuration}
          />
        </label>
      </div>
    </div>
  );
}
