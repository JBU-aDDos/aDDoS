import React, { useEffect, useRef, useState } from 'react';
import styles from './service.module.css';

const Service = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={ref} className={styles.explanation}>
      <div
        className={`${styles.text} ${isVisible ? styles.animate : ''} ${
          styles.one
        }`}
      >
        <p>저희 DDoS 공격 감지 및 알림 시스템은</p>
        <p>DDoS공격이 감지되면 사용자에게 알려주고</p>
        <p>트래픽을 시각화하여 볼 수 있는 대시보드를 제공합니다.</p>
      </div>
      <div
        className={`${styles.text} ${isVisible ? styles.animate : ''} ${
          styles.two
        }`}
      >
        <p>다양한 규모의 비즈니스 및 네트워크 인프라에 적용이 가능하며</p>
        <p>사용자 경험에 중점을 두어 고객에게 안정적이고</p>
        <p>빠른 서비스를 제공 합니다.</p>
      </div>
      <div
        className={`${styles.text} ${isVisible ? styles.animate : ''} ${
          styles.three
        }`}
      >
        <p>DDoS 공격 감지 프로그램을 사용하여 귀하의 네트워크를</p>
        <p>안전하게 보호하고 최상의 서비스를 느껴보세요!</p>
      </div>
    </div>
  );
};

export default Service;
