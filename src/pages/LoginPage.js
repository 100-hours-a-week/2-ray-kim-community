import { api } from "../services/api.js";
import { navigate } from "../utils/navigate.js";
import { setToken } from "../utils/token.js";

const LoginPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'login-page';

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 폼 데이터 수집
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    try {
      // 로그인 API 호출
      const response = await api.login(email, password);

      setToken(response.data.token);

      navigate('/board');
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 페이지 이동 함수
  const handleSignUp = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/signup');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    const form = element.querySelector('#login-form');
    form.addEventListener('submit', handleSubmit);

    const signUpButton = element.querySelector('.btn-signup');
    signUpButton.addEventListener('click', handleSignUp);
  };


  const render = () => {
    element.innerHTML = `
    <div class="login-container">
      <h2 class="login-container-header">
        로그인
      </h2>
      <form id="login-form">
        <div class="form-group">
          <label for="userEmail">아이디</label>
          <input type="email" id="userEmail" name="userEmail" placeholder="이메일을 입력하세요." required>
        </div>
        <div class="form-group">
          <label for="userPassword">비밀번호</label>
          <input type="password" id="userPassword" name="userPassword" placeholder="비밀번호를 입력하세요" required>
        </div>
        <button type="submit" class="btn-login">로그인</button>
      </form>
      <button class="btn-signup">회원가입</button>
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