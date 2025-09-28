import { api } from './api';
import { API_CONFIG } from '../config/api';

// Product Management Service
export const productService = {
  // Get all products
  getProducts: async (params = {}) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.PRODUCTS, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.PRODUCTS, productData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id), productData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
