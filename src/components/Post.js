export default function Post() {

  const element = document.createElement('post');
  element.className = 'post-component';

  // 렌더링 함수
  const render = () => {
    // innerHTML 방식으로 구현
    element.innerHTML = `
        <div class="post-container">
          <div class="upper-side>
            <h1>아무 말 대잔치</h1>
          </div>
          <div class="bottom-side">

          </div>
        </div>
      `;

    return element;
  };

  return {
    render: render
  };
};