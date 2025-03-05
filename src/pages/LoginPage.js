const LoginPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'login-page';

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 값 가져오기
    const userId = element.querySelector('#userId').value;
    const userPassword = element.querySelector('#userPassword').value;

    // 간단한 유효성 검사
    if (!userId || !userPassword) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 로그인 처리 (실제로는 아무 값이나 입력해도 로그인 성공)
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userId', userId);

    // 게시판 페이지로 이동
    window.history.pushState(null, null, '/board');
    window.dispatchEvent(new PopStateEvent('popstate'));

    // 헤더 메뉴 업데이트를 위해 페이지 새로고침
    window.location.reload();
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    const form = element.querySelector('#login-form');
    form.addEventListener('submit', handleSubmit);
  };

  // 렌더링 함수
  const render = () => {
    element.innerHTML = `
      <div class="login-container">
        <h2>로그인</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="userId">아이디</label>
            <input type="text" id="userId" name="userId" required>
          </div>
          <div class="form-group">
            <label for="userPassword">비밀번호</label>
            <input type="password" id="userPassword" name="userPassword" required>
          </div>
          <button type="submit" class="btn-login">로그인</button>
        </form>
        <div class="signup-link">
          계정이 없으신가요? <a href="/signup" data-link>회원가입</a>
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

export default LoginPage;