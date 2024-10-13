import styles from './CurrentRules.module.css';

interface Order {
  command: string;
  desc: string;
  status: 'Rejected' | 'Approved' | 'Pending';
}

const data: Order[] = [
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
              <td>{item.command}</td>
              <td>{item.desc}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[item.status.toLowerCase()]
                  }`}
                ></span>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
