const Router = (routes, container) => {
  // 현재 경로 상태
  let currentPath = window.location.pathname;

  // 페이지 렌더링 함수
  const renderPage = (pathname) => {
    // 컨테이너 비우기
    container.innerHTML = '';

    // 해당 라우트의 페이지 컴포넌트 렌더링
    const path = pathname === '/' ? '/' : `/${pathname.split('/')[1]}`;
    const PageComponent = routes[path] || routes['/'];
    const page = PageComponent();
    container.appendChild(page.render());

    // 페이지 초기화 (이벤트 핸들러 등록 등)
    if (typeof page.init === 'function') {
      page.init();
    }
  };

  // 페이지 이동 함수
  const navigateTo = (path) => {
    // 현재 URL과 같다면 무시
    if (path === currentPath) return;

    // 히스토리 API로 URL 변경
    window.history.pushState(null, null, path);
    currentPath = path;
    renderPage(path);
  };

  // 라우터 초기화 함수
  const init = () => {
    // 초기 로드 시 현재 경로의 페이지 렌더링
    renderPage(currentPath);

    // 네비게이션 링크에 대한 이벤트 위임
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigateTo(e.target.getAttribute('href'));
      }
    });

    // 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', () => {
      currentPath = window.location.pathname;
      renderPage(currentPath);
    });
  };

  // 라우터 객체 반환
  return {
    init,
    navigateTo,
    renderPage
  };
};

export default Router;