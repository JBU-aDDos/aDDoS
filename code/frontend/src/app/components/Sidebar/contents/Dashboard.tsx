/*
  - Dashboard: 대시보드 페이지로, 여러 섹션을 포함한 메인 컴포넌트. 체크박스 옵션에 따라 다양한 트래픽과 통계 데이터를 시각화한다.
  - handleCheckboxChange: 체크박스 상태를 변경하는 함수로, 선택한 옵션에 따라 대시보드의 콘텐츠를 동적으로 업데이트한다.
*/

import { useState } from 'react';

import styles from './Dashboard.module.css';
import Dropdown from './Dropdown';
import Traffic from './Traffic';
import Total from './Total';
import Rule from './Rule';
import CurrentRules from './CurrentRules';

export default function Dashboard() {
  // 각 상태 값은 최대, 최소, 평균값을 저장하는 state
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [averageValue, setAverageValue] = useState(0);

  // 체크박스 상태를 관리하는 state이다. 옵션별로 true/false 값을 가짐.
  const [checkedOptions, setCheckedOptions] = useState({
    option1: true,
    option2: false,
    option3: false,
    option4: false,
  });

  // 체크박스 선택 시 호출되는 함수로, 선택된 옵션의 상태를 변경한다.
  const handleCheckboxChange = (option: string, checked: boolean) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [option]: checked,
    }));
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sectionWrap}>
        {/* 체크박스 옵션을 선택할 수 있는 드롭다운 메뉴 */}
        <div className={`${styles.section1} ${styles.hidden}`}>
          <div className={styles.section0}>
            <Dropdown
              onCheckboxChange={handleCheckboxChange}
              checkedOptions={checkedOptions}
            />
          </div>
        </div>
        <div className={`${styles.section2} ${styles.hidden}`}></div>

        {/* 선택된 옵션에 따라 Traffic 및 Total 컴포넌트를 표시 */}
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

        {/* Rule 컴포넌트와 CurrentRules 컴포넌트는 하단에 항상 표시 */}
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
