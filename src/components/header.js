// src/components/Header.js
const Header = () => {
  // DOM 요소 생성
  const header = document.createElement('header');
  header.className = 'app-header';

  // 상태 확인
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  // 이벤트 리스너 등록 함수
  const init = () => {
    const logoutBtn = header.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
      });
    }
  };

  // 렌더링 함수
  const render = () => {
    const nav = document.createElement('nav');
    const title = document.createElement('h1');
    title.textContent = '아무말 대잔치';
    title.className = 'site-title';

    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';

    // 로그인 상태에 따라 다른 메뉴 표시
    if (isLoggedIn) {
      // 로그인 상태일 때 메뉴
      navLinks.innerHTML = `
        <a href="/board" data-link>게시판</a>
        <a href="/profile" data-link>프로필</a>
        <a href="#" id="logout-btn">로그아웃</a>
      `;
    } else {
      // 비로그인 상태일 때 메뉴
      navLinks.innerHTML = `
        <a href="/login" data-link>로그인</a>
        <a href="/signup" data-link>회원가입</a>
      `;
    }

    nav.appendChild(title);
    nav.appendChild(navLinks);
    header.appendChild(nav);

    return header;
  };

  // 렌더링 및 초기화
  const headerElement = render();
  setTimeout(init, 0);

  return {
    render: () => headerElement
  };
};

export default Header;