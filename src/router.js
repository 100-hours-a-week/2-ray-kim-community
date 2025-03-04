class Router {
  constructor(routes, container) {
    this.routes = routes;
    this.container = container;
  }

  init() {
    // 초기 로드와 해시 변경 이벤트에 대한 리스너 설정
    window.addEventListener('load', () => this.handleRouteChange());
    window.addEventListener('hashchange', () => this.handleRouteChange());

    // 네비게이션 링크에 대한 이벤트 위임
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigateTo(e.target.getAttribute('href'));
      }
    });
  }

  handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/';
    this.renderPage(hash);
  }

  renderPage(route) {
    // 컨테이너 비우기
    this.container.innerHTML = '';

    // 해당 라우트의 페이지 컴포넌트 렌더링
    const PageComponent = this.routes[route] || this.routes['404'];
    const page = new PageComponent();
    this.container.appendChild(page.render());

    // 페이지 초기화 (이벤트 핸들러 등록 등)
    if (typeof page.init === 'function') {
      page.init();
    }
  }

  renderCurrentPage() {
    const hash = window.location.hash.slice(1) || '/';
    this.renderPage(hash);
  }

  navigateTo(path) {
    window.location.hash = path;
  }
}

export default Router;