import { api } from './api';
import { API_CONFIG } from '../config/api';

// User Management Service
export const userService = {
  // Get all users
  getUsers: async (params = {}) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.USERS, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.USER_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.USERS, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(API_CONFIG.ENDPOINTS.USER_BY_ID(id), userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(API_CONFIG.ENDPOINTS.USER_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
