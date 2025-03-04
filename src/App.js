// src/App.js (앱 컨테이너)
import Router from './router.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import BoardPage from './pages/BoardPage.js';
import PostPage from './pages/PostPage.js';
import ProfilePage from './pages/ProfilePage.js';
import Header from './components/Header.js';

class App {
  constructor() {
    // 라우트 정의
    this.routes = {
      '/login': LoginPage,
      '/signup': SignUpPage,
      '/board': BoardPage,
      '/post': PostPage,
      '/profile': ProfilePage,
    };
  }

  mount() {
    // 앱 콘텐츠를 감싸는 컨테이너 생성
    const appContainer = document.getElementById('app');

    // 헤더 추가
    const header = new Header();
    appContainer.appendChild(header.render());

    // 메인 콘텐츠 영역 생성
    this.contentContainer = document.createElement('main');
    this.contentContainer.id = 'content';
    appContainer.appendChild(this.contentContainer);

    // 라우터 초기화 및 현재 경로에 맞는 페이지 렌더링
    this.router = new Router(this.routes, this.contentContainer);
    this.router.init();
  }
}

export default App;