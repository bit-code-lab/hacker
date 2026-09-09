'use strict';
(async () => {
  const $ = selector => document.querySelector(selector);
  const login = $('#login');
  const logout = $('#logout');
  const status = $('#auth-status');
  const panel = $('#assessment-panel');
  const resultPanel = $('#assessment-result');
  const saveStatus = $('#save-status');
  const retrySave = $('#retry-save');
  let auth, db, user = null, epoch = 0, busy = false, pendingAnswers = null;
  let answers = [], current = 0;
  function message(error) {
    const messages = {
      'auth/unauthorized-domain': '현재 사이트가 로그인 허용 도메인에 등록되지 않았습니다. 운영자에게 문의해 주세요.',
      'auth/operation-not-allowed': 'Google 로그인이 아직 활성화되지 않았습니다. 운영자에게 문의해 주세요.',
      'auth/popup-blocked': '팝업이 차단됐습니다. 이 사이트의 팝업을 허용한 뒤 다시 로그인해 주세요.',
      'auth/popup-closed-by-user': '로그인 창이 닫혔습니다. 다시 시도할 수 있습니다.',
      'auth/cancelled-popup-request': '다른 로그인 요청이 진행 중입니다.',
      'auth/network-request-failed': '네트워크 연결을 확인한 뒤 다시 시도해 주세요.',
      'auth/web-storage-unsupported': '브라우저의 사이트 저장소를 허용한 뒤 다시 로그인해 주세요.',
      'auth/invalid-api-key': '로그인 설정을 확인해야 합니다. 운영자에게 문의해 주세요.',
      'permission-denied': '진단 기록에 접근할 권한이 없습니다. 운영자의 Firestore 규칙 설정이 필요합니다.',
      'unavailable': '서버에 연결할 수 없습니다. 네트워크를 확인해 주세요.',
      'timeout': '서버 응답이 지연되고 있습니다. 연결 상태를 확인해 주세요.'
    };
    return messages[error.code] || '처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
  }
  async function bounded(promise) {
    let timer;
    try {
      return await Promise.race([promise, new Promise((_, reject) => {
        timer = setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'timeout' })), 12000);
      })]);
    } finally { clearTimeout(timer); }
  }
  try {
    const [{ initializeApp }, authSDK, storeSDK, quiz] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js'),
      import('./assessment.mjs')
    ]);
    const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } = authSDK;
    const { getFirestore, doc, getDocFromServer, setDoc, serverTimestamp } = storeSDK;
    const { questions, levels, evaluateAnswers, isValidAnswers, assessmentVersion } = quiz;
    const app = initializeApp({
      apiKey: 'AIzaSyBUZ1IU5exTw3gELm7criA7ECT_Z4osld4',
      authDomain: 'bit-code-lab-2026.firebaseapp.com',
      projectId: 'bit-code-lab-2026',
      storageBucket: 'bit-code-lab-2026.firebasestorage.app',
      messagingSenderId: '733037971628',
      appId: '1:733037971628:web:ed76a0920dbe14a3fdb709'
    });
    // Analytics is not needed for authentication or placement.
    auth = getAuth(app);
    auth.languageCode = 'ko';
    db = getFirestore(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    login.addEventListener('click', async () => {
      if (login.disabled) return;
      login.disabled = true;
      status.textContent = 'Google 로그인 창에서 계정을 선택해 주세요.';
      try { await signInWithPopup(auth, provider); }
      catch (error) { status.textContent = message(error); }
      finally { login.disabled = false; }
    });
    logout.addEventListener('click', async () => {
      logout.disabled = true;
      try { await signOut(auth); }
      catch (error) { status.textContent = message(error); }
      finally { logout.disabled = false; }
    });

    function startAssessment() {
      if (!user || auth.currentUser?.uid !== user.uid) return;
      answers = Array(questions.length).fill(null);
      current = 0;
      pendingAnswers = null;
      resultPanel.hidden = true;
      panel.hidden = false;
      $('#retry-load').hidden = true;
      $('#start-assessment').hidden = true;
      renderQuestion();
    }
    function renderQuestion() {
      if (!user) return;
      const question = questions[current];
      $('#assessment-progress').textContent = `${current + 1} / ${questions.length} · ${levels[Math.floor(current / 3)]} 영역`;
      $('#assessment-meter').value = current + 1;
      $('#assessment-question').textContent = question.prompt;
      const options = $('#assessment-options');
      options.replaceChildren();
      [...question.options, '잘 모르겠어요'].forEach((text, choice) => {
        const label = document.createElement('label');
        label.className = 'assessment-option';
        const input = document.createElement('input');
        input.type = 'radio'; input.name = 'placement'; input.value = String(choice);
        input.checked = answers[current] === choice;
        input.addEventListener('change', () => { answers[current] = choice; $('#assessment-next').disabled = false; });
        const span = document.createElement('span'); span.textContent = text;
        label.append(input, span); options.append(label);
      });
      $('#assessment-back').disabled = current === 0;
      $('#assessment-next').disabled = answers[current] === null;
      $('#assessment-next').textContent = current === questions.length - 1 ? '결과 확인하기' : '다음 질문 →';
      $('#assessment-question').focus({ preventScroll: true });
    }
    $('#assessment-back').addEventListener('click', () => { if (current > 0 && user) { current--; renderQuestion(); } });
    $('#assessment-form').addEventListener('submit', event => {
      event.preventDefault();
      if (!user || auth.currentUser?.uid !== user.uid || answers[current] === null) return;
      if (current < questions.length - 1) { current++; renderQuestion(); return; }
      if (!isValidAnswers(answers)) return;
      pendingAnswers = [...answers];
      showResult(pendingAnswers);
      void saveResult();
    });
    $('#start-assessment').addEventListener('click', startAssessment);
    $('#retake').addEventListener('click', startAssessment);
    retrySave.addEventListener('click', () => void saveResult());
    $('#retry-load').addEventListener('click', () => { if (user) void loadResult(user, ++epoch); });

    function showResult(values) {
      const result = evaluateAnswers(values);
      panel.hidden = true;
      resultPanel.hidden = false;
      $('#start-assessment').hidden = true;
      $('#retry-load').hidden = true;
      $('#placement-title').textContent = `추천 학습 수준: ${levels[result.level]}`;
      $('#placement-score').textContent = `총 ${result.total} / 12문항 정답`;
      $('#placement-breakdown').textContent = result.scores.map((score, i) => `${levels[i]} ${score}/3`).join(' · ');
      const descriptions = ['보안 목표와 웹 통신부터 차근차근 익혀보세요.', '인증·인가와 안전한 데이터 처리를 학습해 보세요.', '출력 문맥과 보안 검증을 연결해 보세요.', '위협 모델링과 거래 승인 설계를 학습해 보세요.'];
      $('#placement-description').textContent = descriptions[result.level];
      const link = $('#recommended-course');
      link.href = `./courses.html#level-${result.level}`;
      link.textContent = `${levels[result.level]} 과정 보기 →`;
      const review = $('#assessment-review');
      review.replaceChildren();
      questions.forEach((question, i) => {
        const item = document.createElement('p');
        item.textContent = `${i + 1}. ${values[i] === question.answer ? '정답' : '복습 필요'} — ${question.prompt} 정답: ${question.options[question.answer]}. ${question.why}`;
        review.append(item);
      });
      $('#placement-title').focus({ preventScroll: true });
    }
    async function saveResult() {
      if (busy || !user || !pendingAnswers) return;
      const owner = user;
      const generation = epoch;
      const submitted = [...pendingAnswers];
      busy = true;
      retrySave.hidden = true;
      $('#retake').disabled = true;
      saveStatus.textContent = '결과를 계정에 저장하는 중입니다…';
      try {
        await bounded(owner.getIdToken());
        if (auth.currentUser?.uid !== owner.uid || generation !== epoch) return;
        await bounded(setDoc(doc(db, 'hackerAssessments', owner.uid), { version: assessmentVersion, answers: submitted, updatedAt: serverTimestamp() }));
        if (generation !== epoch) return;
        saveStatus.textContent = '진단 결과가 계정에 저장되었습니다.';
        pendingAnswers = null;
      } catch (error) {
        if (generation !== epoch) return;
        saveStatus.textContent = `결과는 위에서 확인할 수 있지만 계정 저장은 확인되지 않았습니다. ${message(error)}`;
        retrySave.hidden = false;
      } finally {
        if (generation === epoch) { busy = false; $('#retake').disabled = false; }
      }
    }
    async function loadResult(owner, generation) {
      $('#retry-load').hidden = true;
      $('#start-assessment').hidden = true;
      status.textContent = '이전 진단 결과를 확인하는 중입니다…';
      try {
        await bounded(owner.getIdToken());
        if (auth.currentUser?.uid !== owner.uid || generation !== epoch) return;
        const snapshot = await bounded(getDocFromServer(doc(db, 'hackerAssessments', owner.uid)));
        if (generation !== epoch) return;
        const data = snapshot.data();
        status.textContent = '로그인되었습니다. 진단 결과는 학습 추천에만 사용합니다.';
        if (data?.version === assessmentVersion && isValidAnswers(data.answers)) {
          showResult(data.answers);
          saveStatus.textContent = '계정에 저장된 최근 진단 결과입니다.';
        } else {
          $('#start-assessment').hidden = false;
          $('#start-assessment').disabled = false;
          status.textContent = '로그인되었습니다. 수준 진단 시작 버튼을 눌러 주세요.';
        }
      } catch (error) {
        if (generation !== epoch) return;
        status.textContent = `이전 기록을 확인하지 못했습니다. ${message(error)} 새 진단은 진행할 수 있습니다.`;
        $('#retry-load').hidden = false;
        $('#start-assessment').hidden = false;
        $('#start-assessment').disabled = false;
      }
    }
    onAuthStateChanged(auth, nextUser => {
      user = nextUser;
      const generation = ++epoch;
      busy = false; answers = []; pendingAnswers = null; current = 0;
      panel.hidden = true; resultPanel.hidden = true;
      $('#assessment-options').replaceChildren();
      $('#assessment-review').replaceChildren();
      $('#placement-title').textContent = '';
      $('#placement-score').textContent = '';
      $('#placement-breakdown').textContent = '';
      $('#placement-description').textContent = '';
      saveStatus.textContent = '';
      retrySave.hidden = true;
      $('#retry-load').hidden = true;
      $('#start-assessment').hidden = false;
      $('#start-assessment').disabled = true;
      $('#retake').disabled = false;
      login.hidden = Boolean(user);
      login.disabled = false;
      logout.hidden = !user;
      $('#account-name').textContent = user ? (user.displayName || '학습자') : '';
      if (!user) { status.textContent = 'Google로 로그인하면 수준 진단 시작 버튼이 활성화됩니다.'; return; }
      void loadResult(user, generation);
    }, error => { status.textContent = message(error); login.disabled = false; });
  } catch (error) {
    status.textContent = '로그인 기능을 불러오지 못했습니다. 네트워크 또는 콘텐츠 차단 설정을 확인하고 새로고침해 주세요. 강의는 계속 이용할 수 있습니다.';
    login.disabled = true;
  }
})();
