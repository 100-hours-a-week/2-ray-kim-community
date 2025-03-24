import Post from "../components/Post.js";
import { api } from "../services/api.js";

const BoardPage = () => {
  const element = document.createElement('div');
  element.className = 'board-page';

  // 사용자 데이터 저장 변수
  let userData = null;

  // 게시글 목록 렌더링 함수
  const renderPosts = async (container) => {
    try {
      const response = await api.getPosts();

      container.innerHTML = '';

      // 데이터 구조 확인
      const posts = response.data.posts;

      if (!posts || !Array.isArray(posts)) {
        console.error('게시글 데이터가 배열이 아닙니다:', posts);
        container.innerHTML = '<p>게시글 데이터 형식이 올바르지 않습니다.</p>';
        return;
      }

      posts.forEach(postData => {
        const postComponent = Post(postData);
        container.appendChild(postComponent.render());
      });
    } catch (error) {
      console.error('게시글 불러오기 오류:', error);
      container.innerHTML = '<p>게시글을 불러오는 중 오류가 발생했습니다.</p>';
    }
  };

  // 사용자 프로필 가져오기
  const fetchUserProfile = async () => {
    try {
      const response = await api.getProfile();
      userData = response.data;

      // 닉네임 업데이트
      const titleElement = element.querySelector('.user-nickname');
      if (titleElement && userData && userData.nickname) {
        titleElement.textContent = userData.nickname;
      }
    } catch (error) {
      console.error('사용자 프로필 조회 오류:', error);
    }
  };

  // 게시글 작성 버튼 클릭 처리
  const handleCreatePost = () => {
    window.history.pushState(null, null, '/post-create');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };


  // 이벤트 리스너 등록 함수
  const init = async () => {
    // 먼저 사용자 정보 가져오\
    await fetchUserProfile();

    const postsContainer = element.querySelector('#posts-container');
    if (postsContainer) {
      renderPosts(postsContainer);
    }

    const createButton = element.querySelector('.btn-create-post');
    if (createButton) {
      createButton.addEventListener('click', handleCreatePost);
    }
  };

  const render = () => {
    element.innerHTML = `
      <div class="board-container">
        <div class="board-title-wrapper">
          <p class="board-container-title">안녕하세요, <span class="user-nickname">사용자</span>님<br></p>
          <p class="board-container-title">아무 말 대잔치 <span class="bold">게시판</span> 입니다.</p>
        </div>
        <button class="btn-create-post">게시글 작성</button>
        <div id="posts-container"></div>  
      </div>
    `;
    return element;
  };

  return {
    render: render,
    init: init
  };
};

export default BoardPage;