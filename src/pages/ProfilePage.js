import { api } from "../services/api.js";

const ProfilePage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'profilepage-container-wrapper';

  // URL에서 페이지 타입 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const pageType = urlParams.get('type') || 'profile'; // 'profile' 또는 'password'

  // 사용자 데이터
  let userData = null;

  // 프로필 이미지 변경 처리 함수
  const handleProfileImageChange = async (e) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const profileAvatar = document.querySelector('.profilepage-avatar');
        if (profileAvatar) {
          // img 태그의 src 속성을 변경
          profileAvatar.src = e.target.result;

          try {
            // API 호출하여 프로필 이미지 업데이트
            await api.updateProfileImage(file);
          } catch (error) {
            console.error('프로필 이미지 업데이트 오류:', error);
            alert('프로필 이미지 업데이트 중 오류가 발생했습니다.');
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // 프로필 폼 제출 처리 함수
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    // 폼 데이터 수집
    const nameInput = document.getElementById('profile-userName');

    try {
      // API 호출하여 프로필 업데이트
      const profileData = {
        nickname: nameInput.value
      };

      await api.updateProfile(profileData);

      // 성공 메시지 표시
      alert('프로필이 성공적으로 업데이트되었습니다.');

      // 게시판 페이지로 리다이렉트
      window.history.pushState(null, null, '/board');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 비밀번호 폼 제출 처리 함수
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // 폼 데이터 수집
    const passwordInput = document.getElementById('profile-userPassword');
    const passwordConfirmInput = document.getElementById('profile-userPasswordConfirm');

    // 비밀번호 확인 검증
    if (passwordInput.value !== passwordConfirmInput.value) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      // API 호출하여 비밀번호 업데이트
      await api.updatePassword(null, passwordInput.value);

      // 성공 메시지 표시
      alert('비밀번호가 성공적으로 변경되었습니다.');

      // 게시판 페이지로 리다이렉트
      window.history.pushState(null, null, '/board');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('비밀번호 업데이트 오류:', error);
      alert('비밀번호 업데이트 중 오류가 발생했습니다.');
    }
  };

  // 회원 탈퇴 처리 함수
  const handleWithdrawal = async () => {
    if (confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        // API 호출하여 회원 탈퇴
        await api.deleteAccount();

        alert('회원 탈퇴가 처리되었습니다.');

        // 로그인 페이지로 리다이렉트
        window.history.pushState(null, null, '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (error) {
        console.error('회원 탈퇴 오류:', error);
        alert('회원 탈퇴 중 오류가 발생했습니다.');
      }
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

  // 사용자 프로필 데이터 가져오기
  const fetchUserProfile = async () => {
    try {
      const response = await api.getProfile();
      userData = response.data;

      // 프로필 페이지에서 사용자 데이터 적용
      if (pageType === 'profile') {
        const emailField = document.getElementById('profile-userEmail');
        const nameField = document.getElementById('profile-userName');
        const avatarImg = document.querySelector('.profilepage-avatar');

        if (emailField && nameField && userData) {
          emailField.value = userData.email || '';
          nameField.value = userData.nickname || '';

          if (avatarImg && userData.profile_image) {
            avatarImg.src = userData.profile_image;
          }
        }
      }
    } catch (error) {
      console.error('사용자 프로필 조회 오류:', error);
    }
  };

  // 이벤트 리스너 등록 함수
  const init = async () => {
    // 사용자 데이터 가져오기
    await fetchUserProfile();

    if (pageType === 'profile') {
      const profileForm = element.querySelector('#profilepage-form');
      if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
      }

      // 프로필 이미지 클릭 이벤트
      const profileAvatar = element.querySelector('.profilepage-avatar');
      const imageInput = element.querySelector('#profile-userImage');
      if (profileAvatar && imageInput) {
        profileAvatar.addEventListener('click', () => {
          imageInput.click();
        });
        imageInput.addEventListener('change', handleProfileImageChange);
      }

      // 비밀번호 버튼 이벤트
      const passwordBtn = element.querySelector('.profilepage-password-btn');
      if (passwordBtn) {
        passwordBtn.addEventListener('click', navigateToPassword);
      }
    } else {
      const passwordForm = element.querySelector('#profilepage-password-form');
      if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordSubmit);
      }

      // 프로필 버튼 이벤트
      const profileBtn = element.querySelector('.profilepage-profile-btn');
      if (profileBtn) {
        profileBtn.addEventListener('click', navigateToProfile);
      }
    }

    const withdrawalButton = element.querySelector('.profilepage-btn-withdrawal');
    if (withdrawalButton) {
      withdrawalButton.addEventListener('click', handleWithdrawal);
    }
  };


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
              <img class="profilepage-avatar" alt="프로필이미지변경" src="public/images/avatar.svg"></img>
              <input type="file" id="profile-userImage" name="userImage" accept="image/*" style="display: none;">
            </div>
          </div>
          
          <!-- 프로필 수정 폼 -->
          <form id="profilepage-form">
            <div class="profilepage-form-group">
              <label for="profile-userEmail">이메일</label>
              <input type="email" id="profile-userEmail" name="userEmail" disabled>
            </div>
            
            <div class="profilepage-form-group"> 
              <label for="profile-userName">닉네임</label>
              <input type="text" id="profile-userName" name="userName" placeholder="닉네임을 입력하세요" required>
            </div>
            
            <button type="submit" class="profilepage-btn-update">수정하기</button>
          </form>
          
          <!-- 비밀번호 수정 버튼 -->
          <div class="profilepage-nav-section">
            <button class="profilepage-password-btn">비밀번호 변경</button>
          </div>
          
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
          
          <!-- 프로필 수정 버튼 -->
          <div class="profilepage-nav-section">
            <button class="profilepage-profile-btn">프로필 정보 변경</button>
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