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
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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
