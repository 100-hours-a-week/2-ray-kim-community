const ProfilePage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'profile-page';

  // 상태 및 데이터
  // const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userId = rage.getItem('userId') || '사용자';

  // 사용자 이니셜 가져오기
  const getUserInitial = () => {
    return userId.charAt(0).toUpperCase();
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    const saveBtn = element.querySelector('#profile-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        alert('프로필이 저장되었습니다.');
      });
    }
  };

  // 렌더링 함수
  const render = () => {
    // // 비로그인 상태라면 로그인 페이지로 리다이렉트
    // if (!isLoggedIn) {
    //   setTimeout(() => {
    //     alert('로그인이 필요한 페이지입니다.');
    //     window.history.pushState(null, null, '/login');
    //     window.dispatchEvent(new PopStateEvent('popstate'));
    //   }, 0);
    //   return element;
    // }

    element.innerHTML = `
      <div class="profile-container">
        <h2>프로필</h2>
        <div class="profile-info">
          <div class="profile-avatar">
            <!-- 프로필 이미지 대신 이니셜 표시 -->
            <div class="avatar-circle">
              <span class="avatar-initial">${getUserInitial()}</span>
            </div>
          </div>
          <div class="profile-details">
            <form id="profile-form">
              <div class="form-group">
                <label for="profile-id">아이디</label>
                <input type="text" id="profile-id" value="${userId}" readonly>
              </div>
              <div class="form-group">
                <label for="profile-name">이름</label>
                <input type="text" id="profile-name" value="사용자 이름">
              </div>
              <div class="form-group">
                <label for="profile-email">이메일</label>
                <input type="email" id="profile-email" value="user@example.com">
              </div>
              <div class="form-group">
                <label for="profile-bio">자기소개</label>
                <textarea id="profile-bio" rows="4">안녕하세요! 바닐라 JS로 SPA를 만들고 있습니다.</textarea>
              </div>
              <button type="button" id="profile-save" class="btn-save">저장</button>
            </form>
          </div>
        </div>
        <div class="profile-activity">
          <h3>최근 활동</h3>
          <ul class="activity-list">
            <li class="activity-item">
              <span class="activity-date">2025-03-05</span>
              <span class="activity-text">'History API의 활용' 게시글에 댓글을 남겼습니다.</span>
            </li>
            <li class="activity-item">
              <span class="activity-date">2025-03-03</span>
              <span class="activity-text">'바닐라 JS로 SPA 만들기' 게시글을 작성했습니다.</span>
            </li>
            <li class="activity-item">
              <span class="activity-date">2025-03-01</span>
              <span class="activity-text">회원가입을 했습니다.</span>
            </li>
          </ul>
        </div>
      </div>
    `;

    return element;
  };

  // 페이지 반환 (렌더링 및 초기화)
  const page = render();
  setTimeout(init, 0);

  return {
    render: () => page,
    init: () => { } // 이미 init 호출했으므로 빈 함수
  };
};

export default ProfilePage;