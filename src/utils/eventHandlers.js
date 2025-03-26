//
// PostPage
//
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
    navigate(`/post?id=${postId}`);
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
//Header.js
//
export const handleMenuItemClick = (element, e) => {
  const action = e.currentTarget.getAttribute('data-action');
  switch (action) {
    case 'profile':
      navigate('/profile', e);
      break;
    case 'password':
      navigate('/password', e);
      break;
    case 'board':
      navigate('/board', e);
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
export const handleProfileClick = (element, e) => {
  e.preventDefault();
  e.stopPropagation();
  const menuDropdown = element.querySelector('.header-menu-dropdown');
  if (menuDropdown) {
    menuDropdown.classList.toggle('show');
  }
};

// 로그아웃 처리 함수
export const handleLogout = async (e) => {
  // e.preventDefault();
  // e.stopPropagation();

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

//
// ProfileInfoPage
//

// 프로필 이미지 변경 처리
export const handleProfileImageChange = async (e) => {
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

// 프로필 폼 제출 처리
export const handleProfileSubmit = async (e) => {
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
    navigate('/board');
  } catch (error) {
    console.error('프로필 업데이트 오류:', error);
    alert('프로필 업데이트 중 오류가 발생했습니다.');
  }
};

// 회원 탈퇴 처리
export const handleWithdrawal = async () => {
  if (confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
    try {
      // API 호출하여 회원 탈퇴
      await api.deleteAccount();

      alert('회원 탈퇴가 처리되었습니다.');

      // 로그인 페이지로 리다이렉트
      navigate('/login');
    } catch (error) {
      console.error('회원 탈퇴 오류:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  }
};

//
// PasswordchangePage
//

export const handlePasswordSubmit = async (e) => {
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
    navigate('/board');
  } catch (error) {
    console.error('비밀번호 업데이트 오류:', error);
    alert('비밀번호 업데이트 중 오류가 발생했습니다.');
  }
};