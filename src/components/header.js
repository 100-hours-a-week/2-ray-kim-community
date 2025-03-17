const Header = () => {
  // DOM 요소 생성
  const element = document.createElement('header');
  element.className = 'header-component';

  // 뒤로가기 버튼 클릭 처리 함수
  const handleBackClick = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, '/board');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 프로필 클릭 처리 함수 (드롭다운 메뉴 토글)
  const handleProfileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const menuDropdown = element.querySelector('.header-menu-dropdown');
    if (menuDropdown) {
      menuDropdown.classList.toggle('show');
    }
  };

  // 프로필 페이지로 이동하는 함수
  const navigateToProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.history.pushState(null, null, '/profile?type=profile');
    window.dispatchEvent(new PopStateEvent('popstate'));
    // 메뉴 닫기
    const menuDropdown = element.querySelector('.header-menu-dropdown');
    if (menuDropdown) {
      menuDropdown.classList.remove('show');
    }
  };

  // 비밀번호 변경 페이지로 이동하는 함수
  const navigateToPasswordChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.history.pushState(null, null, '/profile?type=password');
    window.dispatchEvent(new PopStateEvent('popstate'));
    // 메뉴 닫기
    const menuDropdown = element.querySelector('.header-menu-dropdown');
    if (menuDropdown) {
      menuDropdown.classList.remove('show');
    }
  };

  // 게시판 페이지로 이동하는 함수
  const navigateToBoard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.history.pushState(null, null, '/board');
    window.dispatchEvent(new PopStateEvent('popstate'));
    // 메뉴 닫기
    const menuDropdown = element.querySelector('.header-menu-dropdown');
    if (menuDropdown) {
      menuDropdown.classList.remove('show');
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // 실제 구현에서는 세션/토큰 제거 등의 로직이 필요
    window.history.pushState(null, null, '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
    // 메뉴 닫기
    const menuDropdown = element.querySelector('.header-menu-dropdown');
    if (menuDropdown) {
      menuDropdown.classList.remove('show');
    }
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    const backButton = element.querySelector('.header-back-button');
    if (backButton) {
      backButton.addEventListener('click', handleBackClick);
    }

    const profileImage = element.querySelector('.user-profile');
    if (profileImage) {
      profileImage.addEventListener('click', handleProfileClick);
    }

    const profileMenuItem = element.querySelector('.menu-item[data-action="profile"]');
    if (profileMenuItem) {
      profileMenuItem.addEventListener('click', navigateToProfile);
    }

    const passwordMenuItem = element.querySelector('.menu-item[data-action="password"]');
    if (passwordMenuItem) {
      passwordMenuItem.addEventListener('click', navigateToPasswordChange);
    }

    const boardMenuItem = element.querySelector('.menu-item[data-action="board"]');
    if (boardMenuItem) {
      boardMenuItem.addEventListener('click', navigateToBoard);
    }

    const logoutMenuItem = element.querySelector('.menu-item[data-action="logout"]');
    if (logoutMenuItem) {
      logoutMenuItem.addEventListener('click', handleLogout);
    }

    // 메뉴 바깥 영역 클릭 시 메뉴 닫기
    document.addEventListener('click', () => {
      const menuDropdown = element.querySelector('.header-menu-dropdown');
      if (menuDropdown && menuDropdown.classList.contains('show')) {
        menuDropdown.classList.remove('show');
      }
    });
  };

  const render = () => {
    const isPostPage = window.location.pathname === '/post' || window.location.pathname.includes('/post');
    const isNotLoginPage = window.location.pathname !== '/' && window.location.pathname !== '/login';

    element.innerHTML = `
      <div class="header-container">
        <div class="header-wrapper">
          ${isPostPage ? `
          <button class="header-back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 4L7 12L15 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          ` : ''}
          <h1 class="header-title">
            아무 말 대잔치
          </h1>
          ${isPostPage ? '<div class="header-spacer"></div>' : ''}
          ${isNotLoginPage ? `
            <div class="header-profile-container">
              <img class="user-profile" alt="avatar" src="src/avatar.svg" />
              <div class="header-menu-dropdown">
                <div class="menu-item" data-action="profile">회원정보수정</div>
                <div class="menu-item" data-action="password">비밀번호수정</div>
                <div class="menu-item" data-action="logout">로그아웃</div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    return element;
  };

  return {
    render: render,
    init: init
  };
};

export default Header;