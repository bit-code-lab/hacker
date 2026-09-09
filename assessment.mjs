export const levels = ['입문', '초급', '중급', '고급'];
export const assessmentVersion = 1;
export const questions = [
  { prompt: '허가받지 않은 사람이 비공개 문서를 읽었습니다. 가장 직접적으로 침해된 보안 목표는?', options: ['가용성', '기밀성', '성능'], answer: 1, why: '기밀성은 허가받지 않은 사람에게 정보가 노출되지 않도록 하는 목표입니다.' },
  { prompt: 'HTTPS를 사용하는 사이트에 대해 옳은 설명은?', options: ['모든 콘텐츠가 안전하다는 뜻이다', '애플리케이션 취약점이 없다', '통신은 보호되지만 애플리케이션 취약점은 남을 수 있다'], answer: 2, why: 'TLS는 전송 구간을 보호하며, 서버의 권한 검사나 코드의 안전성은 별도로 검토해야 합니다.' },
  { prompt: '다른 사람이 운영하는 웹사이트를 보안 실습 대상으로 삼으려면?', options: ['대상과 범위에 대한 명시적인 허가를 먼저 받는다', '공개된 주소면 바로 테스트한다', '로그인 화면이 없으면 허가가 필요 없다'], answer: 0, why: '접속할 수 있다는 사실은 보안 테스트를 허가받았다는 의미가 아닙니다.' },
  { prompt: '로그인한 학생이 다른 학생의 과제를 수정하지 못하도록 하려면?', options: ['수정 버튼만 숨긴다', '서버가 매 요청마다 해당 과제의 수정 권한을 확인한다', '과제 주소를 길게 만든다'], answer: 1, why: '인증된 사용자라도 자원별 인가가 필요합니다. UI를 숨기는 것으로 요청을 막을 수 없습니다.' },
  { prompt: 'SQL에 검색어를 안전하게 전달하는 기본 방법은?', options: ['따옴표를 삭제한다', '문자열로 이어 붙인다', '매개변수 바인딩을 사용한다'], answer: 2, why: '매개변수 쿼리는 SQL 구조와 입력 데이터를 분리합니다.' },
  { prompt: '사용자 댓글을 HTML 해석 없이 일반 텍스트로 출력하려면?', options: ['textContent를 사용한다', 'innerHTML에 그대로 넣는다', 'eval로 실행한다'], answer: 0, why: '일반 텍스트를 표시하는 이 상황에서는 textContent가 적절합니다.' },
  { prompt: '쿠키 기반 로그인에서 CSRF 방어를 설계할 때 적절한 접근은?', options: ['HTTPS만 적용한다', '요청 유형에 맞는 CSRF 토큰 검증과 SameSite 등의 방어를 적용한다', '버튼 이름을 무작위로 바꾼다'], answer: 1, why: '브라우저는 쿠키를 자동으로 보낼 수 있습니다. HTTPS만으로 교차 사이트 요청 위조가 방지되지는 않습니다.' },
  { prompt: '접근 제어 회귀 테스트에 꼭 포함할 경우는?', options: ['관리자 로그인 성공만 검사', '첫 화면이 열리는지만 검사', '비로그인과 다른 소유자 계정의 요청이 거부되는지 검사'], answer: 2, why: '정상 경로와 함께 권한이 없는 사용자의 작업이 차단되고 원본이 유지되는지 검사해야 합니다.' },
  { prompt: '사용자 입력으로 정렬할 SQL 열 이름을 고르게 해야 합니다. 안전한 설계는?', options: ['허용 목록의 고정된 열 이름에 매핑한다', '임의 입력을 SQL에 직접 붙인다', '문자열 값을 바인딩하는 것만으로 열 이름도 선택할 수 있다고 가정한다'], answer: 0, why: '열 이름 등 SQL 식별자는 일반적인 값 매개변수와 다릅니다. 허용된 고정 식별자에 매핑하세요.' },
  { prompt: '위협 모델에서 신뢰 경계를 표시하는 핵심 이유는?', options: ['페이지 색상을 정하기 위해', '데이터가 서로 다른 신뢰 수준을 넘을 때 필요한 검증을 찾기 위해', '모든 공격을 자동 차단하기 위해'], answer: 1, why: '신뢰 경계는 입력 검증, 인증, 인가가 필요한 지점을 찾는 데 도움을 줍니다.' },
  { prompt: '송금 승인을 받은 뒤 수취인 정보가 바뀌었습니다. 서버는 어떻게 처리해야 할까요?', options: ['기존 승인을 그대로 재사용한다', '화면의 경고만 바꾼다', '기존 승인을 무효화하고 변경된 거래에 대한 승인을 다시 확인한다'], answer: 2, why: '거래 승인은 승인받은 구체적인 거래 데이터와 결합되어야 합니다.' },
  { prompt: '보안 수정의 검증이 완료됐다고 판단할 가장 좋은 근거는?', options: ['원래 재현 조건과 변형 조건은 차단되고 정상 작업은 유지되는 테스트', '오류 메시지가 사라진 화면', '취약한 함수의 이름 변경'], answer: 0, why: '공격 조건 차단과 정상 기능 유지를 함께 검증해야 합니다.' }
];

export function isValidAnswers(answers) {
  return Array.isArray(answers) && answers.length === questions.length &&
    Array.from(answers).every(answer => Number.isInteger(answer) && answer >= 0 && answer <= 3);
}

export function evaluateAnswers(answers) {
  if (!isValidAnswers(answers)) throw new Error('진단 12문항에 모두 답해 주세요.');
  const scores = levels.map((_, group) => questions.slice(group * 3, group * 3 + 3)
    .reduce((score, question, offset) => score + Number(answers[group * 3 + offset] === question.answer), 0));
  let level = 0;
  // Advance only after meeting each prerequisite; advanced questions diagnose remaining gaps.
  while (level < 3 && scores[level] >= 2) level++;
  return { level, scores, total: scores.reduce((sum, value) => sum + value, 0) };
}
