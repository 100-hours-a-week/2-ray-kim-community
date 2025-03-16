import Post from "../components/Post.js"
import { postItems } from "../constants/response.js";

const BoardPage = () => {
  const element = document.createElement('div');
  element.className = 'board-page';

  // 게시글 목록 렌더링 함수
  const renderPosts = async (container) => {
    // const posts = await fetchPosts();

    // if (posts.length === 0) {
    //   container.innerHTML = '<p class="no-posts">게시글이 없습니다.</p>';
    //   return;
    // }
    // container.innerHTML = '';

    // 각 게시글마다 Post 컴포넌트 생성 및 추가
    postItems.forEach(postData => {
      const postComponent = Post(postData);
      container.appendChild(postComponent.render());
    });
  };

  // 게시글 작성 버튼 클릭 처리
  const handleCreatePost = () => {
    window.history.pushState(null, null, '/post');
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
  }

  // 렌더링 함수
  const render = () => {
    element.innerHTML = `
      <div class="board-container">
        <div class="board-title-wrapper">
          <p class="board-container-title">안녕하세요,<br></p>
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