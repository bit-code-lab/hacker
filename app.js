'use strict';
const lessons = [
  {
    title: '정보 보안의 첫걸음', tag: '기초 개념', summary: '무엇을, 왜 보호할까요? 보안의 세 가지 목표와 실습 원칙을 알아봅니다.',
    lead: '보안은 모든 것을 막는 일이 아니라, 필요한 사람이 필요한 일을 안전하게 할 수 있도록 만드는 일입니다.',
    body: '<h3>보호할 대상부터 정하기</h3><p>학교 과제 제출 서비스를 떠올려보세요. 학생의 개인정보, 제출한 파일, 마감 시간에 접속할 수 있는 기능 모두 보호할 대상입니다. 무엇이 중요한지 알아야 적절한 대책을 선택할 수 있습니다.</p><h3>세 가지 관점으로 살펴보기</h3><ul><li><strong>기밀성:</strong> 허가받은 사람만 정보를 봅니다. 다른 학생의 비공개 과제를 읽을 수 없어야 합니다.</li><li><strong>무결성:</strong> 정보가 허가 없이 바뀌지 않습니다. 제출한 과제가 다른 사람에 의해 수정되면 안 됩니다.</li><li><strong>가용성:</strong> 필요할 때 서비스를 이용할 수 있습니다. 백업과 복구 계획도 보안의 일부입니다.</li></ul><div class="callout"><strong>생각해 보기</strong><p>과제 파일을 실수로 지웠다면 어떤 문제가 생길까요? 복구할 수 없으면 가용성이, 파일 내용이 잘못 바뀌었다면 무결성이 영향을 받습니다. 하나의 사건이 여러 목표에 영향을 줄 수 있습니다.</p></div><h3>실습 범위를 먼저 확인하기</h3><p>실습용으로 제공된 환경에서만 연습하세요. 외부 사이트의 주소를 안다는 사실은 테스트 허가를 받았다는 뜻이 아닙니다. 테스트 대상, 허용된 행동, 시간 범위를 확인하는 습관부터 시작합니다.</p>',
    question: '다른 학생이 내 비공개 과제를 열람했다면 가장 직접적으로 침해된 목표는?',
    options: ['가용성', '기밀성', '처리 속도'], answer: 1,
    explanation: '기밀성은 허가받지 않은 사람에게 정보가 노출되지 않도록 하는 목표입니다.',
    source: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html'
  },
  {
    title: '웹과 HTTP 이해하기', tag: '웹 기초', summary: '브라우저와 서버가 대화하는 방법. 요청, 응답, 상태 코드의 의미를 읽어봅니다.',
    lead: '웹 보안을 배우려면 먼저 정상적인 웹 통신이 어떻게 이루어지는지 이해해야 합니다.',
    body: '<h3>요청과 응답</h3><p>브라우저는 서버에 자원을 요청하고, 서버는 상태 코드와 헤더, 필요한 본문을 담아 응답합니다. 아래는 학습용으로 단순화한 HTTP/1.1 메시지입니다.</p><pre><code>GET /lessons HTTP/1.1\nHost: example.com\n\nHTTP/1.1 200 OK\nContent-Type: text/plain; charset=utf-8\n\nHello, learner!</code></pre><ul><li><strong>GET:</strong> 자원을 조회하는 요청 메서드입니다.</li><li><strong>/lessons:</strong> 요청하는 자원의 경로입니다.</li><li><strong>200:</strong> 요청이 성공적으로 처리됐다는 상태 코드입니다. 404는 요청한 자원을 찾을 수 없다는 의미입니다.</li><li><strong>Content-Type:</strong> 응답 본문이 어떤 형식인지 알려줍니다.</li></ul><h3>HTTP와 HTTPS</h3><p>HTTPS는 TLS로 HTTP 통신을 보호합니다. 전송 중 도청과 변조 위험을 줄이고 서버 인증을 제공합니다. 하지만 HTTPS라고 해서 사이트의 모든 내용이 신뢰할 만하거나 애플리케이션 취약점이 없다는 뜻은 아닙니다.</p><div class="callout"><strong>직접 관찰하기</strong><p>칼리 Firefox에서 이 학습 사이트를 열고 Ctrl+Shift+E로 네트워크 도구를 연 뒤 Ctrl+R로 새로고침하세요. index.html 또는 문서 요청을 선택해 메서드와 응답 상태 코드를 찾아보세요. 브라우저에 따라 문서 이름은 hacker/로 표시될 수 있습니다.</p></div>',
    question: 'HTTPS를 사용한다는 사실만으로 알 수 없는 것은?',
    options: ['TLS로 통신을 보호한다', '전송 중 변조 위험을 줄인다', '사이트에 보안 취약점이 전혀 없다'], answer: 2,
    explanation: 'HTTPS는 통신 구간을 보호합니다. 서버의 접근 제어 오류나 코드 취약점까지 없애지는 않습니다.',
    source: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview'
  },
  {
    title: '인증과 접근 제어', tag: '계정 보안', summary: '로그인과 권한 검사는 다릅니다. 서버에서 지켜야 할 보안 경계를 배웁니다.',
    lead: '“누구인가?”를 확인하는 인증과 “이 일을 해도 되는가?”를 판단하는 인가를 구분해봅시다.',
    body: '<h3>로그인했다고 모든 권한이 생기지는 않습니다</h3><p>학생과 교사가 모두 로그인할 수 있어도, 성적을 수정할 수 있는 사람은 제한되어야 합니다. 인증은 사용자 신원을 확인하고, 인가는 특정 자원에 대한 작업을 허용할지 결정합니다.</p><h3>버튼 숨기기는 권한 검사가 아닙니다</h3><p>관리자 버튼을 화면에서 숨겨도 사용자가 요청을 직접 만들 수 있습니다. 서버는 매 요청마다 사용자와 작업 권한을 확인해야 합니다. 자원의 소유자 관계도 함께 검사해야 다른 사람의 자료가 노출되지 않습니다.</p><pre><code>// 서버에서 수행하는 권한 판단의 의사 코드\nif (!currentUser) reject();\nif (!canEdit(currentUser, assignment)) reject();\nupdateAssignment(assignment);</code></pre><p>실제 구현에서는 검증된 세션이나 토큰에서 신원을 얻어야 합니다. 요청 본문에 적힌 사용자 ID나 관리자 여부를 그대로 신뢰하면 안 됩니다.</p><div class="callout"><strong>설계 원칙</strong><p>기본적으로 거부하고, 필요한 최소 권한만 부여하세요. 권한 확인 중 오류가 발생해도 자동으로 허용해서는 안 됩니다.</p></div>',
    question: '과제 수정 권한을 안전하게 적용하는 방법은?',
    options: ['서버에서 매 요청마다 사용자와 수정 권한을 확인한다', '수정 버튼을 CSS로 숨긴다', '주소를 길고 복잡하게 만든다'], answer: 0,
    explanation: '사용자는 화면을 거치지 않고도 요청을 만들 수 있으므로, 서버에서 자원별 권한을 검사해야 합니다.',
    source: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html'
  },
  {
    title: 'SQL 인젝션 예방', tag: '시큐어 코딩', summary: '입력값과 명령을 분리하는 이유를 이해하고, 매개변수 쿼리를 살펴봅니다.',
    lead: '사용자가 입력한 문자열이 데이터베이스 명령의 일부로 해석되면 의도하지 않은 동작이 발생할 수 있습니다.',
    body: '<h3>문자열을 이어 붙일 때 생기는 문제</h3><p>검색어를 SQL 문자열에 직접 붙이면, 데이터여야 할 입력이 쿼리 문법에 영향을 줄 수 있습니다. 이러한 경계의 혼동이 SQL 인젝션의 핵심입니다.</p><h3>쿼리 구조와 값을 분리하기</h3><p>아래는 위에서 실행한 칼리 Python 3 예제 중 매개변수 바인딩 부분입니다. 물음표 자리에 들어갈 값은 별도의 인자로 전달합니다.</p><pre><code># Python sqlite3 예시\ncursor.execute(\n    "SELECT title FROM lessons WHERE topic = ?",\n    (user_topic,)\n)</code></pre><p>SQL 구조는 개발자가 정하고, 입력값은 드라이버를 통해 데이터로 전달합니다. 사용하는 언어와 드라이버에 따라 자리표시자 문법은 달라집니다.</p><div class="callout"><strong>입력 검사도 필요하지만</strong><p>따옴표를 지우는 방식만으로 방어하지 마세요. 매개변수 쿼리를 기본으로 사용하고 길이·형식 등 업무 규칙도 검사합니다. 테이블명이나 정렬 방향처럼 값을 바인딩할 수 없는 부분은 허용 목록에서 선택하도록 설계합니다.</p></div><h3>피해 범위 줄이기</h3><p>데이터베이스 계정에도 필요한 최소 권한만 부여합니다. 화면에 상세 데이터베이스 오류를 그대로 출력하지 말고, 내부 로그에도 비밀번호 등 비밀 정보가 남지 않도록 합니다.</p>',
    question: '사용자의 검색어를 SQL에 전달할 때 기본적으로 선택할 방법은?',
    options: ['따옴표만 모두 삭제하기', '매개변수 쿼리로 값 전달하기', '입력값을 SQL 문자열 끝에 붙이기'], answer: 1,
    explanation: '매개변수 바인딩은 SQL 구조와 입력 데이터를 분리합니다. 입력 검증은 이를 보완합니다.',
    source: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html'
  },
  {
    title: 'XSS와 안전한 출력', tag: '시큐어 코딩', summary: '텍스트가 코드로 실행되지 않도록. 브라우저에 입력을 출력하는 방법을 익힙니다.',
    lead: '사용자의 글은 글로 보여야 합니다. 신뢰할 수 없는 입력이 실행 가능한 웹 콘텐츠로 처리되는 상황을 막아봅시다.',
    body: '<h3>출력하는 위치가 중요합니다</h3><p>XSS는 신뢰할 수 없는 데이터가 브라우저에서 실행 가능한 콘텐츠로 처리될 때 발생할 수 있습니다. HTML 본문, 속성, URL, JavaScript는 서로 다른 문맥이므로 같은 처리 방법을 무조건 재사용하면 안 됩니다.</p><h3>단순한 텍스트는 textContent로</h3><pre><code>// 사용자 입력을 일반 텍스트로 표시\nconst preview = document.querySelector("#preview");\npreview.textContent = userComment;</code></pre><p>이 경우 입력에 HTML 태그가 들어 있어도 텍스트로 표시됩니다. 반면 innerHTML은 HTML을 해석하므로, 검증되지 않은 사용자 입력을 그대로 전달하면 위험합니다.</p><h3>HTML 자체가 필요한 경우</h3><p>서식 있는 글을 지원해야 한다면 검증된 HTML 정화 라이브러리를 올바르게 사용하고 최신 상태로 유지합니다. 자체 정규식으로 모든 위험한 HTML을 걸러내려 하지 마세요. 링크는 허용할 URL 스킴도 검토해야 합니다.</p><div class="callout"><strong>한 겹 더 보호하기</strong><p>Content Security Policy는 보조 방어 수단입니다. 안전한 출력 처리나 정화를 대신하지는 않습니다. 프레임워크의 자동 이스케이프를 우회하는 기능도 신중히 사용하세요.</p></div>',
    question: '사용자 댓글을 서식 없는 일반 텍스트로 표시할 때 적합한 것은?',
    options: ['입력 문자열을 eval로 실행한다', '입력 문자열을 innerHTML에 넣는다', '입력 문자열을 textContent에 넣는다'], answer: 2,
    explanation: 'textContent는 이 예시에서 입력을 HTML로 해석하지 않고 텍스트로 표시합니다.',
    source: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html'
  },
  {
    title: '첫 보안 점검', tag: '종합 복습', summary: '배운 내용을 하나로 연결해, 작은 서비스의 보안 설계를 검토해봅니다.',
    lead: '가상의 과제 제출 서비스를 점검하면서 입력, 권한, 출력의 흐름을 연결해봅시다.',
    body: '<h3>상황: 학생이 과제를 수정합니다</h3><p>브라우저가 과제 번호와 새 내용을 서버로 전송합니다. 서버는 데이터를 저장하고 수정된 내용을 화면에 표시합니다. 각 단계에서 무엇을 확인해야 할까요?</p><ol><li><strong>통신:</strong> HTTPS로 요청과 응답을 보호합니다.</li><li><strong>신원과 권한:</strong> 검증된 사용자 신원을 바탕으로 해당 과제의 수정 권한을 서버에서 검사합니다.</li><li><strong>입력:</strong> 제목과 본문의 길이·형식 등 허용 규칙을 검증합니다.</li><li><strong>저장:</strong> SQL을 사용한다면 매개변수 쿼리로 값을 전달합니다.</li><li><strong>표시:</strong> 출력 문맥에 맞게 처리합니다. 일반 텍스트는 HTML로 해석하지 않습니다.</li></ol><h3>부정적인 경우도 시험하기</h3><p>내가 소유한 테스트 환경에서 두 개의 테스트 계정을 준비하세요. 계정 A의 과제를 계정 B가 수정하려 할 때 거부되는지 확인합니다. 로그인하지 않은 상태도 검사합니다. 예상 결과와 실제 결과를 기록하면 재발 방지에도 도움이 됩니다.</p><div class="callout"><strong>점검 기록 예시</strong><p>대상: 테스트 과제 1번<br>조건: 다른 학생 계정으로 수정 요청<br>예상: 서버에서 요청 거부, 원본 유지<br>확인: 응답과 저장된 원본을 모두 검사</p></div><h3>다음 단계</h3><p>이 목록은 입문 복습용이며 전체 보안 점검표는 아닙니다. 아래 OWASP 문서로 위험 유형을 넓혀 보고, Web Security Academy의 허가된 실습 환경에서 계속 연습하세요.</p>',
    question: '다른 학생의 과제 수정 요청이 거부됐는지 검증하려면?',
    options: ['화면에 수정 버튼이 없는지만 확인한다', '서버 응답과 실제 데이터가 변경되지 않았는지 함께 확인한다', '로그인 성공 여부만 확인한다'], answer: 1,
    explanation: '화면이나 메시지만으로는 충분하지 않습니다. 권한 없는 작업이 서버에서 차단되고 데이터가 보존되는지 확인합니다.',
    source: 'https://owasp.org/www-project-top-ten/'
  }
];

