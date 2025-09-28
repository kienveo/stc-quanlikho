import { api } from './api';
import { API_CONFIG } from '../config/api';

// Report Service
export const reportService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.DASHBOARD_STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get sales report
  getSalesReport: async (params = {}) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.REPORTS}/sales`, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get inventory report
  getInventoryReport: async (params = {}) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.REPORTS}/inventory`, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user activity report
  getUserActivityReport: async (params = {}) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.REPORTS}/user-activity`, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default reportService;
