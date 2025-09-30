import axiosInstance from '../api/axiosInstance';

// Tạo tài khoản demo thực tế
export const createRealDemoAccount = async () => {
  const demoAccount = {
    username: 'demo_user',
    email: 'demo@test.com',
    password: 'demo123',
    confirmPassword: 'demo123'
  };

  try {
    console.log('Đang tạo tài khoản demo...');
    const response = await axiosInstance.post("/api/v1/un_auth/signup/user", demoAccount);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo tài khoản demo:', error.response?.data || error.message);
    return null;
  }
};

// Test đăng nhập với tài khoản demo
export const testDemoLogin = async () => {
  const loginData = {
    username: 'demo@test.com',
    password: 'demo123'
  };

  try {
    console.log('Đang test đăng nhập...');
    const response = await axiosInstance.post("/api/v1/un_auth/signin", loginData);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error.response?.data || error.message);
    return null;
  }
};

// Tạo và test tài khoản demo
export const createAndTestDemo = async () => {
  console.log('=== BẮT ĐẦU TẠO VÀ TEST TÀI KHOẢN DEMO ===');
  
  // Tạo tài khoản
  const createResult = await createRealDemoAccount();
  if (createResult) {
    console.log('✅ Tạo tài khoản thành công');
    
    // Đợi một chút rồi test đăng nhập
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test đăng nhập
    const loginResult = await testDemoLogin();
    if (loginResult) {
      console.log('✅ Đăng nhập thành công');
      return { success: true, createResult, loginResult };
    } else {
      console.log('❌ Đăng nhập thất bại');
      return { success: false, createResult, loginResult: null };
    }
  } else {
    console.log('❌ Tạo tài khoản thất bại');
    return { success: false, createResult: null, loginResult: null };
  }
};

export default {
  createRealDemoAccount,
  testDemoLogin,
  createAndTestDemo
};
