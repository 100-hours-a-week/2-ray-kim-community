const PasswordChangePage = () => {

  const element = document.createElement('div');
  element.className = 'profilepage-container-wrapper';
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

  const init = () => {
    const passwordForm = element.querySelector('#profilepage-password-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', handlePasswordSubmit);
    }

    // 프로필 버튼 이벤트
    const profileBtn = element.querySelector('.profilepage-profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => navigate('/profile'));
    }
  }

  const render = () => {

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

  return {
    render: render,
    init: init
  };
}

export default PasswordChangePage;