const PostPage = () => {
  // DOM 요소 생성
  const element = document.createElement('div');
  element.className = 'post-page';

  // 상태 및 데이터
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const isNewPost = !postId;

  // 샘플 게시글 데이터
  const samplePosts = [
    {
      id: 1,
      title: '첫 번째 게시글입니다.',
      author: '작성자1',
      date: '2025-03-01',
      views: 45,
      content: '이 게시글은 테스트를 위한 첫 번째 게시글입니다. 바닐라 자바스크립트로 SPA를 구현하는 예제 내용입니다.'
    },
    {
      id: 2,
      title: '안녕하세요, 반갑습니다!',
      author: '작성자2',
      date: '2025-03-02',
      views: 32,
      content: '안녕하세요! 두 번째 게시글입니다. 함수형 컴포넌트를 활용한 예제 게시글입니다.'
    },
    {
      id: 3,
      title: '바닐라 JS로 SPA 만들기',
      author: '작성자3',
      date: '2025-03-03',
      views: 128,
      content: '이 게시글에서는 바닐라 자바스크립트만으로 SPA를 구현하는 방법에 대해 이야기합니다. History API와 함수형 컴포넌트를 활용해 프레임워크 없이도 SPA를 구현할 수 있습니다.'
    },
    {
      id: 4,
      title: 'JavaScript 함수형 컴포넌트',
      author: '작성자4',
      date: '2025-03-04',
      views: 75,
      content: '자바스크립트에서 함수형 컴포넌트를 구현하는 방법에 대한 게시글입니다. 함수형 프로그래밍의 개념과 컴포넌트 기반 설계에 대해 설명합니다.'
    },
    {
      id: 5,
      title: 'History API의 활용',
      author: '작성자5',
      date: '2025-03-05',
      views: 64,
      content: 'History API를 활용한 네비게이션 구현에 대한 게시글입니다. 페이지 새로고침 없이 URL을 변경하고 브라우저의 뒤로가기/앞으로가기 버튼을 지원하는 방법을 설명합니다.'
    }
  ];

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = element.querySelector('#post-title').value;
    const content = element.querySelector('#post-content').value;

    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 게시글 등록 성공 메시지
    alert('게시글이 등록되었습니다.');

    // 게시판 페이지로 이동
    window.history.pushState(null, null, '/board');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // 이벤트 리스너 등록 함수
  const init = () => {
    if (isNewPost) {
      // 새 게시글 작성 폼 이벤트 처리
      const form = element.querySelector('#post-form');
      const cancelBtn = element.querySelector('.btn-cancel');

      form.addEventListener('submit', handleSubmit);
      cancelBtn.addEventListener('click', () => {
        window.history.pushState(null, null, '/board');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    } else {
      // 게시글 조회 화면 이벤트 처리
      const listBtn = element.querySelector('.btn-list');
      const editBtn = element.querySelector('.btn-edit');
      const deleteBtn = element.querySelector('.btn-delete');

      listBtn.addEventListener('click', () => {
        window.history.pushState(null, null, '/board');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      editBtn.addEventListener('click', () => {
        alert('게시글 수정 기능은 구현되지 않았습니다.');
      });

      deleteBtn.addEventListener('click', () => {
        if (confirm('정말 삭제하시겠습니까?')) {
          alert('게시글이 삭제되었습니다.');
          window.history.pushState(null, null, '/board');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      });
    }
  };

  // 렌더링 함수
  const render = () => {
    // 비로그인 상태라면 로그인 페이지로 리다이렉트
    if (!isLoggedIn) {
      setTimeout(() => {
        alert('로그인이 필요한 페이지입니다.');
        window.history.pushState(null, null, '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 0);
      return element;
    }

    if (isNewPost) {
      // 새 게시글 작성 화면
      element.innerHTML = `
        <div class="post-container">
          <h2>새 게시글 작성</h2>
          <form id="post-form">
            <div class="form-group">
              <label for="post-title">제목</label>
              <input type="text" id="post-title" name="title" required>
            </div>
            <div class="form-group">
              <label for="post-content">내용</label>
              <textarea id="post-content" name="content" rows="10" required></textarea>
            </div>
            <div class="post-actions">
              <button type="submit" class="btn-submit">등록</button>
              <button type="button" class="btn-cancel">취소</button>
            </div>
          </form>
        </div>
      `;
    } else {
      // 기존 게시글 조회 화면
      const post = samplePosts.find(p => p.id === parseInt(postId)) || {
        id: 0,
        title: '게시글을 찾을 수 없습니다.',
        author: '알 수 없음',
        date: '알 수 없음',
        views: 0,
        content: '요청하신 게시글을 찾을 수 없습니다.'
      };

      element.innerHTML = `
        <div class="post-container">
          <div class="post-header">
            <h2>${post.title}</h2>
            <div class="post-info">
              <span class="post-author">작성자: ${post.author}</span>
              <span class="post-date">작성일: ${post.date}</span>
              <span class="post-views">조회수: ${post.views}</span>
            </div>
          </div>
          <div class="post-content">
            ${post.content.split('\n').map(line => `<p>${line}</p>`).join('')}
          </div>
          <div class="post-actions">
            <button type="button" class="btn-list">목록</button>
            <button type="button" class="btn-edit">수정</button>
            <button type="button" class="btn-delete">삭제</button>
          </div>
        </div>
      `;
    }

    return element;
  };

  // 페이지 반환 (렌더링 및 초기화)
  const page = render();
  setTimeout(init, 0);

  return {
    render: () => page,
    init: () => { } // 이미 init 호출했으므로 빈 함수
  };
};

export default PostPage;