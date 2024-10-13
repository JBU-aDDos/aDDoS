/*
  - Myinfo: 내정보 컴포넌트, 사용자의 정보와 프로필 사진을 관리한다.
  - handleImageChange: 이미지 파일 입력 필드의 변경을 처리하는 함수
  - event: 변경 이벤트 객체
  - reader: FileReader 객체, 파일을 비동기로 읽기 위해 사용
  - result: 읽은 이미지 파일의 데이터 URL
*/

'use client';
import { useState } from 'react';
import styles from './Myinfo.module.css';
import Image from 'next/image';
// import Button from '../../Button/Button';

export default function Myinfo() {
  const [image, setImage] = useState('/assets/user.png'); // 프로필 사진을 저장하는 상태 변수
  // const [introduction, setIntroduction] =
  //   useState('여기에 사용자 소개를 적어주세요.');
  // const [tempIntroduction, setTempIntroduction] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string; // 읽은 결과를 문자열로 변환
        setImage(result); // 프로필 사진 상태 업데이트
      };

      reader.readAsDataURL(event.target.files[0]); // 선택한 파일을 데이터 URL로 읽기
    }
  };

  // const handleSubmitIntroduction = () => {
  //   setIntroduction(tempIntroduction);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <Image
            src={image} // 현재 프로필 사진
            alt="프로필사진" // 이미지 대체 텍스트
            className={styles.avatar}
            width={80}
            height={80}
          />
        </div>
        <label htmlFor="imageInput" className={styles.changeImageButton}>
          이미지 변경
          <input
            id="imageInput" // 이미지 입력 필드 ID
            type="file" // 파일 선택 유형
            accept="image/*" // 이미지 파일만 선택 가능
            onChange={handleImageChange} // 이미지 변경 시 처리 함수
            style={{ display: 'none' }} // 파일 입력 필드 숨김
          />
        </label>
      </div>

      <table className={styles.infoSection}>
        <tr>
          <td className={styles.label}>이메일</td>
          <td className={styles.data}>user@example.com</td>
        </tr>
        <tr>
          <td className={styles.label}>이름</td>
          <td className={styles.data}>UserName</td>
        </tr>
        <tr>
          <td className={styles.label}>직책</td>
          <td className={styles.data}>관리자</td>
        </tr>
        <tr>
          <td className={styles.label}>서버</td>
          <td className={styles.data}>aDDoS.com</td>
        </tr>
      </table>
      {/* <textarea
        className={styles.introductionInput}
        placeholder="소개를 수정하세요."
        value={tempIntroduction}
        onChange={(e) => setTempIntroduction(e.target.value)}
      />
      <Button
        type="submit"
        text="수정하기"
        onClick={handleSubmitIntroduction}
      /> */}
    </div>
  );
}
