import { routes } from "./constants/routes.js";
import Layout from "./layout.js";

const Router = (pathname = window.location.pathname) => {
  window.addEventListener('popstate', () => Router(window.location.pathname));

  const body = document.body;
  body.innerHTML = '';
  const main = document.getElementById('main');

  // 레이아웃 컴포넌트
  const layout = Layout();
  body.appendChild(layout);

  // 내부 영역 컴포넌트
  const path = pathname === '/' ? '/' : `/${pathname.split('/')[1]}`;
  const page = document.createElement('div');
  page.className = `${path}-page`;

  const PageComponent = routes[path];
  const pageElement = PageComponent();
  page.innerHTML = pageElement;
  main.appendChild(page);

  body.appendChild(main);

  Layout.init();
  PageComponent.init();
};

export default Router;