import { useState } from 'react';

import styles from './Dashboard.module.css';
import Dropdown from './Dropdown';
import Traffic from './Traffic';
import Total from './Total';
import Rule from './Rule';
import CurrentRules from './CurrentRules';

export default function Dashboard() {
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [averageValue, setAverageValue] = useState(0);
  const [checkedOptions, setCheckedOptions] = useState({
    option1: true,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleCheckboxChange = (option: string, checked: boolean) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [option]: checked,
    }));
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sectionWrap}>
        <div className={`${styles.section1} ${styles.hidden}`}>
          <div className={styles.section0}>
            <Dropdown
              onCheckboxChange={handleCheckboxChange}
              checkedOptions={checkedOptions}
            />
          </div>
        </div>
        <div className={`${styles.section2} ${styles.hidden}`}></div>

        {checkedOptions.option1 && (
          <>
            <div className={styles.section1}>
              <Traffic
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
                setAverageValue={setAverageValue}
              />
            </div>
            <div className={styles.section2}>
              <Total
                maxValue={maxValue}
                minValue={minValue}
                averageValue={averageValue}
              />
            </div>
          </>
        )}

        {checkedOptions.option2 && (
          <>
            <div className={styles.section1}>
              <Traffic
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
                setAverageValue={setAverageValue}
              />
            </div>
            <div className={styles.section2}>
              <Total
                maxValue={maxValue}
                minValue={minValue}
                averageValue={averageValue}
              />
            </div>
          </>
        )}

        {checkedOptions.option3 && (
          <>
            <div className={styles.section1}>
              <Traffic
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
                setAverageValue={setAverageValue}
              />
            </div>
            <div className={styles.section2}>
              <Total
                maxValue={maxValue}
                minValue={minValue}
                averageValue={averageValue}
              />
            </div>
          </>
        )}

        {checkedOptions.option4 && (
          <>
            <div className={styles.section1}>
              <Traffic
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
                setAverageValue={setAverageValue}
              />
            </div>
            <div className={styles.section2}>
              <Total
                maxValue={maxValue}
                minValue={minValue}
                averageValue={averageValue}
              />
            </div>
          </>
        )}

        <div className={styles.section3}>
          <Rule />
        </div>
        <div className={styles.section4}>
          <CurrentRules />
        </div>
      </div>
    </div>
  );
}
