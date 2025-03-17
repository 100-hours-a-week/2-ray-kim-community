import Post from "../components/Post.js";
import { api } from "../services/api.js";

const BoardPage = () => {
  const element = document.createElement('div');
  element.className = 'board-page';

  // 게시글 목록 렌더링 함수
  const renderPosts = async (container) => {
    try {
      // API에서 게시글 데이터 가져오기
      const response = await api.getPosts();

      container.innerHTML = '';

      // 각 게시글마다 Post 컴포넌트 생성 및 추가
      const posts = response.data.posts;
      posts.forEach(postData => {
        const postComponent = Post(postData);
        container.appendChild(postComponent.render());
      });
    } catch (error) {
      console.error('게시글 불러오기 오류:', error);
      container.innerHTML = '<p>게시글을 불러오는 중 오류가 발생했습니다.</p>';
    }
  };

  // 게시글 작성 버튼 클릭 처리
  const handleCreatePost = () => {
    window.history.pushState(null, null, '/post-create');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
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
    // 현재 로그인한 사용자 정보 가져오기
    const currentUser = api.getCurrentUser();
    const greeting = currentUser ? `안녕하세요, ${currentUser.nickname}님` : '안녕하세요';

    element.innerHTML = `
      <div class="board-container">
        <div class="board-title-wrapper">
          <p class="board-container-title">${greeting}<br></p>
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