import Post from "../components/Post.js"

const BoardPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'board-page';

  // 샘플 게시글 데이터
  const posts = [
    { id: 1, title: '첫 번째 게시글입니다.', author: '작성자1', date: '2025-03-01', views: 45 },
    { id: 2, title: '안녕하세요, 반갑습니다!', author: '작성자2', date: '2025-03-02', views: 32 },
    { id: 3, title: '바닐라 JS로 SPA 만들기', author: '작성자3', date: '2025-03-03', views: 128 },
    { id: 4, title: 'JavaScript 함수형 컴포넌트', author: '작성자4', date: '2025-03-04', views: 75 },
    { id: 5, title: 'History API의 활용', author: '작성자5', date: '2025-03-05', views: 64 }
  ];
  // 이벤트 리스너 등록 함수
  const init = () => {
    // 글쓰기 버튼 이벤트
    const writeBtn = element.querySelector('#write-btn');
    if (writeBtn) {
      writeBtn.addEventListener('click', () => {
        window.history.pushState(null, null, '/post');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    }

    // 게시글 클릭 이벤트
    const postItems = element.querySelectorAll('.post-item');
    postItems.forEach(item => {
      item.addEventListener('click', () => {
        const postId = item.getAttribute('data-id');
        window.history.pushState({ postId }, null, `/post?id=${postId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    });
  };

  // 렌더링 함수
  const render = () => {
    element.innerHTML = `
      <div class="board-container">
        ${Post}     
      </div>
    `;

    return element;
  };

  return {
    render: render,
    init: init
  };
};

export default BoardPage;