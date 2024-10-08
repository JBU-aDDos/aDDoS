/*
  - CurrentRules: 현재 적용된 수리카타 룰을 표시하는 컴포넌트
  - CurrentRulesProps: 각 룰의 정보를 나타내는 타입 정의
  - data: 룰 정보를 담고 있는 배열, 각 룰은 명령어, 설명, 상태를 포함한다.
  - randomUUID: JavaScript의 Crypto API의 메서드로 항목을 렌더링할 때 각 항목을 고유하게 식별하기 위해 필요하다.
  - toLowerCase: status의 값을 소문자로 변환하여 클래스 이름으로 사용한다. 대소문자 구분 없이 일관된 클래스 이름을 생성하기 위해 사용한다.
*/

import styles from './CurrentRules.module.css';

interface CurrentRulesProps {
  command: string; // 수리카타 명령어
  desc: string; // 명령어 설명
  status: 'Rejected' | 'Approved' | 'Pending'; // 룰 적용 상태 (거부, 승인, 보류)
}

const data: CurrentRulesProps[] = [
  {
    command: 'msg',
    desc: '경고 이벤트 메세지',
    status: 'Rejected',
  },
  {
    command: 'sid',
    desc: '룰 식별자 (3000000번 이상 권장)',
    status: 'Approved',
  },
  {
    command: 'rev',
    desc: '룰 버전, 수정될 경우 1씩 증가',
    status: 'Rejected',
  },
  // {
  //   command: 'priority',
  //   desc: '우선 순위 (값이 작을수록 먼저 매칭) 범위 : 1~10)',
  //   status: 'Pending',
  // },
  // {
  //   command: 'classtype',
  //   desc: '스노트 룰 분류',
  //   status: 'Approved',
  // },
  // {
  //   command: 'reference',
  //   desc: '취약점 참고 배포 URL 정보',
  //   status: 'Rejected',
  // },
  // {
  //   command: 'flow',
  //   desc: '흐름 옵션 명령어',
  //   status: 'Approved',
  // },
  // {
  //   command: 'established',
  //   desc: '세션이 연결된 상태의 패켓 룰 매칭',
  //   status: 'Pending',
  // },
  // {
  //   command: 'statless',
  //   desc: '세션 연결 유무와 상관 없이 룰 매칭',
  //   status: 'Approved',
  // },
  // {
  //   command: 'http_method',
  //   desc: '페이로드 앞부분 HTTP 메소드 패턴 매칭',
  //   status: 'Pending',
  // },
];

export default function CurrentRules() {
  return (
    <div className={styles.current}>
      <h3>현재 적용된 수리카타 룰</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>명령어</th>
            <th>내용</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={crypto.randomUUID()}>
              {/* 고유한 키를 위해 랜덤 UUID 사용 */}
              <td>{item.command}</td>
              <td>{item.desc}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[item.status.toLowerCase()]
                  }`}
                >
                  {/* 상태에 따라 동적으로 클래스 이름 설정 */}
                </span>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
