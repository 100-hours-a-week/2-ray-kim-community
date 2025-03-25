const PostContent = (post, comments) => {
  const container = document.getElementsByClassName('post-page');

  container.innerHTML = `
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
          ${post.author.id ? `
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
 
      </div >
    </div >
  `;
};

export default PostContent;