lessons.push(
  { title: '위협 모델과 신뢰 경계', tag: '보안 설계', summary: '데이터 흐름에서 신뢰 경계를 찾고, 위협과 검증 계획을 연결합니다.',
    lead: '보안 검토는 기능을 모두 만든 뒤에만 하는 일이 아닙니다. 설계 단계에서 데이터와 권한이 이동하는 경로를 먼저 살펴봅니다.',
    body: '<h3>시스템을 작은 흐름으로 나누기</h3><p>과제 제출 서비스에서 브라우저 → API → 데이터베이스의 흐름을 그려보세요. 브라우저 입력은 신뢰할 수 없는 데이터입니다. API가 사용자를 검증하더라도 과제 소유권을 확인해야 하며, 데이터베이스 계정 권한도 제한해야 합니다.</p><h3>자산·위협·대응·검증 연결하기</h3><ul><li><strong>자산:</strong> 비공개 과제와 제출 이력.</li><li><strong>위협:</strong> 다른 사용자가 과제 번호를 바꿔 수정 요청을 보냄.</li><li><strong>대응:</strong> 서버에서 요청자와 자원 소유권을 검사하고 기본 거부 적용.</li><li><strong>검증:</strong> 다른 계정과 비로그인 요청을 시험하고 실제 저장 내용 확인.</li></ul><div class="callout"><strong>설계가 바뀌면 다시 검토하기</strong><p>외부 파일 저장소나 공유 링크를 추가하면 데이터 흐름과 신뢰 경계도 바뀝니다. 위협 모델은 한 번 작성하고 끝내는 문서가 아닙니다.</p></div><h3>직접 해보기</h3><p>자신이 만든 작은 앱의 외부 입력, 처리 기능, 저장소를 그려보세요. 각 경계에 검증 책임을 적고, 가장 영향이 큰 실패 하나에 대한 테스트를 작성하세요.</p>',
    question: '외부 파일 공유 기능을 추가했을 때 필요한 보안 활동은?', options: ['기존 위협 모델을 그대로 둔다', '변경된 데이터 흐름·권한 경계와 위협 모델을 다시 검토한다', '파일 이름만 길게 만든다'], answer: 1,
    explanation: '기능 변경으로 새 신뢰 경계가 생길 수 있으므로 위협과 대응·검증 계획을 함께 갱신합니다.', source: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html' },
  { title: '거래 승인과 상태 검증', tag: '심화 설계', summary: '승인을 구체적인 작업과 연결하고, 변경·재사용에 안전한 흐름을 설계합니다.',
    lead: '중요한 작업의 승인은 단순한 “로그인 완료” 표시보다 더 구체적이어야 합니다.',
    body: '<h3>승인을 작업 데이터에 연결하기</h3><p>금액과 수취인을 확인한 승인이라면, 그 승인은 해당 금액과 수취인의 거래에만 적용되어야 합니다. 승인 후 데이터가 변경되면 기존 승인을 무효화하고 새 거래에 대한 검증을 요구합니다.</p><h3>순서를 서버가 관리하기</h3><p>요청된 거래 생성 → 상세 정보 확인 → 승인 검증 → 실행의 순서를 서버에서 강제합니다. 클라이언트가 보낸 approved=true 같은 값을 권한 근거로 사용하지 않습니다. 실행 직전에도 승인 대상 데이터와 현재 거래가 일치하는지 확인합니다.</p><div class="callout"><strong>재사용과 중복 실행</strong><p>승인 정보의 유효 시간을 제한하고 거래마다 고유하게 결합하세요. 실행된 승인이 다른 작업에 재사용되지 않도록 서버 상태를 관리합니다.</p></div><h3>검증 시나리오</h3><ul><li>승인 후 대상 데이터가 변경되면 실행을 거부하는가?</li><li>만료되거나 이미 사용된 승인을 거부하는가?</li><li>승인 단계를 건너뛰는 직접 요청을 거부하는가?</li><li>정상적인 승인 흐름은 계속 작동하는가?</li></ul><p>실제 결제 연동이 아닌 본인 소유의 모의 거래 환경에서 테스트하세요.</p>',
    question: '승인 후 거래 금액이 변경됐다면?', options: ['새 거래 내용에 대한 승인을 다시 검증한다', '기존 승인을 재사용한다', '클라이언트의 승인 표시만 확인한다'], answer: 0,
    explanation: '승인은 확인한 거래 데이터와 연결되어야 하며, 변경된 데이터에는 기존 승인을 적용하지 않습니다.', source: 'https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html' }
);
// Kali-specific instructions are fixed course content.
const kaliGuides = [
  "<h3>칼리 리눅스에서 시작하기</h3><p>이 과정은 Kali Linux 데스크톱의 일반 사용자 계정, Bash 또는 Zsh 터미널, Firefox를 기준으로 설명합니다. 아래 명령은 터미널에 입력하세요. 관리자 권한이 필요한 패키지 설치에만 sudo를 사용합니다.</p><pre><code>cat /etc/os-release\nwhoami\npython3 --version\ncurl --version</code></pre><p>배포판 이름과 현재 계정, 도구 버전을 확인합니다. python3 또는 curl 명령이 없으면 다음과 같이 설치하세요.</p><pre><code>sudo apt update\nsudo apt install python3 curl</code></pre><p>실습 파일은 홈 디렉터리 아래 전용 임시 폴더에 둡니다. 다음 명령은 기존 파일을 덮어쓰지 않고 새 폴더를 만듭니다. 출력된 경로를 기록하세요.</p><pre><code>lab_dir=$(mktemp -d &quot;$HOME/hacker-lab.XXXXXX&quot;)\ncd &quot;$lab_dir&quot;\npwd</code></pre><p>뒤의 예시에서 말하는 실습 폴더는 이 경로입니다. 칼리에 보안 도구가 설치되어 있다는 사실은 외부 시스템을 테스트할 권한을 의미하지 않습니다. <a href=\"https://www.kali.org/docs/general-use/sudo/\">Kali 공식 sudo 안내 ↗</a></p>",
  "<h3>칼리 터미널에서 HTTP 관찰하기</h3><p>첫 수업에서 만든 빈 실습 폴더로 이동한 터미널 A에서 아래 서버를 실행합니다. 이 서버는 로그인이나 데이터 저장을 구현하지 않는 로컬 학습용 정적 서버입니다.</p><pre><code>python3 -m http.server 8000 --bind 127.0.0.1</code></pre><p>터미널 B를 새로 열어 요청을 보냅니다.</p><pre><code>curl -i http://127.0.0.1:8000/\ncurl -i http://127.0.0.1:8000/missing-lesson</code></pre><p>빈 실습 폴더라면 첫 요청은 200, 존재하지 않는 missing-lesson 경로는 404입니다. -i는 응답 헤더도 표시합니다. Python 서버의 응답은 HTTP/1.0으로 보일 수 있으며, 아래 HTTP/1.1 예시는 별도의 메시지 구조 설명입니다. 127.0.0.1은 현재 칼리 시스템 자신이고, 이 로컬 HTTP 예제에는 TLS가 없습니다. 서버 종료는 터미널 A에서 Ctrl+C입니다.</p><p>칼리의 Firefox 주소창에 http://127.0.0.1:8000/를 입력하고 Ctrl+Shift+E로 네트워크 도구를 연 뒤 Ctrl+R로 새로고침하세요. 요청의 메서드와 상태, 헤더를 비교합니다. <a href=\"https://docs.python.org/3/library/http.server.html\">Python 로컬 서버 문서 ↗</a></p>",
  "<h3>칼리에서 인증과 인가를 구분하기</h3><p>칼리 터미널의 whoami는 운영체제 계정을 보여줍니다. Firefox에서 로그인한 웹서비스 계정과는 별개입니다. 칼리에서 sudo를 사용해도 웹서비스의 관리자 권한을 얻는 것은 아닙니다.</p><pre><code>whoami\nid</code></pre><p>아래 의사 코드는 터미널에 붙여 넣는 명령이 아니라 서버 구현에서 필요한 검사 순서입니다. 자체 테스트 웹앱을 준비한 다음, 칼리 Firefox의 일반 창에 테스트 계정 A, 사생활 보호 창(Ctrl+Shift+P)에 B로 로그인해 서로 다른 사용자의 자원 접근을 검사하세요. 단순 Python 정적 서버에는 계정·인가 기능이 없으므로 이 검사를 할 수 없습니다.</p>",
  "<h3>칼리의 Python 3로 실행하기</h3><p>아래 블록 전체를 칼리 터미널에 붙여 넣으면 Python 표준 라이브러리만으로 동작합니다. 데이터베이스는 메모리에만 만들며, 기존 파일을 수정하지 않습니다. PY는 여러 줄 입력의 끝을 알리는 구분자입니다.</p><pre><code>python3 - &lt;&lt;&#x27;PY&#x27;\nimport sqlite3\n\nconnection = sqlite3.connect(&quot;:memory:&quot;)\ncursor = connection.cursor()\ncursor.execute(&quot;CREATE TABLE lessons (title TEXT, topic TEXT)&quot;)\ncursor.execute(&quot;INSERT INTO lessons VALUES (?, ?)&quot;,\n               (&quot;HTTP basics&quot;, &quot;web&quot;))\nuser_topic = &quot;web&quot;\ncursor.execute(&quot;SELECT title FROM lessons WHERE topic = ?&quot;,\n               (user_topic,))\nprint(cursor.fetchall())\nconnection.close()\nPY</code></pre><p>예상 출력은 [('HTTP basics',)]입니다. user_topic을 다른 값으로 바꾸면 조건에 맞는 행이 없어 []가 출력됩니다. 입력이 SQL 구조와 분리되어 전달되는 지점을 확인하세요. <a href=\"https://docs.python.org/3/library/sqlite3.html\">Python sqlite3 공식 문서 ↗</a></p>",
  "<h3>칼리 Firefox에서 텍스트 출력 확인하기</h3><p>두 번째 수업의 로컬 서버를 켜고 칼리 Firefox로 http://127.0.0.1:8000/를 여세요. Ctrl+Shift+K로 웹 콘솔을 열어 아래 코드를 한 줄씩 직접 입력합니다. 이 코드는 Bash/Zsh 명령이 아닙니다. 브라우저의 붙여넣기 보호를 해제하지 않아도 직접 입력할 수 있습니다.</p><pre><code>const preview = document.createElement(&quot;p&quot;);\ndocument.body.append(preview);\npreview.textContent = &quot;&lt;strong&gt;hello&lt;/strong&gt;&quot;;</code></pre><p>화면에 태그를 포함한 &lt;strong&gt;hello&lt;/strong&gt;가 일반 텍스트로 표시되는지 확인하세요. 이 변경은 현재 탭의 화면에만 적용되고 새로고침하면 사라집니다. 아래 userComment 예시는 실제 앱에서 사용자 입력을 받는 변수를 가정합니다.</p>",
  "<h3>칼리에서 점검 결과 기록하기</h3><p>자신의 테스트 웹앱을 준비하고 칼리 Firefox의 일반 창과 사생활 보호 창으로 두 테스트 계정을 분리합니다. Ctrl+Shift+E의 네트워크 도구에서 응답을 관찰한 뒤, 서버 측 데이터가 유지되는지도 확인합니다. 서버가 없으면 다음 내용은 설계 검토용으로 읽으세요.</p><p>터미널에서 새 점검 기록 파일을 만들 수 있습니다. 기존 기록을 덮어쓰지 않으며 출력된 경로의 파일에 결과를 작성합니다.</p><pre><code>report_file=$(mktemp &quot;$HOME/hacker-check.XXXXXX.txt&quot;)\nprintf &#x27;대상:\\n계정 조건:\\n예상 결과:\\n실제 응답:\\n원본 유지 여부:\\n&#x27; &gt; &quot;$report_file&quot;\ncat &quot;$report_file&quot;\nprintf &#x27;%s\\n&#x27; &quot;$report_file&quot;</code></pre><p>기록에는 실제 비밀번호, 세션 쿠키, 인증 토큰을 넣지 마세요. 쿠키·토큰을 명령행에 직접 입력하면 셸 기록에 남을 수 있습니다.</p>",
  "<h3>칼리 실습 환경의 신뢰 경계</h3><p>칼리 Firefox → 본인 소유 테스트 API → 테스트 데이터베이스의 흐름으로 모델링합니다. 터미널 도구도 브라우저와 마찬가지로 신뢰할 수 없는 요청을 만들 수 있는 클라이언트입니다. 클라이언트가 칼리에서 실행된다는 이유로 서버가 요청을 신뢰하면 안 됩니다.</p><p>로컬 Python 정적 서버에는 API나 데이터베이스가 없습니다. 직접 만든 테스트 API가 있는 경우에만 아래 구조를 실제 구성과 대조하고, 없는 경우에는 설계 예시로 사용하세요.</p><pre><code>Kali Firefox / 터미널\n    ↓ 신뢰 경계: 인증·입력·자원 권한 검사\n테스트 API\n    ↓ 신뢰 경계: 최소 권한·매개변수 쿼리\n테스트 데이터베이스</code></pre><p>칼리의 텍스트 편집기에 각 흐름의 자산, 위협, 대응, 검증 방법을 적습니다. 주소가 localhost여도 실제 서비스 설계에서 인증·인가를 생략할 근거가 되지는 않습니다.</p>",
  "<h3>칼리에서 모의 거래 흐름 검토하기</h3><p>이 단원은 본인이 구현한 모의 거래 서버가 있다는 전제의 설계·검증 과제입니다. 칼리 Firefox에서 테스트 계정으로 접속하고 Ctrl+Shift+E의 네트워크 도구로 승인 전후 요청과 응답을 관찰하세요. 실제 송금이나 결제는 수행하지 않습니다.</p><p>서버가 없으면 다음 상태 전이를 텍스트 편집기에 적고 각 단계의 검증 조건을 작성합니다. 이를 터미널에서 실행하는 명령으로 해석하지 마세요.</p><pre><code>거래 생성 → 상세 정보 확인 → 승인 검증 → 실행\n데이터 변경 → 기존 승인 무효화 → 다시 승인\n승인 만료 / 이미 사용됨 → 실행 거부</code></pre><p>Firefox의 버튼 표시만 확인하지 말고 서버가 관리하는 승인 상태와 실제 모의 거래 결과를 비교하세요. 칼리 도구나 클라이언트 코드만으로 서버의 올바른 구현을 대신할 수는 없습니다.</p>"
];
lessons.forEach((lesson, index) => { lesson.body = kaliGuides[index] + lesson.body; });
const levelNames = ['입문', '초급', '중급', '고급'];
lessons.forEach((lesson, i) => { lesson.level = Math.floor(i / 2); });
const courses = document.querySelector('#courses');
lessons.forEach((lesson, index) => {
  const card = document.createElement('a');
  card.className = 'course';
  card.href = `#lesson-${index}`;
  card.innerHTML = `<div class="course-top"><span class="course-number">CHAPTER ${String(index + 1).padStart(2, '0')}</span><span class="tag">${levelNames[lesson.level]} · ${lesson.tag}</span></div><h3>${lesson.title}</h3><p>${lesson.summary}</p><div class="course-bottom"><span>개념 학습 · 확인 문제 1개</span><b aria-hidden="true">↗</b></div>`;
  courses.append(card);
});

// Lesson HTML is fixed author-written content; user-controlled text is never parsed as HTML.
const responses = new Map();
function openLesson() {
  const match = /^#lesson-([0-7])$/.exec(location.hash);
  if (!match) return;
  const index = Number(match[1]);
  const lesson = lessons[index];
  document.querySelector('#lesson').hidden = false;
  document.querySelector('#lesson-meta').textContent = `CHAPTER ${String(index + 1).padStart(2, '0')} / ${lesson.tag}`;
  const title = document.querySelector('#lesson-title');
  title.textContent = lesson.title;
  document.querySelector('#lesson-lead').textContent = lesson.lead;
  document.querySelector('#lesson-content').innerHTML = lesson.body;
  document.querySelector('#question').textContent = lesson.question;
  const answers = document.querySelector('#answers');
  const feedback = document.querySelector('#feedback');
  answers.replaceChildren();
  feedback.textContent = '';
  lesson.options.forEach((option, choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    button.textContent = `${choice + 1}. ${option}`;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      responses.set(index, choice);
      showAnswer(choice);
    });
    answers.append(button);
  });
  function showAnswer(choice) {
    Array.from(answers.children).forEach((button, n) => {
      button.className = 'answer' + (n === choice ? (n === lesson.answer ? ' correct' : ' wrong') : '');
      button.setAttribute('aria-pressed', String(n === choice));
    });
    feedback.textContent = choice === lesson.answer ? `정답입니다. ${lesson.explanation}` : '다시 생각해 보세요. 본문의 핵심 개념을 확인하고 다른 답을 선택할 수 있습니다.';
  }
  if (responses.has(index)) showAnswer(responses.get(index));
  document.querySelector('#source').href = lesson.source;
  const next = document.querySelector('#next');
  next.href = index === lessons.length - 1 ? '#resources' : `#lesson-${index + 1}`;
  next.textContent = index === lessons.length - 1 ? '무료 자료로 계속 배우기 ↗' : '다음 수업 →';
  Array.from(courses.children).forEach((card, n) => card.setAttribute('aria-current', String(n === index)));
  document.title = `${lesson.title} — HACKER`;
  title.focus({ preventScroll: true });
  document.querySelector('#lesson').scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', openLesson);
openLesson();

function filterCourses(level) {
  const descriptions = ['보안 목표와 HTTP의 기본 개념부터 시작합니다.', '인증·인가와 SQL 입력 처리를 익힙니다.', '안전한 출력과 서비스 보안 검증을 연결합니다.', '위협 모델링과 거래 승인 흐름을 설계합니다.'];
  Array.from(courses.children).forEach((card, index) => { card.hidden = level !== 'all' && lessons[index].level !== Number(level); });
  document.querySelectorAll('#level-filters button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.level === level)));
  document.querySelector('#level-description').textContent = level === 'all' ? '기초 개념부터 보안 설계까지, 원하는 수준을 선택하세요.' : `${levelNames[Number(level)]} · ${descriptions[Number(level)]}`;
}
document.querySelectorAll('#level-filters button').forEach(button => button.addEventListener('click', () => {
  filterCourses(button.dataset.level);
  history.replaceState(null, '', button.dataset.level === 'all' ? '#curriculum' : `#level-${button.dataset.level}`);
}));
function openLevel() {
  const match = /^#level-([0-3])$/.exec(location.hash);
  if (!match) return;
  filterCourses(match[1]);
  document.querySelector('#curriculum').scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', openLevel);
openLevel();
