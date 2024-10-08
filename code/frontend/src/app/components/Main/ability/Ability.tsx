/*
  - Ability: 메인페이지에서 프로젝트의 기능과 관련된 이미지와 설명을 표시하는 컴포넌트
  - AbilityProps: 컴포넌트에 필요한 속성 정의
  - observer: 요소가 화면에 보이는지 여부를 감지하는 기능
*/

import { useEffect, useState, useRef } from 'react';
import styles from './Ability.module.css';
import Image from 'next/image';

interface AbilityProps {
  src: string; // 이미지 경로
  alt: string; // 이미지의 대체 텍스트
  description: string; // 이미지에 대한 설명
}

const Ability = ({ src, alt, description }: AbilityProps) => {
  const [isVisible, setIsVisible] = useState(false); // 요소가 화면에 보이는지 여부를 저장하는 상태값
  const ref = useRef<HTMLDivElement>(null); // DOM 요소에 대한 참조를 저장하는 ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // 요소가 화면에 보이면 isVisible을 true로 설정
        });
      },
      {
        threshold: 0.1, // 요소의 10%가 보여질 때 애니메이션을 시작합니다.
      }
    );

    if (ref.current) {
      observer.observe(ref.current); // ref로 참조된 DOM 요소를 관찰
    }

    return () => {
      if (ref.current) {
        observer.disconnect(); // 컴포넌트가 언마운트될 때 관찰을 중단
      }
    };
  }, []);

  return (
    <div
      ref={ref} // 해당 요소를 ref로 참조
      className={`${styles.ability} ${isVisible ? styles.animate : ''}`} // 요소가 보이면 애니메이션 클래스 추가
    >
      <div className={styles.image}>
        <Image
          src={src} //표시할 이미지의 경로
          alt={alt} // 이미지가 로드되지 않거나 접근성에 필요한 대체 텍스트
          fill // 부모 요소의 크기에 맞게 이미지를 꽉 채우는 속성
          priority // 이미지의 로딩 우선 순위를 높이는 속성, 중요한 이미지에 사용
          sizes="100vh"
        />
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Ability;
