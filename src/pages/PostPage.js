import { api } from "../services/api.js";

const PostPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'post-page';

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  let post = null;

  // 게시글 삭제 처리
  const handleDeletePost = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await api.deletePost(postId);
      alert('게시글이 삭제되었습니다.');
      window.history.pushState(null, null, '/board');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  // 좋아요 처리
  const handleLikePost = async () => {
    try {
      await api.likePost(postId);

      // 좋아요 수 업데이트
      const likeCountElement = element.querySelector('[data-type="like"] .postpage-button-count');
      if (likeCountElement) {
        likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
      }
    } catch (error) {
      console.error('좋아요 오류:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  // 댓글 추가
  const handleAddComment = async (e) => {
    e.preventDefault();

    const commentInput = element.querySelector('.postpage-comment-input');
    const commentText = commentInput.value.trim();

    if (!commentText) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await api.createComment(postId, commentText);

      // 댓글 입력 필드 초기화
      commentInput.value = '';

      // 댓글 작성 후 페이지 새로고침
      await fetchPostAndRender();
    } catch (error) {
      console.error('댓글 등록 오류:', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  // 게시글 편집 페이지 이동
  const handleEditPostClick = () => {
    window.history.pushState(null, null, `/post-edit?id=${postId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 게시글 데이터 가져오기 및 렌더링
  const fetchPostAndRender = async () => {
    try {
      const response = await api.getPost(postId);
      post = response.data;
      renderPost();
      attachEventListeners();
    } catch (err) {
      console.error('게시글 조회 오류:', err);
      element.innerHTML = `
        <div class="postpage-container">
          <p>게시글을 불러오는 중 오류가 발생했습니다.</p>
          <button class="back-to-board">게시판으로 돌아가기</button>
        </div>
      `;

      const backButton = element.querySelector('.back-to-board');
      if (backButton) {
        backButton.addEventListener('click', () => {
          window.history.pushState(null, null, '/board');
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
      }
    }
  };

  // 게시글 내용 렌더링
  const renderPost = () => {
    if (!post) return;

    // 현재 사용자 정보
    const currentUser = api.getCurrentUser();
    const isAuthor = currentUser && post.author.id === currentUser.id;

    // 댓글 HTML 생성
    const commentsHTML = post.comments_data && post.comments_data.length
      ? post.comments_data.map(comment => `
        <div class="postpage-comment-item">
          <div class="postpage-user-avatar" style="background-image: url('${comment.author.profile_image}')"></div>
          <div class="postpage-comment-content">
            <div class="postpage-comment-author">${comment.author.nickname}</div>
            <div class="postpage-comment-text">${comment.content}</div>
            <div class="postpage-comment-meta">${comment.date}</div>
          </div>
        </div>
      `).join('')
      : '<p>댓글이 없습니다. 첫 댓글을 작성해보세요!</p>';

    element.innerHTML = `
      <div class="postpage-container">        
        <!-- 게시글 헤더 -->
        <div class="postpage-header">
          <h2 class="postpage-post-title">${post.title}</h2>
          <div class="postpage-meta">
            <div class="postpage-author-info">
              <div class="postpage-user-avatar" style="background-image: url('${post.author.profile_image}')"></div>
              <span class="postpage-author-name">${post.author.nickname}</span>
              <span class="postpage-date">${post.date}</span>
            </div>
            ${isAuthor ? `
            <div class="postpage-post-actions">
              <button class="postpage-btn-edit">수정</button>
              <button class="postpage-btn-delete">삭제</button>
            </div>
            ` : ''}
          </div>
        </div> 
        
        <!-- 게시글 본문 --> 
        <div class="postpage-content">
          ${post.content ? post.content.split('\n').map(line => `<p>${line}</p>`).join('') : '<p>내용이 없습니다.</p>'}
        </div>
        
        <!-- 좋아요, 댓글, 공유 버튼 -->
        <div class="postpage-actions-bar">
          <div class="postpage-actions-btn-wrapper">
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
            ${commentsHTML}
          </div>
        </div>
      </div>
    `;
  };

  // 이벤트 리스너 연결
  const attachEventListeners = () => {
    const editButton = element.querySelector('.postpage-btn-edit');
    if (editButton) {
      editButton.addEventListener('click', handleEditPostClick);
    }

    const deleteButton = element.querySelector('.postpage-btn-delete');
    if (deleteButton) {
      deleteButton.addEventListener('click', handleDeletePost);
    }

    const likeButton = element.querySelector('[data-type="like"]');
    if (likeButton) {
      likeButton.addEventListener('click', handleLikePost);
    }

    const commentForm = element.querySelector('.postpage-comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', handleAddComment);
    }
  };

  // 이벤트 리스너 등록 함수
  const init = async () => {
    await fetchPostAndRender();
  };


  const render = () => {
    element.innerHTML = `
      <div class="postpage-container">
        <p>게시글을 불러오는 중입니다...</p>
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