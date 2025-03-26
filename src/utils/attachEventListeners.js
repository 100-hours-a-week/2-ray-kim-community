import { handleAddComment, handleBackClick, handleDeletePost, handleEditPostClick, handleLikePost, handleLogout, handleMenuItemClick, handlePasswordSubmit, handleProfileClick, handleProfileImageChange, handleProfileSubmit, handleWithdrawal } from "./eventHandlers.js";

export const attachEventListenersToPostPage = (element, postId) => {
  const editButton = element.querySelector('.postpage-btn-edit');
  if (editButton) {
    editButton.addEventListener('click', (e) => handleEditPostClick(e, element, postId));
  }

  const deleteButton = element.querySelector('.postpage-btn-delete');
  if (deleteButton) {
    deleteButton.addEventListener('click', () => handleDeletePost(postId));
  }

  const likeButton = element.querySelector('[data-type="like"]');
  if (likeButton) {
    likeButton.addEventListener('click', () => handleLikePost(postId, element));
  }

  const commentForm = element.querySelector('.postpage-comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => handleAddComment(e, element, postId));
  }
};


export const attachEventListenersToHeader = (element) => {
  const backButton = element.querySelector('.header-back-button');
  if (backButton) {
    backButton.addEventListener('click', handleBackClick);
  }

  const profileImage = element.querySelector('.user-profile');
  if (profileImage) {
    profileImage.addEventListener('click', (e) => handleProfileClick(element, e));
  }

  const profileMenuItem = element.querySelector('.menu-item[data-action="profile"]');
  if (profileMenuItem) {
    profileMenuItem.addEventListener('click', (e) => handleMenuItemClick(element, e));
  }

  const passwordMenuItem = element.querySelector('.menu-item[data-action="password"]');
  if (passwordMenuItem) {
    passwordMenuItem.addEventListener('click', (e) => handleMenuItemClick(element, e));
  }

  const boardMenuItem = element.querySelector('.menu-item[data-action="board"]');
  if (boardMenuItem) {
    boardMenuItem.addEventListener('click', (e) => handleMenuItemClick(element, e));
  }

  const logoutMenuItem = element.querySelector('.menu-item[data-action="logout"]');
  if (logoutMenuItem) {
    logoutMenuItem.addEventListener('click', handleLogout);
  }
}

export const attachEventListenersToProfileInfoPage = (element) => {
  // 프로필 이미지 클릭 이벤트
  const profileAvatar = element.querySelector('.profilepage-avatar');
  const imageInput = element.querySelector('#profile-userImage');
  if (profileAvatar && imageInput) {
    profileAvatar.addEventListener('click', () => {
      imageInput.click();
    });
    imageInput.addEventListener('change', handleProfileImageChange);
  }

  // 프로필 폼 제출 이벤트
  const profileForm = element.querySelector('#profilepage-form');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileSubmit);
  }

  // 회원 탈퇴 버튼 이벤트
  const withdrawalButton = element.querySelector('.profilepage-btn-withdrawal');
  if (withdrawalButton) {
    withdrawalButton.addEventListener('click', handleWithdrawal);
  }
};

export const attachEventListenersToPasswordChangePage = (element) => {
  // 비밀번호 폼 제출 이벤트
  const passwordForm = element.querySelector('#profilepage-password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordSubmit);
  }
};