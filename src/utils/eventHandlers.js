// PostPage

import api from "../services/api.js";
import { navigate } from "./navigate.js";

// 게시글 삭제 처리
export const handleDeletePost = async (postId) => {
  if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    return;
  }

  try {
    await api.deletePost(postId);
    alert('게시글이 삭제되었습니다.');
    navigate('/board');
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    alert('게시글 삭제 중 오류가 발생했습니다.');
  }
};

// 좋아요 처리
export const handleLikePost = async (postId, element) => {
  try {
    await api.likePost(postId);

    const likeCountElement = element.querySelector('[data-type="like"] .postpage-button-count');
    if (likeCountElement) {
      likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
    }
  } catch (error) {
    console.error('좋아요 오류:', error);
    alert('좋아요 처리 중 오류가 발생했습니다.');
  }
};

// 댓글 추가
export const handleAddComment = async (e, element, postId) => {
  e.preventDefault();

  const commentInput = element.querySelector('.postpage-comment-input');
  const commentText = commentInput.value.trim();

  if (!commentText) {
    alert('댓글 내용을 입력해주세요.');
    return;
  }

  try {
    await api.createComment(postId, commentText);

    commentInput.value = '';

    // 댓글 작성 후 페이지 새로고침
    await fetchPostAndRender();
  } catch (error) {
    console.error('댓글 등록 오류:', error);
    alert('댓글 등록 중 오류가 발생했습니다.');
  }
};

// 게시글 편집 페이지 이동
export const handleEditPostClick = (postId) => {
  navigate(`/post-edit?id=${postId}`)
};
//