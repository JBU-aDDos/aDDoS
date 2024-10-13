'use client';
import { useState } from 'react';
import styles from './Myinfo.module.css';
import Image from 'next/image';
// import Button from '../../Button/Button';

export default function Myinfo() {
  const [image, setImage] = useState('/assets/user.png');
  // const [introduction, setIntroduction] =
  //   useState('여기에 사용자 소개를 적어주세요.');
  // const [tempIntroduction, setTempIntroduction] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        setImage(result);
      };

      reader.readAsDataURL(event.target.files[0]);
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
            src={image}
            alt="프로필사진"
            className={styles.avatar}
            width={80}
            height={80}
          />
        </div>
        <label htmlFor="imageInput" className={styles.changeImageButton}>
          이미지 변경
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
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
