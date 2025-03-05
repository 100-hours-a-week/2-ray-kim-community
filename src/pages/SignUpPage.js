const SignUpPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'signup-page';

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 값 가져오기
    const userId = element.querySelector('#userId').value;
    const userPassword = element.querySelector('#userPassword').value;
    const confirmPassword = element.querySelector('#confirmPassword').value;
    const userName = element.querySelector('#userName').value;
    const userEmail = element.querySelector('#userEmail').value;

    // 간단한 유효성 검사
    if (!userId || !userPassword || !confirmPassword || !userName || !userEmail) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (userPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 성공 메시지 표시
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');

    // 로그인 페이지로 이동
    window.history.pushState(null, null, '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    const form = element.querySelector('#signup-form');
    form.addEventListener('submit', handleSubmit);
  };

  // 렌더링 함수
  const render = () => {
    element.innerHTML = `
      <div class="signup-container">
        <h2>회원가입</h2>
        <form id="signup-form">
          <div class="form-group">
            <label for="userId">아이디</label>
            <input type="text" id="userId" name="userId" required>
          </div>
          <div class="form-group">
            <label for="userPassword">비밀번호</label>
            <input type="password" id="userPassword" name="userPassword" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">비밀번호 확인</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
          </div>
          <div class="form-group">
            <label for="userName">이름</label>
            <input type="text" id="userName" name="userName" required>
          </div>
          <div class="form-group">
            <label for="userEmail">이메일</label>
            <input type="email" id="userEmail" name="userEmail" required>
          </div>
          <button type="submit" class="btn-signup">가입하기</button>
        </form>
        <div class="login-link">
          이미 계정이 있으신가요? <a href="/login" data-link>로그인</a>
        </div>
      </div>
    `;

    return element;
  };

  // 페이지 반환 (렌더링 및 초기화)
  const page = render();
  setTimeout(init, 0);

  return {
    render: () => page,
    init: () => { } // 이미 init 호출했으므로 빈 함수
  };
};

export default SignUpPage;