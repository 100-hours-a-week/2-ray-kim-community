import { handleAddComment, handleBackClick, handleDeletePost, handleEditPostClick, handleLikePost, handleLogout, handleMenuItemClick, handleProfileClick } from "./eventHandlers.js";

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
    profileImage.addEventListener('click', (e) => handleProfileClick(e, element));
  }

  const profileMenuItem = element.querySelector('.menu-item[data-action="profile"]');
  if (profileMenuItem) {
    profileMenuItem.addEventListener('click', (e) => handleMenuItemClick(e, element));
  }

  const passwordMenuItem = element.querySelector('.menu-item[data-action="password"]');
  if (passwordMenuItem) {
    passwordMenuItem.addEventListener('click', (e) => handleMenuItemClick(e, element));
  }

  const boardMenuItem = element.querySelector('.menu-item[data-action="board"]');
  if (boardMenuItem) {
    boardMenuItem.addEventListener('click', (e) => handleMenuItemClick(e, element));
  }

  const logoutMenuItem = element.querySelector('.menu-item[data-action="logout"]');
  if (logoutMenuItem) {
    logoutMenuItem.addEventListener('click', (e) => handleLogout(e, element));
  }
}