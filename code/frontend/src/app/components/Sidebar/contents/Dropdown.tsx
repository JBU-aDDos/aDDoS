/*
  - Dropdown: 화면에 표시할 그래프를 선택할 수 있는 드롭다운 컴포넌트
  - DropdownProps: 부모 컴포넌트에서 전달되는 체크박스 변경 함수와 체크 상태를 받음
  - onCheckboxChange: 체크박스 상태가 변경될 때, 해당 변경된 상태를 부모 컴포넌트로 전달하는 함수
  - isOpen: 드롭다운이 열려 있는지를 나타내는 상태
  - dropdownRef: 드롭다운 외부 클릭 감지를 위한 참조 변수
  - toggleDropdown: 드롭다운을 열거나 닫는 함수
  - handleClickOutside: 드롭다운 외부 클릭 시 닫기 위한 함수
  - BsListCheck: 드롭다운 버튼 아이콘
*/

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
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태 관리
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 영역 참조

  // 드롭다운을 열거나 닫는 함수
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 드롭다운 외부를 클릭했을 때 닫히도록 설정
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) // 사용자가 드롭다운 외부를 클릭했는지를 확인하는 데 사용
    ) {
      setIsOpen(false);
    }
  };

  // 외부 클릭 감지 이벤트 리스너 등록 및 해제
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 체크박스 변경 시 상위 컴포넌트에 체크 상태를 전달
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
              type="checkbox" // 체크박스 타입 지정
              value="option1" // 체크박스에 대한 고유 값 설정
              checked={checkedOptions.option1} // 체크박스 상태 반영
              onChange={handleCheckboxChange} // 체크박스 상태가 변경되었을 때 실행할 함수
            />
            &nbsp;pkts_toserver: 서버로 전송된 패킷 수
          </label>
          <label>
            <input
              type="checkbox" // 체크박스 타입 지정
              value="option2" // 체크박스에 대한 고유 값 설정
              checked={checkedOptions.option2} // 체크박스 상태 반영
              onChange={handleCheckboxChange} // 체크박스 상태가 변경되었을 때 실행할 함수
            />
            &nbsp;pkts_toclient: 클라이언트로 전송된 패킷 수
          </label>
          <label>
            <input
              type="checkbox" // 체크박스 타입 지정
              value="option3" // 체크박스에 대한 고유 값 설정
              checked={checkedOptions.option3} // 체크박스 상태 반영
              onChange={handleCheckboxChange} // 체크박스 상태가 변경되었을 때 실행할 함수
            />
            &nbsp;bytes_toserver: 서버로 전송된 바이트 수
          </label>
          <label>
            <input
              type="checkbox" // 체크박스 타입 지정
              value="option4" // 체크박스에 대한 고유 값 설정
              checked={checkedOptions.option4} // 체크박스 상태 반영
              onChange={handleCheckboxChange} // 체크박스 상태가 변경되었을 때 실행할 함수
            />
            &nbsp;bytes_toclient: 클라이언트로 전송된 바이트 수
          </label>
        </div>
      )}
    </div>
  );
}
