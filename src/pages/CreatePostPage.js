import { postItems } from "../constants/response.js";

const CreatePostPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'createpost-page';

  // 이벤트 리스너 등록 함수
  const init = () => {
    // 폼 제출 이벤트 리스너
    const form = element.querySelector('#create-post-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = form.querySelector('#post-title');
        const contentInput = form.querySelector('#post-content');
        const imageInput = form.querySelector('#image-tags');

        // 간단한 유효성 검사
        if (!titleInput.value || !contentInput.value) {
          alert('제목과 내용을 모두 입력해주세요.');
          return;
        }

        // 새 게시글 ID 생성 (기존 게시글 중 가장 큰 ID + 1)
        const newId = postItems.length > 0
          ? Math.max(...postItems.map(post => post.id)) + 1
          : 1;

        // 새 게시글 객체 생성
        const newPost = {
          id: newId,
          title: titleInput.value,
          content: contentInput.value,
          author: '작성자', // 실제 앱에서는 로그인한 사용자 정보 사용
          date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
          likes: 0,
          comments: 0,
          views: 0
        };

        // 게시글 목록에 추가
        postItems.unshift(newPost);

        // 게시글 작성 후 게시판 페이지로 이동
        window.history.pushState(null, null, '/board');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    }

    // 이미지 업로드 버튼 이벤트 리스너
    const imageButton = element.querySelector('.createpost-image-button');
    const imageInput = element.querySelector('#image-tags');
    const imageLabel = element.querySelector('.createpost-image-button-label');

    if (imageButton && imageInput) {
      imageButton.addEventListener('click', () => {
        imageInput.click();
      });

      imageInput.addEventListener('change', () => {
        if (imageInput.files.length > 0) {
          imageLabel.textContent = imageInput.files[0].name;
        } else {
          imageLabel.textContent = '파일을 선택해주세요';
        }
      });
    }
  };

  // 렌더링 함수
  const render = () => {
    element.innerHTML = `
      <div class="createpost-container">
        <!-- 게시글 작성 폼 -->
        <div class="createpost-form-container">
          <h2 class="createpost-form-title">게시글 작성</h2>
          
          <form id="create-post-form">
            <div class="createpost-form-group">
              <label for="post-title" class="createpost-form-label">제목<span class="createpost-required">*</span></label>
              <input 
                type="text" 
                id="post-title" 
                class="createpost-form-input" 
                placeholder="제목을 입력하세요. (최대 26글자)"
                required
              >
            </div>
            
            <div class="createpost-form-group">
              <label for="post-content" class="createpost-form-label">내용<span class="createpost-required">*</span></label>
              <textarea 
                id="post-content" 
                class="createpost-form-textarea" 
                rows="8" 
                placeholder="내용을 입력해주세요."
                required
              ></textarea>
            </div>
            
            <div class="createpost-form-group">
              <label for="image-tags" class="createpost-form-label">이미지</label>
              <div class="createpost-image-input-container">
                <button type="button" class="createpost-image-button">파일 선택</button>
                <span class="createpost-image-button-label">파일을 선택해주세요.</span>
              </div>
              <input type="file" id="image-tags" class="createpost-form-input-hidden" accept="image/*">
            </div>
            
            <button type="submit" class="createpost-submit-button">등록하기</button>
        
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

export default CreatePostPage;