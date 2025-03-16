import Router from './router.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import BoardPage from './pages/BoardPage.js';
import PostPage from './pages/PostPage.js';
import ProfilePage from './pages/ProfilePage.js';
import PostEditPage from './pages/PostEditPage.js';

const App = () => {
  const routes = {
    '/': LoginPage,
    '/login': LoginPage,
    '/signup': SignUpPage,
    '/board': BoardPage,
    '/post': PostPage,
    '/post-edit': PostEditPage,
    '/profile': ProfilePage,
  };

  const mount = () => {
    const appContainer = document.getElementById('app');

    const contentContainer = document.createElement('main');
    contentContainer.id = 'content';
    appContainer.appendChild(contentContainer);

    // 라우터 초기화 및 현재 경로에 맞는 페이지 렌더링
    const router = Router(routes, contentContainer);
    router.init();
  };

  return {
    mount
  };
};

export default App;