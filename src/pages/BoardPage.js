const BoardPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'board-page';

  // 상태 및 데이터
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  // 샘플 게시글 데이터
  const posts = [
    { id: 1, title: '첫 번째 게시글입니다.', author: '작성자1', date: '2025-03-01', views: 45 },
    { id: 2, title: '안녕하세요, 반갑습니다!', author: '작성자2', date: '2025-03-02', views: 32 },
    { id: 3, title: '바닐라 JS로 SPA 만들기', author: '작성자3', date: '2025-03-03', views: 128 },
    { id: 4, title: 'JavaScript 함수형 컴포넌트', author: '작성자4', date: '2025-03-04', views: 75 },
    { id: 5, title: 'History API의 활용', author: '작성자5', date: '2025-03-05', views: 64 }
  ];

  // 게시글 목록 HTML 생성 함수
  const renderPosts = () => {
    return posts.map(post => `
      <tr class="post-item" data-id="${post.id}">
        <td>${post.id}</td>
        <td class="post-title">${post.title}</td>
        <td>${post.author}</td>
        <td>${post.date}</td>
        <td>${post.views}</td>
      </tr>
    `).join('');
  };

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
    // 비로그인 상태라면 로그인 페이지로 리다이렉트
    if (!isLoggedIn) {
      setTimeout(() => {
        alert('로그인이 필요한 페이지입니다.');
        window.history.pushState(null, null, '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 0);
      return element;
    }

    element.innerHTML = `
      <div class="board-container">
        <h2>게시판</h2>
        <div class="board-actions">
          <button id="write-btn" class="btn-write">글쓰기</button>
        </div>
        <table class="board-table">
          <thead>
            <tr>
              <th width="10%">번호</th>
              <th width="50%">제목</th>
              <th width="15%">작성자</th>
              <th width="15%">작성일</th>
              <th width="10%">조회수</th>
            </tr>
          </thead>
          <tbody id="posts-list">
            ${renderPosts()}
          </tbody>
        </table>
        <div class="pagination">
          <a href="#" class="page-link active">1</a>
          <a href="#" class="page-link">2</a>
          <a href="#" class="page-link">3</a>
          <a href="#" class="page-link">4</a>
          <a href="#" class="page-link">5</a>
        </div>
      </div>
    `;

    return element;
  };

  // 페이지 반환 (렌더링 및 초기화)
  const page = render();
  setTimeout(init, 0);

  return {
    render: () => page,
    init: () => { } // 이미 init 호출했으므로 빈 함수
  };
};

export default BoardPage;