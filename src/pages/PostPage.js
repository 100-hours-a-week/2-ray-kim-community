import { postItems } from "../constants/response.js";

const PostPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'post-page';

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // 이벤트 리스너 등록 함수
  const init = () => {
    // 뒤로가기 버튼 이벤트 리스너
    const backButton = element.querySelector('.postpage-back-button');
    if (backButton) {
      backButton.addEventListener('click', () => {
        window.history.pushState(null, null, '/board');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    }
  }

  // 렌더링 함수
  const render = () => {
    // 게시글 데이터 조회
    const post = postItems.find(p => p.id === parseInt(postId)) || {
      id: 0,
      title: '게시글을 찾을 수 없습니다.',
      author: '알 수 없음',
      date: '알 수 없음',
      views: 0,
      content: '요청하신 게시글을 찾을 수 없습니다.'
    };

    // 게시글 상세 화면 렌더링
    element.innerHTML = `
      <div class="postpage-container">
        <!-- 뒤로가기 네비게이션 -->
        <div class="postpage-nav-header">
          <button class="postpage-back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 4L7 12L15 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <h1 class="postpage-title">아무 말 대잔치</h1>
          <div class="postpage-spacer"></div>
        </div>
        
        <!-- 게시글 헤더 -->
        <div class="postpage-header">
          <h2 class="postpage-post-title">${post.title}</h2>
          <div class="postpage-meta">
            <div class="postpage-author-info">
              <div class="postpage-user-avatar"></div>
              <span class="postpage-author-name">${post.author}</span>
              <span class="postpage-date">${post.date}</span>
            </div>
          </div>
        </div>
        
        <!-- 게시글 본문 -->
        <div class="postpage-content">
          ${post.content.split('\n').map(line => `<p>${line}</p>`).join('')}
        </div>
        
        <!-- 좋아요, 댓글, 공유 버튼 -->
        <div class="postpage-actions-bar">
          <button class="postpage-action-button" data-type="like">
            <span class="postpage-button-count">${post.likes || 0}</span>
            <span class="postpage-button-label">좋아요</span>
          </button>
          <button class="postpage-action-button" data-type="comment">
            <span class="postpage-button-count">${post.comments || 0}</span>
            <span class="postpage-button-label">댓글</span>
          </button>
          <button class="postpage-action-button" data-type="share">
            <span class="postpage-button-count">0</span>
            <span class="postpage-button-label">공유</span>
          </button>
        </div>
        
        <!-- 댓글 입력 -->
        <div class="postpage-comment-input-container">
          <form class="postpage-comment-form">
            <input type="text" class="postpage-comment-input" placeholder="댓글을 남겨보세요">
            <button type="submit" class="postpage-comment-submit">댓글 등록</button>
          </form>
        </div>
        
        <!-- 댓글 목록 -->
        <div class="postpage-comments-container">
          <div class="postpage-comments-list">
            <div class="postpage-comment-item">
              <div class="postpage-user-avatar"></div>
              <div class="postpage-comment-content">
                <div class="postpage-comment-author">댓글 작성자</div>
                <div class="postpage-comment-text">댓글 내용입니다.</div>
                <div class="postpage-comment-meta">2025-03-01</div>
              </div>
            </div>
          </div>
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

export default PostPage;