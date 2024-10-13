import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import { BsListCheck } from 'react-icons/bs';

interface DropdownProps {
  onCheckboxChange: (option: string, checked: boolean) => void;
  checkedOptions: { [key: string]: boolean }; // 체크 상태를 위한 props 추가
}

export default function Dropdown({
  onCheckboxChange,
  checkedOptions,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    onCheckboxChange(value, checked); // 상위 컴포넌트에 체크 상태 전달
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <h3 className={styles.dropdownTitle}>표시할 그래프 목록</h3>
      <button className={styles.Toggle} onClick={toggleDropdown}>
        <BsListCheck size={40} color="#555555" />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <label>
            <input
              type="checkbox"
              value="option1"
              checked={checkedOptions.option1} // 체크 상태 유지
              onChange={handleCheckboxChange}
            />
            &nbsp;pkts_toserver: 서버로 전송된 패킷 수
          </label>
          <label>
            <input
              type="checkbox"
              value="option2"
              checked={checkedOptions.option2} // 체크 상태 유지
              onChange={handleCheckboxChange}
            />
            &nbsp;pkts_toclient: 클라이언트로 전송된 패킷 수
          </label>
          <label>
            <input
              type="checkbox"
              value="option3"
              checked={checkedOptions.option3} // 체크 상태 유지
              onChange={handleCheckboxChange}
            />
            &nbsp;bytes_toserver: 서버로 전송된 바이트 수
          </label>
          <label>
            <input
              type="checkbox"
              value="option4"
              checked={checkedOptions.option4} // 체크 상태 유지
              onChange={handleCheckboxChange}
            />
            &nbsp;bytes_toclient: 클라이언트로 전송된 바이트 수
          </label>
        </div>
      )}
    </div>
  );
}
