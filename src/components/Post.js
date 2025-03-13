export default function Post() {

  const element = document.createElement('div');
  element.className = 'post-component';

  // 게시글 클릭 처리 함수
  const handlePostClick = () => {
    // 게시글 상세 페이지로 이동
    // window.history.pushState(null, null, `/post?id=${postData.id}`);
    window.history.pushState(null, null, `/post`);
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
        <div class="post-container" onClick>
          <div class="post-top-wrapper">
            <div class="post-title">제목 1</div>
            <div class="post-info">
              <div>좋아요 0  댓글 0  조회수 0</div>
              <div>2021-01-01 00:00:00</div>
            </div>
          </div>
          <div class="author-container">
            <div class="author-avatar"></div>
            <div class="author-name">더미 작성자 1</div>
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