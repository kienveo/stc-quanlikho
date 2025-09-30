// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/v1/un_auth/signin',
    REGISTER: '/api/v1/un_auth/signup/user',
    LOGOUT: '/api/v1/un_auth/logout',
    REFRESH_TOKEN: '/api/v1/un_auth/refresh',
    PROFILE: '/api/v1/un_auth/profile',
    
    // User management
    USERS: '/api/v1/un_auth/user/user_list',
    USER_BY_ID: (id) => `/api/v1/un_auth/user/${id}`,
    USER_SEARCH: '/api/v1/admin/category/get_all_user',
    USER_UPDATE: '/api/v1/un_auth/user/user_update',
    USER_DELETE: (id) => `/api/v1/admin/user/delete/${id}`,
    
    // Product management
    PRODUCTS: '/api/v1/un_auth/product/product_list',
    PRODUCT_BY_ID: (id) => `/api/v1/un_auth/product/${id}`,
    PRODUCT_CREATE: '/api/v1/un_auth/product/create',
    PRODUCT_UPDATE: '/api/v1/un_auth/product/product_update',
    PRODUCT_DELETE: (id) => `/api/v1/un_auth/product/delete/${id}`,
    
    // Category management
    CATEGORIES: '/api/v1/un_auth/category/all',
    CATEGORY_BY_ID: (id) => `/api/v1/un_auth/category/${id}`,
    CATEGORY_CREATE: '/api/v1/un_auth/category/category_create',
    CATEGORY_UPDATE: '/api/v1/un_auth/category/category_update',
    CATEGORY_DELETE: (id) => `/api/v1/un_auth/category/delete/${id}`,
    
    // Order management
    ORDERS: '/api/v1/un_auth/product_order/product_order_list',
    ORDER_BY_ID: (id) => `/api/v1/un_auth/product_order/${id}`,
    ORDER_CREATE: '/api/v1/un_auth/product_order/create',
    ORDER_UPDATE: '/api/v1/un_auth/product_order/product_order_update',
    ORDER_DELETE: (id) => `/api/v1/un_auth/product_order/delete/${id}`,
    
    // Reports
    REPORTS: '/api/v1/un_auth/report',
    DASHBOARD_STATS: '/api/v1/un_auth/report/dashboard',
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
