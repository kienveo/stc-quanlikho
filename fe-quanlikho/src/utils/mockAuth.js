// Mock authentication cho demo khi backend không chạy
export const mockAuth = {
  // Mock login function
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { username, password } = credentials;
    
    // Demo accounts
    const demoAccounts = [
      { username: 'admin@demo.com', password: 'admin123', role: 'Admin', name: 'Admin Demo' },
      { username: 'manager@demo.com', password: 'manager123', role: 'Manager', name: 'Manager Demo' },
      { username: 'staff@demo.com', password: 'staff123', role: 'Staff', name: 'Staff Demo' },
      { username: 'viewer@demo.com', password: 'viewer123', role: 'Viewer', name: 'Viewer Demo' },
      { username: 'admin_demo', password: 'admin123', role: 'Admin', name: 'Admin Demo' },
      { username: 'manager_demo', password: 'manager123', role: 'Manager', name: 'Manager Demo' },
      { username: 'staff_demo', password: 'staff123', role: 'Staff', name: 'Staff Demo' },
      { username: 'viewer_demo', password: 'viewer123', role: 'Viewer', name: 'Viewer Demo' }
    ];
    
    // Find matching account
    const account = demoAccounts.find(acc => 
      acc.username === username && 
      acc.password === password
    );
    
    if (account) {
      // Mock successful login
      const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const mockRefreshToken = `mock_refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Calculate expiration time (1 hour from now)
      const expiresIn = 3600; // 1 hour in seconds
      const expiredAt = Date.now() + (expiresIn * 1000);
      
      return {
        status: 200,
        message: 'Đăng nhập thành công (Mock Mode)',
        data: {
          accessToken: mockToken,
          refreshToken: mockRefreshToken,
          expiresIn: expiresIn,
          expiredAt: expiredAt,
          user: {
            id: 1,
            username: account.username,
            email: account.username.includes('@') ? account.username : `${account.username}@demo.com`,
            role: account.role,
            name: account.name,
            isActive: true
          }
        }
      };
    } else {
      // Mock failed login
      throw {
        response: {
          data: {
            status: 401,
            message: 'Tên đăng nhập hoặc mật khẩu không đúng (Mock Mode)'
          }
        }
      };
    }
  },

  // Mock register function
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      status: 200,
      message: 'Đăng ký thành công (Mock Mode)',
      data: {
        user: {
          id: Date.now(),
          username: userData.username,
          email: userData.email,
          role: 'User',
          isActive: true
        }
      }
    };
  },

  // Check if backend is available
  checkBackendStatus: async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/un_auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test', password: 'test' })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};

export default mockAuth;
