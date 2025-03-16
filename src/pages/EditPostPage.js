import { postItems } from "../constants/response.js";

const EditPostPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'editpost-page';

  // URL에서 게시글 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // 이벤트 리스너 등록 함수
  const init = () => {
    // 뒤로가기 버튼 이벤트 리스너
    const backButton = element.querySelector('.editpost-back-button');
    if (backButton) {
      backButton.addEventListener('click', () => {
        window.history.pushState(null, null, '/board');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    }

    // 폼 제출 이벤트 리스너
    const form = element.querySelector('#edit-post-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = form.querySelector('#post-title');
        const contentInput = form.querySelector('#post-content');
        const imageInput = form.querySelector('#image-tags');

        // 실제 애플리케이션에서는 여기에 API 호출이 들어가야 함
        // 간단한 예시를 위해 게시글 데이터만 업데이트
        const postIndex = postItems.findIndex(p => p.id === parseInt(postId));
        if (postIndex !== -1) {
          postItems[postIndex].title = titleInput.value;
          postItems[postIndex].content = contentInput.value;
        }

        // 수정 완료 후 상세 페이지로 이동
        window.history.pushState(null, null, `/post?id=${postId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    }
  };

  // 렌더링 함수
  const render = () => {
    // 게시글 데이터 조회
    const post = postItems.find(p => p.id === parseInt(postId)) || {
      id: 0,
      title: '',
      content: '',
    };

    // 게시글 수정 화면 렌더링
    element.innerHTML = `
      <div class="editpost-container">
        <!-- 게시글 수정 폼 -->
        <div class="editpost-form-container">
          <h2 class="editpost-form-title">게시글 수정</h2>
          
          <form id="edit-post-form">
            <div class="editpost-form-group">
              <label for="post-title" class="editpost-form-label">제목<span class="editpost-required">*</span></label>
              <input 
                type="text" 
                id="post-title" 
                class="editpost-form-input" 
                value="${post.title}"
                placeholder="제목 1"
                required
              >
            </div>
            
            <div class="editpost-form-group">
              <label for="post-content" class="editpost-form-label">내용<span class="editpost-required">*</span></label>
              <textarea 
                id="post-content" 
                class="editpost-form-textarea" 
                rows="8" 
                placeholder="게시글 내용을 입력하세요"
                required
              >${post.content || ''}</textarea>
            </div>
            
            <div class="editpost-form-group">
              <label for="image-tags" class="editpost-form-label">이미지</label>
              <div class="editpost-image-input-container">
                <button type="button" class="editpost-image-button">파일 선택</button>
                <span class="editpost-image-button-label">기존 파일 없음</span>
              </div>
              <input type="file" id="image-tags" class="editpost-form-input-hidden">
            </div>
            
            <button type="submit" class="editpost-submit-button">수정하기</button>
          </form>
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

export default EditPostPage;