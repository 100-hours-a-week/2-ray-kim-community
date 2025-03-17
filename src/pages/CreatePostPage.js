import { api } from "../services/api.js";

const CreatePostPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'createpost-page';

  // 이미지 파일 저장
  let imageFile = null;

  // 게시글 생성 처리
  const handleCreatePost = async (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');

    // 간단한 유효성 검사
    if (!titleInput.value || !contentInput.value) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 게시글 데이터 준비
    const postData = {
      title: titleInput.value,
      content: contentInput.value,
      image: imageFile
    };

    try {
      // API 호출
      await api.createPost(postData);

      alert('게시글이 성공적으로 등록되었습니다.');
      window.history.pushState(null, null, '/board');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('게시글 등록 오류:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 파일 저장
      imageFile = file;

      // 파일명 표시
      const imageLabel = element.querySelector('.createpost-image-button-label');
      if (imageLabel) {
        imageLabel.textContent = file.name;
      }
    }
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    // 폼 제출 이벤트 리스너
    const form = element.querySelector('#create-post-form');
    if (form) {
      form.addEventListener('submit', handleCreatePost);
    }

    // 이미지 업로드 버튼 이벤트 리스너
    const imageButton = element.querySelector('.createpost-image-button');
    const imageInput = element.querySelector('#image-tags');

    if (imageButton && imageInput) {
      imageButton.addEventListener('click', () => {
        imageInput.click();
      });

      imageInput.addEventListener('change', handleImageUpload);
    }
  };


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