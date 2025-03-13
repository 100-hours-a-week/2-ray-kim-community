const fetchPosts = async () => {
  // 임의의 API 주소 (JSONPlaceholder API 사용)
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // API 데이터를 우리 형식에 맞게 변환
    return data.slice(0, 10).map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
      author: `작성자${post.id}`,
      date: `2025-03-${String(post.id % 30).padStart(2, '0')}`,
      views: Math.floor(Math.random() * 100) + 10,
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20)
    }));
  } catch (error) {
    console.error('게시글을 불러오는 중 오류 발생:', error);
    return []; // 에러 시 빈 배열 반환 (간소화 버전이므로 단순하게 처리)
  }
};