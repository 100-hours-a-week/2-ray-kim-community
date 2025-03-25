import { handleAddComment, handleDeletePost, handleEditPostClick, handleLikePost } from "./eventHandlers";

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