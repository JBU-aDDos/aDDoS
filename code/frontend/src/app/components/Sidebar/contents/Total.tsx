/*
  - Total: 그래프의 통계 정보를 표시하는 컴포넌트
  - TotalProps: 컴포넌트에 전달되는 props의 타입 정의
  - toFixed(2): 소수점 둘째 자리까지 표시
*/

import styles from './Total.module.css';

type TotalProps = {
  maxValue: number; // 최대값
  minValue: number; // 최소값
  averageValue: number; // 평균값
};

export default function Total({
  maxValue,
  minValue,
  averageValue,
}: TotalProps) {
  return (
    <div className={styles.Total}>
      <h3>트래픽</h3>
      <div className={styles.highcontainer}>
        <div className={styles.stat}>
          <div className={`${styles.dot} ${styles.high}`}></div>
          <div>High Point: {maxValue}</div>
        </div>
      </div>
      <div className={styles.lowcontainer}>
        <div className={styles.stat}>
          <div className={`${styles.dot} ${styles.low}`}></div>
          <div>Low Point: {minValue}</div>
        </div>
      </div>
      <div className={styles.averagecontainer}>
        <div className={styles.stat}>
          <div className={`${styles.dot} ${styles.average}`}></div>
          <div>Average Point: {averageValue.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
