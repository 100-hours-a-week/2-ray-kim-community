import api from "../services/api.js";
import { attachEventListenersToProfileInfoPage } from "../utils/attachEventListeners.js";

const ProfileInfoPage = () => {

  const element = document.createElement('div');
  element.className = 'profilepage-container-wrapper';
  // 사용자 데이터
  let userData = null;

  // 사용자 프로필 데이터 가져오기
  const fetchUserProfile = async () => {
    try {
      const response = await api.getProfile();
      userData = response.data;
      console.log(userData);

      const emailField = element.querySelector('#profile-userEmail');
      const nameField = element.querySelector('#profile-userName');
      const avatarImg = element.querySelector('.profilepage-avatar');

      if (emailField && nameField && userData) {
        emailField.value = userData.email || '';
        nameField.value = userData.nickname || '';

        if (avatarImg && userData.profile_image) {
          avatarImg.src = userData.profile_image;
        }
      }
    } catch (error) {
      console.error('사용자 프로필 조회 오류:', error);
    }
  };

  const init = async () => {
    // 사용자 데이터 가져오기
    await fetchUserProfile();

    // 이벤트 리스너 등록
    attachEventListenersToProfileInfoPage(element);
  };

  const render = () => {
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
            
            <!-- 회원 탈퇴 버튼 -->
            <div class="profilepage-withdrawal-section">
              <button class="profilepage-btn-withdrawal">회원 탈퇴</button>
            </div>
          </div>
        `;
    return element;

  }

  return {
    render: render,
    init: init
  };
}

export default ProfileInfoPage;