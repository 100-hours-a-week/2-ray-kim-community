import { attachEventListenersToPasswordChangePage } from "../utils/attachEventListeners.js";

const PasswordChangePage = () => {

  const element = document.createElement('div');
  element.className = 'profilepage-container-wrapper';

  const init = () => {
    attachEventListenersToPasswordChangePage(element);
  };
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
        </div>
      `;
    return element;
  }

  return {
    render: render,
    init: init
  };
}

export default PasswordChangePage;