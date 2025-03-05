const LoginPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'login-page';

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 게시판 페이지로 이동
    window.history.pushState(null, null, '/board');
    window.dispatchEvent(new PopStateEvent('popstate'));
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
    <form id="login-form" onSubmit="handleSubmit(event)">
    <div class="form-group">
    <label for="userEmail">아이디</label>
    <input type="email" id="userEmail" name="userEmail" required>
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

  return {
    init: init,
    render: render
  };
};

export default LoginPage;

// ACA0EB
// 7F6AEE