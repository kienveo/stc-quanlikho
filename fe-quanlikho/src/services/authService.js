import { api } from './api';
import { API_CONFIG } from '../config/api';

// Authentication Service
export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.LOGIN, credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.LOGOUT);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.PROFILE);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.REFRESH_TOKEN);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
