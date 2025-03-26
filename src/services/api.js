import { API_BASE_URL, MOCK_DELAY } from "../constants/api.js";
import { getToken, setToken } from "../utils/token.js";

// JSON 파일 로드 함수
// async function loadMockData(filename) {
//   try {
//     const response = await fetch(`/public/mock/${filename}.json`);
//     if (!response.ok) {
//       throw new Error(`모의 데이터 파일을 불러올 수 없습니다: ${filename}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.error(`모의 데이터 로드 오류(${filename}):`, error);
//     throw error;
//   }
// }

// 모의 데이터와 실제 API 호출을 처리하는 함수
async function apiRequest(endpoint, options = {}) {
  // 개발 환경에서는 모의 데이터 사용
  if (false) {
    // await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    // if (endpoint.startsWith('/api/posts') && !endpoint.match(/^\/api\/posts\/\d+/)) {
    //   return loadMockData('posts');
    // }
    // else if (endpoint.match(/^\/api\/posts\/\d+/)) {
    //   // 특정 ID를 가진 게시글 처리
    //   const postId = parseInt(endpoint.split('/').pop().split('?')[0]);
    //   try {
    //     return await loadMockData(`post-${postId}`);
    //   } catch (error) {
    //     return { message: "post_not_found", data: null };
    //   }
    // }
    // else if (endpoint === '/api/users/profile') {
    //   return loadMockData('userProfile');
    // }
    // else if (endpoint === '/api/auth/login') {
    //   // 로그인 처리
    //   const body = JSON.parse(options.body || '{}');
    //   if (body.email && body.password) {
    //     const authData = await loadMockData('auth');
    //     const response = authData.login;
    //     // 인증 토큰 저장
    //     setToken(response.data.token);
    //     return response;
    //   }
    //   return { message: "invalid_credentials", data: null };
    // }
    // else if (endpoint === '/api/auth/signup') {
    //   // 회원가입 처리
    //   const authData = await loadMockData('auth');
    //   return authData.signup;
    // }

    // // 기본 응답 (엔드포인트를 찾지 못한 경우)
    // return { message: "not_found", data: null };
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
    console.error(`API 요청 오류 (${endpoint}):`, error);
    throw error;
  }
}

export const api = {
  // 인증 관련 API
  login: async (email, password) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    return data;
  },

  signup: async (userData) => {
    return apiRequest('/api/auth', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  logout: () => {
    removeToken();
    return Promise.resolve({ message: "logout_success", data: null });
  },

  // 사용자 관련 API
  getProfile: () => {
    return apiRequest('/api/users');
  },

  updateProfile: (profileData) => {
    return apiRequest('/api/users', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  updateProfileImage: (imageFile) => {
    return apiRequest('/api/users/profile/image', {
      method: 'PUT',
      body: JSON.stringify({ profile_image: imageFile })
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

  getPopularPosts: (page = 1, limit = 10) => {
    return apiRequest(`/api/posts/popular?page=${page}&limit=${limit}`)
  },

  createPost: (postData) => {
    return apiRequest('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  },

  uploadPostImage: (formData) => {
    return fetch(`${API_BASE_URL}/api/files/post`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }
      return response.json();
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

  createComment: (id) => {
    return apiRequest(`/api/comments/${id}`, {
      method: 'POST'
    });
  },

  getComments: (id) => {
    return apiRequest(`/api/comments/${id}`);
  },

  deleteComment: (id) => {
    return apiRequest(`/api/comments/${id}`, {
      method: DELETE
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
    return apiRequest(`/api/comments/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ "content": content })
    });
  },

  // updateComment: (id, content) => {
  //   return apiRequest(`/api/comments/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ content })
  //   });
  // },

  deleteComment: (id) => {
    return apiRequest(`/api/comments/${id}`, {
      method: 'DELETE'
    });
  },

  // 유틸리티 함수
  isAuthenticated: () => {
    return !!getToken();
  },
};

export default api;