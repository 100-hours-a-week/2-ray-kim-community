const ProfilePage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'profilepage-container-wrapper';

  // URL에서 페이지 타입 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const pageType = urlParams.get('type') || 'profile'; // 'profile' 또는 'password'

  // 프로필 폼 제출 처리 함수
  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // 폼 데이터 수집
    const nameInput = document.getElementById('profile-userName');

    // 실제 애플리케이션에서는 여기에 API 호출하여 프로필 업데이트
    console.log('프로필 업데이트:', {
      name: nameInput.value
    });

    // 성공 메시지 표시
    alert('프로필이 성공적으로 업데이트되었습니다.');

    // 게시판 페이지로 리다이렉트
    window.history.pushState(null, null, '/board');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 비밀번호 폼 제출 처리 함수
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // 폼 데이터 수집
    const passwordInput = document.getElementById('profile-userPassword');
    const passwordConfirmInput = document.getElementById('profile-userPasswordConfirm');

    // 비밀번호 확인 검증
    if (passwordInput.value !== passwordConfirmInput.value) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // 실제 애플리케이션에서는 여기에 API 호출하여 비밀번호 업데이트
    console.log('비밀번호 업데이트됨');

    // 성공 메시지 표시
    alert('비밀번호가 성공적으로 변경되었습니다.');

    // 게시판 페이지로 리다이렉트
    window.history.pushState(null, null, '/board');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 회원 탈퇴 처리 함수
  const handleWithdrawal = () => {
    if (confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // 실제 애플리케이션에서는 여기에 API 호출하여 회원 탈퇴 처리
      alert('회원 탈퇴가 처리되었습니다.');

      // 로그인 페이지로 리다이렉트
      window.history.pushState(null, null, '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // 비밀번호 설정 페이지로 이동
  const navigateToPassword = () => {
    window.history.pushState(null, null, '/profile?type=password');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 프로필 설정 페이지로 이동
  const navigateToProfile = () => {
    window.history.pushState(null, null, '/profile?type=profile');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    if (pageType === 'profile') {
      const profileForm = element.querySelector('#profilepage-form');
      if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
      }

      const passwordNavButton = element.querySelector('.profilepage-password-nav');
      if (passwordNavButton) {
        passwordNavButton.addEventListener('click', navigateToPassword);
      }
    } else {
      const passwordForm = element.querySelector('#profilepage-password-form');
      if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordSubmit);
      }

      const profileNavButton = element.querySelector('.profilepage-profile-nav');
      if (profileNavButton) {
        profileNavButton.addEventListener('click', navigateToProfile);
      }
    }

    const withdrawalButton = element.querySelector('.profilepage-btn-withdrawal');
    if (withdrawalButton) {
      withdrawalButton.addEventListener('click', handleWithdrawal);
    }
  };

  // 렌더링 함수
  const render = () => {
    // 회원정보수정 페이지
    if (pageType === 'profile') {
      element.innerHTML = `
        <div class="profilepage-container">
          <div class="profilepage-header">
            <h1 class="profilepage-title">회원정보수정</h1>
          </div>
          
          <!-- 프로필 이미지 섹션 -->
          <div class="profilepage-image-section">
            <div class="profilepage-image-container">
              <div class="profilepage-avatar"></div>
              <p class="profilepage-label">프로필 사진*</p>
            </div>
          </div>
          
          <!-- 프로필 수정 폼 -->
          <form id="profilepage-form">
            <div class="profilepage-form-group">
              <label for="profile-userEmail">이메일</label>
              <input type="email" id="profile-userEmail" name="userEmail" value="startupcoder@gmail.com" disabled>
            </div>
            
            <div class="profilepage-form-group"> 
              <label for="profile-userName">닉네임</label>
              <input type="text" id="profile-userName" name="userName" placeholder="스타트업코드" required>
            </div>
            
            <button type="submit" class="profilepage-btn-update">수정하기</button>
          </form>
          
          <!-- 회원 탈퇴 버튼 -->
          <div class="profilepage-withdrawal-section">
            <button class="profilepage-btn-withdrawal">회원 탈퇴</button>
          </div>
        </div>
      `;
    }
    // 비밀번호수정 페이지
    else {
      element.innerHTML = `
        <div class="profilepage-container">
          <div class="profilepage-header">
            <h1 class="profilepage-title">비밀번호 수정</h1>
          </div>
          
          <!-- 비밀번호 수정 폼 -->
          <form id="profilepage-password-form">
            <div class="profilepage-form-group">
              <label for="profile-userPassword">비밀번호</label>
              <input type="password" id="profile-userPassword" name="userPassword" placeholder="새 비밀번호 입력" required>
              <span class="profilepage-password-hint">비밀번호는 8-20자이며, 대문자,소문자,숫자,특수문자를 각각 최소 1개 포함해야 합니다.</span>
            </div>
            
            <div class="profilepage-form-group">
              <label for="profile-userPasswordConfirm">비밀번호 확인</label>
              <input type="password" id="profile-userPasswordConfirm" name="userPasswordConfirm" placeholder="새 비밀번호 확인" required>
            </div>
            
            <button type="submit" class="profilepage-btn-update">수정하기</button>
          </form>
          
          <!-- 회원정보 수정 버튼 -->
          <div class="profilepage-nav-section">
            <button class="profilepage-profile-nav">회원정보 수정하기</button>
          </div>
        </div>
      `;
    }

    return element;
  };

  return {
    render: render,
    init: init
  };
};

export default ProfilePage;