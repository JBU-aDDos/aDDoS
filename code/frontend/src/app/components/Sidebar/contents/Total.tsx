import styles from './Total.module.css';

type TotalProps = {
  maxValue: number;
  minValue: number;
  averageValue: number;
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
