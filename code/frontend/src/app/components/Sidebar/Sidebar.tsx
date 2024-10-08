/*
  - Sidebar: 사이드바 컴포넌트로, 대시보드와 내 정보 컴포넌트를 선택하여 표시한다.
  - ActiveComponent: 활성화된 컴포넌트의 타입을 정의한다.
  - Button: 사이드바에서 사용되는 버튼의 타입을 정의한다.
  - buttons: 사이드바에 표시될 버튼 목록을 정의한 배열.
  - toggleSidebar: 사이드바의 열림/닫힘 상태를 토글하는 함수.
  - changeComponent: 활성화된 컴포넌트를 변경하는 함수.
  - renderComponent: 현재 활성화된 컴포넌트를 메모이제이션하여 반환한다.
  - SlGraph: 대시보드 아이콘
  - CgProfile: 내정보 아이콘
*/

'use client';

import React, { useState, useMemo } from 'react';
import styles from './Sidebar.module.css';
// import Traffic from './contents/Traffic';
import Dashboard from './contents/Dashboard';
import Myinfo from './contents/Myinfo';
import { SlGraph } from 'react-icons/sl';
import { CgProfile } from 'react-icons/cg';

type ActiveComponent = 'Dashboard' | 'Myinfo'; //| null;

interface Button {
  id: ActiveComponent; // 버튼 ID
  label: string; // 버튼 레이블
}

const buttons: Button[] = [
  // { id: 'Traffic', label: '트래픽' },
  { id: 'Dashboard', label: '대시보드' },
  { id: 'Myinfo', label: '내정보' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false); // 사이드바 열림 상태
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>('Dashboard'); // 활성화된 컴포넌트 상태

  // 사이드바 열기/닫기 토글 함수
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 사이드바 열기/닫기 토글 함수
  const changeComponent = (component: ActiveComponent) => {
    setActiveComponent(component);
  };

  // 활성화된 컴포넌트를 렌더링하는 메모이제이션
  const renderComponent = useMemo(() => {
    switch (activeComponent) {
      // case 'Traffic':
      //   return <Traffic />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Myinfo':
        return <Myinfo />;
      default:
        return <Dashboard />; // 기본값이거나 선택하지 않았을 때는 대시보드를 렌더링
    }
  }, [activeComponent]);

  return (
    <div>
      <div
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={toggleSidebar} // 클릭 시 사이드바 열기/닫기
      >
        <div className={`${styles.line1}`}></div>
        <div className={`${styles.line2}`}></div>
        <div className={`${styles.line3}`}></div>
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => changeComponent(button.id)} // 버튼 클릭 시 활성화된 컴포넌트 변경
            className={styles.sidebarLink}
          >
            <span className={styles.icon}>
              {button.id === 'Dashboard' && <SlGraph />}
              {/* 대시보드 아이콘*/}
              {button.id === 'Myinfo' && <CgProfile />}
              {/* 내정보 아이콘*/}
            </span>
            {button.label}
          </button>
        ))}
      </div>
      {renderComponent}
    </div>
  );
}
