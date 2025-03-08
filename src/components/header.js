const Header = () => {
  // DOM 요소 생성
  const element = document.createElement('header');
  element.className = 'header-component';

  // 렌더링 함수
  const render = () => {
    // innerHTML 방식으로 구현
    element.innerHTML = `
      <div class="header-container">
        <h1 class="header-title">
          아무 말 대잔치
        </h1>
      </div>
    `;

    return element;
  };

  return {
    render: render
  };
};
export default Header;