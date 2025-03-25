import { api } from "../services/api.js";
import { navigate } from "../utils/navigate.js";

const Header = () => {
  // DOM 요소 생성
  const element = document.createElement('header');
  element.className = 'header-component';

  // 사용자 데이터
  let userData = null;

  const handleMenuItemClick = (e) => {
    const action = e.currentTarget.getAttribute('data-action');
    switch (action) {
      case 'profile':
        navigate(e, '/profile?type=profile');
        break;
      case 'password':
        navigate(e, '/profile?type=password');
        break;
      case 'board':
        navigate(e, '/board');
        break;
      default:
        console.warn('지원하지 않는 메뉴 액션', action);
    }

    const menuDropdown = element.querySelector('.header-menu-dropdown');
    // 메뉴 닫기
    if (menuDropdown) {
      menuDropdown.classList.remove('show');
    }
  };

  // 뒤로가기 버튼 클릭 처리 함수
  const handleBackClick = (e) => {
    navigate('/board');
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

  // 로그아웃 처리 함수
  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // API 호출하여 로그아웃
      await api.logout();

      // 로그인 페이지로 리다이렉트
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }

    // 메뉴 닫기
    const menuDropdown = element.querySelector('.header-menu-dropdown');
    if (menuDropdown) {
      menuDropdown.classList.remove('show');
    }
  };

  // 사용자 프로필 가져오기
  const fetchUserProfile = async () => {
    if (api.isAuthenticated()) {
      try {
        const response = await api.getProfile();
        userData = response.data;

        // 프로필 이미지 업데이트
        const profileImage = element.querySelector('.user-profile');
        if (profileImage && userData && userData.profile_image) {
          profileImage.src = userData.profile_image;
        }
      } catch (error) {
        console.error('사용자 프로필 조회 오류:', error);
      }
    }
  };

  // 이벤트 리스너 등록 함수
  const init = async () => {
    // 사용자 프로필 가져오기
    await fetchUserProfile();

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
      profileMenuItem.addEventListener('click', handleMenuItemClick);
    }

    const passwordMenuItem = element.querySelector('.menu-item[data-action="password"]');
    if (passwordMenuItem) {
      passwordMenuItem.addEventListener('click', handleMenuItemClick);
    }

    const boardMenuItem = element.querySelector('.menu-item[data-action="board"]');
    if (boardMenuItem) {
      boardMenuItem.addEventListener('click', handleMenuItemClick);
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
    const isNotLoginPage = window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/signup';
    const isAuthenticated = api.isAuthenticated();

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
          ${isNotLoginPage && isAuthenticated ? `
            <div class="header-profile-container">
              <img class="user-profile" alt="avatar" src="public/images/avatar.svg" />
              <div class="header-menu-dropdown">
                <div class="menu-item" data-action="profile">회원정보수정</div>
                <div class="menu-item" data-action="password">비밀번호수정</div>
                <div class="menu-item" data-action="board">게시판</div>
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