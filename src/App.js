import Router from './router.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import BoardPage from './pages/BoardPage.js';
import PostPage from './pages/PostPage.js';
import ProfilePage from './pages/ProfilePage.js';
import Header from './components/Header.js';

const App = () => {
  // 라우트 정의
  const routes = {
    '/': LoginPage,
    '/login': LoginPage,
    '/signup': SignUpPage,
    '/board': BoardPage,
    '/post': PostPage,
    '/profile': ProfilePage,
  };

  // 앱 마운트 함수
  const mount = () => {
    // 앱 콘텐츠를 감싸는 컨테이너 생성
    const appContainer = document.getElementById('app');

    // 헤더 추가 (함수형 컴포넌트 호출)
    const header = Header();
    appContainer.appendChild(header.render());

    // 메인 콘텐츠 영역 생성
    const contentContainer = document.createElement('main');
    contentContainer.id = 'content';
    appContainer.appendChild(contentContainer);

    // 라우터 초기화 및 현재 경로에 맞는 페이지 렌더링
    const router = Router(routes, contentContainer);
    router.init();
  };

  // 앱 객체 반환
  return {
    mount
  };
};

export default App;