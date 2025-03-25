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

// Header.js
export const handleMenuItemClick = (e, element) => {
  const action = e.currentTarget.getAttribute('data-action');
  switch (action) {
    case 'profile':
      navigate(e, '/profile?type=profile');
      break;
    case 'password':
      navigate(e, '/profile?type=password');
      break;
    case 'board':
      navigate(e, '/board');
      break;
    default:
      console.warn('지원하지 않는 메뉴 액션', action);
  }

  const menuDropdown = element.querySelector('.header-menu-dropdown');
  // 메뉴 닫기
  if (menuDropdown) {
    menuDropdown.classList.remove('show');
  }
};

// 뒤로가기 버튼 클릭 처리 함수
export const handleBackClick = (e) => {
  navigate('/board');
};

// 프로필 클릭 처리 함수 (드롭다운 메뉴 토글)
export const handleProfileClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const menuDropdown = element.querySelector('.header-menu-dropdown');
  if (menuDropdown) {
    menuDropdown.classList.toggle('show');
  }
};

// 로그아웃 처리 함수
export const handleLogout = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    // API 호출하여 로그아웃
    await api.logout();

    // 로그인 페이지로 리다이렉트
    navigate('/login');
  } catch (error) {
    console.error('로그아웃 오류:', error);
    alert('로그아웃 중 오류가 발생했습니다.');
  }

  // 메뉴 닫기
  const menuDropdown = element.querySelector('.header-menu-dropdown');
  if (menuDropdown) {
    menuDropdown.classList.remove('show');
  }
};