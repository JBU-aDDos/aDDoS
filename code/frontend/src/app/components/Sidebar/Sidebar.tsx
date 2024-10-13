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
  id: ActiveComponent;
  label: string;
}

const buttons: Button[] = [
  // { id: 'Traffic', label: '트래픽' },
  { id: 'Dashboard', label: '대시보드' },
  { id: 'Myinfo', label: '내정보' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] =
    useState<ActiveComponent>('Dashboard');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const changeComponent = (component: ActiveComponent) => {
    setActiveComponent(component);
  };

  const renderComponent = useMemo(() => {
    switch (activeComponent) {
      // case 'Traffic':
      //   return <Traffic />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Myinfo':
        return <Myinfo />;
      default:
        return <Dashboard />; // 기본값이거나 선택하지 않았을 때는 아무것도 렌더링하지 않습니다.
    }
  }, [activeComponent]);

  return (
    <div>
      <div
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={toggleSidebar}
      >
        <div className={`${styles.line1}`}></div>
        <div className={`${styles.line2}`}></div>
        <div className={`${styles.line3}`}></div>
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => changeComponent(button.id)}
            className={styles.sidebarLink}
          >
            <span className={styles.icon}>
              {button.id === 'Dashboard' && <SlGraph />}
              {button.id === 'Myinfo' && <CgProfile />}
            </span>
            {button.label}
          </button>
        ))}
      </div>
      {renderComponent}
    </div>
  );
}
