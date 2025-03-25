import PostContent from "../components/PostContent.js";
import { api } from "../services/api.js";
import { attachEventListenersToPostPage } from "../utils/attachEventListeners.js";

const PostPage = () => {
  const element = document.createElement('div');
  element.className = 'post-page';

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  // 게시글 데이터 가져오기 및 렌더링
  const renderFetchData = async () => {
    const resPostDetails = await api.getPost(postId);
    const resComments = await api.getComments(postId);

    PostContent(resPostDetails.data, resComments.data);
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    renderFetchData();
    attachEventListenersToPostPage(element, postId);
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