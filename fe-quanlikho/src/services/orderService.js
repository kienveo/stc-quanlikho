import { api } from './api';
import { API_CONFIG } from '../config/api';

// Order Management Service
export const orderService = {
  // Get all orders
  getOrders: async (params = {}) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.ORDERS, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.ORDER_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.ORDERS, orderData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update order
  updateOrder: async (id, orderData) => {
    try {
      const response = await api.put(API_CONFIG.ENDPOINTS.ORDER_BY_ID(id), orderData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete order
  deleteOrder: async (id) => {
    try {
      const response = await api.delete(API_CONFIG.ENDPOINTS.ORDER_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
