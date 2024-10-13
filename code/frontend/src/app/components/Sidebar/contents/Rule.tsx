import styles from './Rule.module.css';
import Button from '../../Button/Button';

export default function Rule() {
  return (
    <div className={styles.rule}>
      <h3>수리카타 룰 적용</h3>
      <textarea
        name="rule_input"
        id="rule_input"
        placeholder="여기에 룰을 입력해주세요"
      ></textarea>
      <div className={styles.btnWrap}>
        <Button type="submit" text="FILESAVE" />
        <Button type="submit" text="RESTART" />
        <Button type="submit" text="UPDATE" />
      </div>
    </div>
  );
}
