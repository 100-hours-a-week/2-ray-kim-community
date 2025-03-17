const API_BASE_URL = '개발 전';

const MOCK_DELAY = 300;

// 인증 토큰 관리
const getToken = () => {
  return localStorage.getItem('token');
};

const setToken = (token) => {
  localStorage.setItem('token', token);
};

const removeToken = () => {
  localStorage.removeItem('token');
};

// JSON 파일 로드 함수
async function loadMockData(filename) {
  try {
    const response = await fetch(`/mock/${filename}.json`);
    if (!response.ok) {
      throw new Error(`모의 데이터 파일을 불러올 수 없습니다: ${filename}`);
    }
    return response.json();
  } catch (error) {
    console.error(`모의 데이터 로드 오류(${filename}):`, error);
    throw error;
  }
}

// 모의 데이터와 실제 API 호출을 처리하는 함수
async function apiRequest(endpoint, options = {}) {
  // 개발 환경에서는 모의 데이터 사용
  if (true) { // 개발 환경 체크 로직 (지금은 항상 모의 데이터 사용)
    // 지연 시간 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    // 엔드포인트별 모의 응답 처리
    if (endpoint === '/api/posts') {
      return loadMockData('posts');
    }
    else if (endpoint.match(/^\/api\/posts\/\d+$/)) {
      const postId = parseInt(endpoint.split('/').pop());
      try {
        return await loadMockData(`post-${postId}`);
      } catch (error) {
        return { message: "post_not_found", data: null };
      }
    }
    else if (endpoint === '/api/users/profile') {
      return loadMockData('userProfile');
    }
    else if (endpoint === '/api/users/login') {
      // 로그인 처리
      const body = JSON.parse(options.body || '{}');
      if (body.email && body.password) {
        const authData = await loadMockData('auth');
        const response = authData.login;
        // 인증 토큰 저장
        setToken(response.data.token);
        return response;
      }
      return { message: "invalid_credentials", data: null };
    }
    else if (endpoint === '/api/users/signup') {
      // 회원가입 처리
      const authData = await loadMockData('auth');
      return authData.signup;
    }

    // 기본 응답 (엔드포인트를 찾지 못한 경우)
    return { message: "not_found", data: null };
  }

  // 실제 API 호출 (프로덕션 환경)
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // 인증이 필요한 요청에 토큰 추가
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error('API 요청이 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
}

// 현재 사용자 정보 저장
let currentUser = null;

// API 함수들 내보내기
export const api = {
  // 인증 관련 API
  login: async (email, password) => {
    const data = await apiRequest('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (data.message === 'login_success') {
      currentUser = {
        id: data.data.user_id,
        nickname: data.data.nickname
      };
    }

    return data;
  },

  signup: async (userData) => {
    return apiRequest('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  logout: () => {
    removeToken();
    currentUser = null;
    return Promise.resolve({ message: "logout_success", data: null });
  },

  // 사용자 관련 API
  getProfile: () => {
    return apiRequest('/api/users/profile');
  },

  updateProfile: (profileData) => {
    return apiRequest('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  updateProfileImage: (imageFile) => {
    // 실제로는 FormData를 사용하지만 모의 데이터에서는 간단하게 처리
    return apiRequest('/api/users/profile/image', {
      method: 'PUT',
      body: JSON.stringify({ profile_image: 'src/avatar.svg' })
    });
  },

  updatePassword: (currentPassword, newPassword) => {
    return apiRequest('/api/users/password', {
      method: 'PUT',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
    });
  },

  deleteAccount: () => {
    return apiRequest('/api/users', {
      method: 'DELETE'
    });
  },

  // 게시글 관련 API
  getPosts: (page = 1, limit = 10) => {
    return apiRequest(`/api/posts?page=${page}&limit=${limit}`);
  },

  getPost: (id) => {
    return apiRequest(`/api/posts/${id}`);
  },

  createPost: (postData) => {
    return apiRequest('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  },

  updatePost: (id, postData) => {
    return apiRequest(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData)
    });
  },

  deletePost: (id) => {
    return apiRequest(`/api/posts/${id}`, {
      method: 'DELETE'
    });
  },

  likePost: (id) => {
    return apiRequest(`/api/posts/${id}/like`, {
      method: 'POST'
    });
  },

  unlikePost: (id) => {
    return apiRequest(`/api/posts/${id}/like`, {
      method: 'DELETE'
    });
  },

  // 댓글 관련 API
  createComment: (postId, content) => {
    return apiRequest(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  },

  updateComment: (id, content) => {
    return apiRequest(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content })
    });
  },

  deleteComment: (id) => {
    return apiRequest(`/api/comments/${id}`, {
      method: 'DELETE'
    });
  },

  // 유틸리티 함수
  isAuthenticated: () => {
    return !!getToken();
  },

  getCurrentUser: () => {
    return currentUser;
  }
};

export default api;