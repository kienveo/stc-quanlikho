import axios from 'axios';
import { API_CONFIG, HTTP_STATUS, API_MESSAGES } from '../config/api';
import { getToken, clearToken, clearUser } from '../utils/auth';
import { message } from 'antd';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  async (config) => {
    // Bỏ qua interceptor cho các API public không cần token
    if (
      config.url.includes("/un_auth/") ||
      config.url.includes("/signup") ||
      config.url.includes("/signin") ||
      config.url.includes("/refresh") ||
      config.url.includes("/change-password")
    ) {
      return config;
    }
    
    const token = getToken();
    const expiredAt = localStorage.getItem("tokenExpiredAt");
    const refreshToken = localStorage.getItem("refreshToken");
    
    // Nếu có token và còn hạn thì thêm vào header
    if (token && expiredAt && Date.now() < Number(expiredAt)) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    
    // Nếu token hết hạn, thử refresh
    if (refreshToken) {
      try {
        const res = await axios.post(
          `${API_CONFIG.BASE_URL}/api/v1/un_auth/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data && res.data.status === 200 && res.data.data) {
          const {
            accessToken,
            refreshToken: newRefreshToken,
            expiresIn,
          } = res.data.data;
          localStorage.setItem("authToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          if (expiresIn) {
            const newExpiredAt = Date.now() + expiresIn * 1000;
            localStorage.setItem("tokenExpiredAt", newExpiredAt);
          }
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        } else {
          // Refresh thất bại
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("tokenExpiredAt");
          window.location.reload();
          return Promise.reject(new Error("Refresh token failed"));
        }
      } catch (err) {
        // Refresh thất bại
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpiredAt");
        window.location.reload();
        return Promise.reject(err);
      }
    }
    
    // Không có refreshToken hoặc không hợp lệ
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiredAt");
    window.location.reload();
    return Promise.reject(new Error("No valid token"));
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common responses
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      switch (response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          message.error(API_MESSAGES.UNAUTHORIZED);
          clearToken();
          clearUser();
          window.location.href = '/login';
          break;
        case HTTP_STATUS.FORBIDDEN:
          message.error(API_MESSAGES.FORBIDDEN);
          break;
        case HTTP_STATUS.NOT_FOUND:
          message.error(API_MESSAGES.NOT_FOUND);
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          message.error(API_MESSAGES.ERROR);
          break;
        default:
          if (response.data?.message) {
            message.error(response.data.message);
          } else {
            message.error(API_MESSAGES.ERROR);
          }
      }
    } else if (error.code === 'ECONNABORTED') {
      message.error(API_MESSAGES.TIMEOUT);
    } else {
      message.error(API_MESSAGES.NETWORK_ERROR);
    }
    
    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient;
