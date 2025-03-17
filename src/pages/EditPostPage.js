import { api } from "../services/api.js";

const EditPostPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'editpost-page';

  // URL에서 게시글 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // 이미지 파일 저장
  let imageFile = null;

  // 게시글 수정 처리
  const handleEditPost = async (e) => {
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
      content: contentInput.value
    };

    // 이미지가 있으면 추가
    if (imageFile) {
      postData.image = imageFile;
    }

    try {
      // API 호출
      await api.updatePost(postId, postData);

      alert('게시글이 성공적으로 수정되었습니다.');
      window.history.pushState(null, null, `/post?id=${postId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 파일 저장
      imageFile = file;

      // 파일명 표시
      const imageLabel = element.querySelector('.editpost-image-button-label');
      if (imageLabel) {
        imageLabel.textContent = file.name;
      }
    }
  };

  // 게시글 데이터 가져오기
  const fetchPostData = async () => {
    try {
      const response = await api.getPost(postId);
      const post = response.data;

      // 폼 필드에 데이터 채우기
      const titleInput = element.querySelector('#post-title');
      const contentInput = element.querySelector('#post-content');

      if (titleInput && contentInput) {
        titleInput.value = post.title;
        contentInput.value = post.content;
      }
    } catch (error) {
      console.error('게시글 조회 오류:', error);
      alert('게시글을 불러오는 중 오류가 발생했습니다.');
      window.history.pushState(null, null, '/board');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // 이벤트 리스너 등록 함수
  const init = async () => {
    // 게시글 데이터 가져오기
    await fetchPostData();

    // 폼 제출 이벤트 리스너
    const form = element.querySelector('#edit-post-form');
    if (form) {
      form.addEventListener('submit', handleEditPost);
    }

    // 이미지 업로드 버튼 이벤트 리스너
    const imageButton = element.querySelector('.editpost-image-button');
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
                placeholder="제목을 입력하세요. (최대 26글자)"
                required
              >
            </div>
            
            <div class="editpost-form-group">
              <label for="post-content" class="editpost-form-label">내용<span class="editpost-required">*</span></label>
              <textarea 
                id="post-content" 
                class="editpost-form-textarea" 
                rows="8" 
                placeholder="내용을 입력해주세요."
                required
              ></textarea>
            </div>
            
            <div class="editpost-form-group">
              <label for="image-tags" class="editpost-form-label">이미지</label>
              <div class="editpost-image-input-container">
                <button type="button" class="editpost-image-button">파일 선택</button>
                <span class="editpost-image-button-label">기존 파일 또는 새 파일을 선택하세요</span>
              </div>
              <input type="file" id="image-tags" class="editpost-form-input-hidden" accept="image/*">
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