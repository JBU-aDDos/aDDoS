/*
  - Rule: 수리카타 룰을 적용하는 컴포넌트
*/

import styles from './Rule.module.css';
import Button from '../../Button/Button';

export default function Rule() {
  return (
    <div className={styles.rule}>
      <h3>수리카타 룰 적용</h3>
      <textarea
        name="rule_input" // 텍스트 영역의 이름
        id="rule_input" // 텍스트 영역의 ID
        placeholder="여기에 룰을 입력해주세요" // 안내 텍스트
      ></textarea>
      <div className={styles.btnWrap}>
        <Button type="submit" text="FILESAVE" />
        {/* 파일 저장 버튼 */}
        <Button type="submit" text="RESTART" />
        {/* 리스타트 버튼 */}
        <Button type="submit" text="UPDATE" />
        {/* 업데이트 버튼 */}
      </div>
    </div>
  );
}
