import PostContent from "../components/PostContent.js";
import { api } from "../services/api.js";
import { attachEventListenersToPostPage } from "../utils/attachEventListeners.js";

const PostPage = () => {
  const element = document.createElement('div');
  element.className = 'post-page';

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // 게시글 데이터 가져오기 및 렌더링
  const fetchPostAndRender = async () => {
    try {
      const resPostDetails = await api.getPost(postId);

      // PostContent 컴포넌트가 반환한 HTML 문자열을 삽입
      element.innerHTML = PostContent(resPostDetails.data);

      // 이벤트 리스너 재등록
      attachEventListenersToPostPage(element, postId);
    } catch (error) {
      console.error('게시글 불러오기 오류:', error);
      element.innerHTML = `
        <div class="postpage-container">
          <p>게시글을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      `;
    }
  };

  // 이벤트 리스너 등록 함수
  const init = async () => {
    // 게시글 데이터 가져오기 및 렌더링
    await fetchPostAndRender();
  };

  const render = () => {
    element.innerHTML = `
      <div class="postpage-container">
        <p>게시글을 불러오는 중입니다...</p>
      </div>
    `;
    return element;
  };

  return {
    render: render,
    init: init
  };
};

export default PostPage;