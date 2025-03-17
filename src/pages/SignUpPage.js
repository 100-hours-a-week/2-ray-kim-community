const SignUpPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'signup-page';

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 값 가져오기
    const userName = element.querySelector('#userName').value;
    const userPassword = element.querySelector('#userPassword').value;
    const passwordCheck = element.querySelector('#passwordCheck').value;
    const userEmail = element.querySelector('#userEmail').value;

    // 간단한 유효성 검사
    if (!userName || !userPassword || !passwordCheck || !userEmail) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (userPassword !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 성공 메시지 표시
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');

    // 로그인 페이지로 이동
    window.history.pushState(null, null, '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 프로필 사진 업로드 처리 함수
  const handlePhotoUpload = () => {
    const photoInput = element.querySelector('#photoInput');
    photoInput.click();
  };

  // 이미지 파일 선택 처리 함수
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoCircle = element.querySelector('.signup-photo-circle');
        photoCircle.style.backgroundImage = `url(${event.target.result})`;
        photoCircle.style.backgroundSize = 'cover';
        photoCircle.style.backgroundPosition = 'center';

        // 플러스 아이콘 숨기기
        const plusIcon = photoCircle.querySelector('.signup-photo-icon');
        if (plusIcon) {
          plusIcon.style.display = 'none';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    const form = element.querySelector('#signup-form');
    form.addEventListener('submit', handleSubmit);

    const photoCircle = element.querySelector('.signup-photo-circle');
    photoCircle.addEventListener('click', handlePhotoUpload);

    const photoInput = element.querySelector('#photoInput');
    photoInput.addEventListener('change', handleFileChange);
  };

  // 렌더링 함수
  const render = () => {
    element.innerHTML = `
      <div class="signup-container">
        <h2 class="signup-title">회원가입</h2>
        
        <form id="signup-form">
          <div class="signup-form-group">
            <label class="signup-form-label" for="photoInput">프로필 사진</label>
            <div class="signup-photo-container">
              <div class="signup-photo-circle">
                <span class="signup-photo-icon">+</span>
              </div>
              <input type="file" id="photoInput" class="signup-photo-input" accept="image/*">
            </div>
          </div>
          
          <div class="signup-form-group">
            <label class="signup-form-label" for="userName">이메일<span class="signup-required">*</span></label>
            <input type="text" id="userName" class="signup-form-input" placeholder="이메일을 입력하세요">
          </div>
          
          <div class="signup-form-group">
            <label class="signup-form-label" for="userPassword">비밀번호<span class="signup-required">*</span></label>
            <input type="password" id="userPassword" class="signup-form-input" placeholder="비밀번호를 입력하세요">
          </div>
          
          <div class="signup-form-group">
            <label class="signup-form-label" for="passwordCheck">비밀번호 확인<span class="signup-required">*</span></label>
            <input type="password" id="passwordCheck" class="signup-form-input" placeholder="비밀번호를 한번 더 입력하세요">
          </div>
          
          <div class="signup-form-group">
            <label class="signup-form-label" for="userEmail">닉네임<span class="signup-required">*</span></label>
            <input type="email" id="userEmail" class="signup-form-input" placeholder="닉네임을 입력하세요.">
          </div>
          
          <button type="submit" class="signup-btn">회원가입</button>
          <a href="/login" data-link class="signup-link">로그인하러 가기</a>
        </form>
      </div>
    `;

    return element;
  };

  // 페이지 반환 및 초기화
  const page = render();
  setTimeout(init, 0);

  return {
    render: () => page,
    init: () => { }
  };
};

export default SignUpPage;