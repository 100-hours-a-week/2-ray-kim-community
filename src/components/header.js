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

  // 이벤트 리스너 등록 함수
  const init = () => {
    const backButton = element.querySelector('.header-back-button');
    if (backButton) {
      backButton.addEventListener('click', handleBackClick);
    }
  };

  const render = () => {
    const isPostPage = window.location.pathname === '/post' || window.location.pathname.includes('/post?');

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