const Post = (postData) => {
  const element = document.createElement('div');
  element.className = 'post-component';

  // 게시글 클릭 처리 함수
  const handlePostClick = () => {
    window.history.pushState(null, null, `/post?id=${postData.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 이벤트 리스너 등록
  const init = () => {
    element.addEventListener('click', handlePostClick);
  };

  // 렌더링 함수
  const render = () => {
    // innerHTML 방식으로 구현
    element.innerHTML = `
        <div class="post-container">
          <div class="post-top-wrapper">
            <div class="post-title">${postData.title}</div>
            <div class="post-info">
              <div>좋아요 ${postData.likes || 0}  댓글 ${postData.comments || 0}  조회수 ${postData.views || 0}</div>
              <div>${postData.date}</div>
            </div>
          </div>
          <div class="author-container">
            <div class="author-avatar"></div>
            <div class="author-name">${postData.author}</div>
          </div>
        </div>
      `;

    init();

    return element;
  };

  return {
    render: render
  };
};

export default Post;