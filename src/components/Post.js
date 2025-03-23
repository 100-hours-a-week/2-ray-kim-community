import { api } from "../services/api.js";

const Post = (postData) => {
  const element = document.createElement('div');
  element.className = 'post-component';

  // 게시글 클릭 처리 함수
  const handlePostClick = () => {
    window.history.pushState(null, null, `/posts/${postData.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 이벤트 리스너 등록
  const init = () => {
    element.addEventListener('click', handlePostClick);
  };


  const render = () => {
    const author = postData.author || {};
    const authorName = author.nickname || author.name || '익명';
    const avatarUrl = author.profile_image || 'public/images/avatar.svg';

    // 날짜 포맷팅 - author.createdAt 우선 사용, 없으면 postData.date 사용
    let formattedDate;
    if (author.createdAt) {
      formattedDate = formatDate(author.createdAt);
    } else {
      formattedDate = formatDate(postData.date);
    }
    // innerHTML 방식으로 구현
    element.innerHTML = `
        <div class="post-container">
          <div class="post-top-wrapper">
            <div class="post-title">${postData.title}</div>
            <div class="post-info">
              <div>좋아요 ${postData.likes || 0}  댓글 ${postData.comments || 0}  조회수 ${postData.views || 0}</div>
              <div>${formattedDate}</div>
            </div>
          </div>
          <div class="author-container">
            <div class="author-avatar" style="background-image: url('${avatarUrl}')"></div>
            <div class="author-name">${authorName}</div>
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