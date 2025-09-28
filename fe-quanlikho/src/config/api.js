// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    PROFILE: '/auth/profile',
    
    // User management
    USERS: '/users',
    USER_BY_ID: (id) => `/users/${id}`,
    
    // Product management
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id) => `/products/${id}`,
    
    // Category management
    CATEGORIES: '/categories',
    CATEGORY_BY_ID: (id) => `/categories/${id}`,
    
    // Order management
    ORDERS: '/orders',
    ORDER_BY_ID: (id) => `/orders/${id}`,
    
    // Reports
    REPORTS: '/reports',
    DASHBOARD_STATS: '/reports/dashboard',
  }
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// API Response Messages
export const API_MESSAGES = {
  SUCCESS: 'Thành công',
  ERROR: 'Có lỗi xảy ra',
  UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn',
  FORBIDDEN: 'Bạn không có quyền thực hiện hành động này',
  NOT_FOUND: 'Không tìm thấy dữ liệu',
  NETWORK_ERROR: 'Lỗi kết nối mạng',
  TIMEOUT: 'Yêu cầu quá thời gian chờ',
};
