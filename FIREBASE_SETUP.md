# HACKER 로그인 및 수준 진단 설정

프로젝트: `bit-code-lab-2026` · 사이트: https://bit-code-lab.github.io/hacker/

이 안내는 **Kali Linux 데스크톱의 Firefox** 기준입니다. Firebase Console과 보안 규칙은 운영체제와 무관한 서버 설정입니다. 규칙 코드를 칼리 터미널에 실행하지 말고 Console의 Rules 편집기에 입력하세요.

## 1. Google 로그인

1. Firebase Console → Authentication → Sign-in method에서 Google을 활성화하고 지원 이메일을 지정합니다.
2. Authentication → Settings → Authorized domains에 `bit-code-lab.github.io`를 추가합니다. 프로토콜과 `/hacker/` 경로는 넣지 않습니다.
3. 공개 사이트에서 Google 로그인과 로그아웃을 확인합니다. 칼리 Firefox에서 공개 사이트를 열고 팝업 차단 메시지가 나오면 해당 사이트의 로그인 팝업을 허용한 뒤 다시 시도하세요.

이 사이트는 Firebase Authentication의 Google 로그인을 사용합니다. 제공된 `initializeApp`과 `getAnalytics`만으로는 로그인이 구현되지 않습니다. Analytics는 로그인에 필요하지 않아 사용하지 않습니다. Firebase 웹 API 키는 클라이언트 설정값이며, Firestore 접근 권한은 아래 서버 규칙으로 제어합니다.

## 2. Cloud Firestore

Cloud Firestore의 `(default)` 데이터베이스가 없다면 Console에서 생성합니다. 테스트 모드로 전체 데이터를 공개하지 않습니다.

저장 경로는 `hackerAssessments/{Firebase Auth UID}`입니다. 한 사용자당 최근 결과 한 건을 저장합니다.

| 필드 | 형식 | 설명 |
| --- | --- | --- |
| version | 정수 1 | 질문 및 채점 기준 버전 |
| answers | 길이 12의 정수 배열 | 0~2 선택지, 3은 잘 모르겠어요 |
| updatedAt | timestamp | `serverTimestamp()`로 기록 |

이름·이메일·점수·권한 필드는 이 문서에 저장하지 않습니다. 표시할 점수와 추천 수준은 검증한 답안에서 다시 계산합니다.

## 3. 보안 규칙 적용

**실제 규칙은 [firestore.rules](./firestore.rules)에 있습니다.** Cloud Firestore → Rules에서 적용하고 Publish합니다. GitHub에 파일을 올리는 것만으로 Firebase 규칙이 배포되지는 않습니다.

- 본인의 문서 한 건만 읽기·생성·수정·삭제할 수 있습니다.
- 다른 UID 문서 접근, 비로그인 접근, 컬렉션 목록 조회는 거부합니다.
- 허용한 3개 필드 외의 값(`admin`, `role`, 임의 점수 등)은 거부합니다.
- 답안 길이·정수 범위, 버전, 서버 저장 시각을 검사합니다.

**공유 프로젝트라면 기존 규칙 전체를 덮어쓰지 마세요.** 기존 `match /databases/{database}/documents` 내부에 `match /hackerAssessments/{uid}` 블록을 병합합니다. 다른 앱의 컬렉션 규칙을 유지해야 합니다. 이 경로까지 허용하는 광범위한 `match /{document=**}` 규칙이 있다면 별도로 좁혀야 합니다. Firestore에서는 일치하는 규칙 중 하나라도 허용하면 접근할 수 있으므로, 제한적인 규칙 추가만으로 기존 전체 허용 규칙을 무효화할 수 없습니다.

Storage는 사용하지 않습니다. 새 전용 Storage 버킷이라면 모든 요청을 거부해도 되지만, 다른 앱이 사용하는 버킷의 기존 규칙은 변경하지 마세요. Firebase Authentication에는 Firestore Rules를 붙이는 것이 아니라 로그인 공급자와 허용 도메인을 설정합니다.

## 4. 진단 기준과 한계

입문·초급·중급·고급 영역에 각 3문항이 있습니다. 입문부터 순서대로 2/3 이상이면 다음 수준을 추천하며, 기준에 못 미치는 첫 영역을 추천합니다. 고급 영역 점수는 추가 복습 안내용이고, 고급보다 높은 등급은 없습니다.

예: 입문 3/3, 초급 1/3, 중급 3/3, 고급 3/3이어도 **초급**을 추천합니다. 전체 정답 수만으로 하위 개념의 부족을 가리지 않습니다.

이 기능은 학습 추천용입니다. 브라우저에서 답안·채점을 바꿀 수 있으므로 인증서, 관리자 권한, 강의 접근 권한, 공식 평가에 사용하면 안 됩니다. 그런 목적에는 별도의 서버 채점과 서버 권한 관리가 필요합니다. 본인 답안을 수정할 수 있는 것은 의도된 기능입니다.

기존 결과가 없으면 로그인 후 진단 질문을 표시합니다. 결과가 있으면 최근 결과와 재진단 버튼을 표시합니다. 저장 실패 시 완료라고 표시하지 않으며 재시도할 수 있습니다. 로그아웃과 계정 변경 시 이전 계정의 화면 상태를 지웁니다.

## 5. 배포 후 확인

1. 칼리 Firefox 일반 창에서 계정 A 로그인 → 12문항 → 결과 저장 → 새로고침 후 결과 복원.
2. 칼리 Firefox에서 로그아웃 → 결과 숨김 → 계정 B 로그인 시 A의 기록이 표시되지 않음.
3. Rules Playground 또는 Emulator에서 비로그인·타인 UID 접근, 잘못된 길이·형식·추가 필드·과거 시각 쓰기 거부 확인.
4. 본인 UID의 정상 문서는 읽기·쓰기 허용 확인.

## 공식 문서

- https://firebase.google.com/docs/auth/web/google-signin
- https://firebase.google.com/docs/web/alt-setup
- https://firebase.google.com/docs/firestore/security/rules-conditions
- https://firebase.google.com/docs/firestore/security/rules-fields
