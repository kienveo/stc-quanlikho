import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';
import { ROLES } from '../utils/rbac';
import { authService } from '../services/authService';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      // Call real API
      const response = await authService.login(values);
      
      // Save token and user data
      setToken(response.data.token);
      setUser({
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        role: response.data.user.role,
        loginTime: new Date().toISOString()
      });
      
      message.success(`Đăng nhập thành công! Chào mừng ${response.data.user.username}`);
      navigate('/');
      
    } catch (error) {
      // Fallback to demo mode if API is not available
      if (error.code === 'ECONNABORTED' || error.message?.includes('Network Error')) {
        console.log('API không khả dụng, sử dụng chế độ demo');
        handleDemoLogin(values);
      }
      // Error message is already handled by API interceptor
    } finally {
      setLoading(false);
    }
  };

  // Demo login fallback
  const handleDemoLogin = (values) => {
    const { username, password } = values;
    
    // Demo credentials for testing
    const validCredentials = {
      'admin': { password: 'admin123', role: ROLES.Admin },
      'manager': { password: 'manager123', role: ROLES.Manager },
      'staff': { password: 'staff123', role: ROLES.Staff },
      'user': { password: 'user123', role: ROLES.Staff }
    };

    // Check credentials
    const userCreds = validCredentials[username.toLowerCase()];
    
    if (!userCreds) {
      message.error('Tên đăng nhập không tồn tại!');
      return;
    }
    
    if (userCreds.password !== password) {
      message.error('Mật khẩu không đúng!');
      return;
    }
    
    // Login successful
    setToken(`demo-token-${username}-${Date.now()}`);
    setUser({ 
      id: Date.now(),
      username: username, 
      email: `${username}@demo.com`,
      role: userCreds.role,
      loginTime: new Date().toISOString()
    });
    
    message.success(`Đăng nhập thành công! (Demo mode) Chào mừng ${username} (${userCreds.role})`);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow">
        <div className="text-center mb-6">
          <Title level={3}>Đăng nhập</Title>
          <Text type="secondary">Quản lý Kho</Text>
          <div className="mt-2 text-xs text-gray-500">
            <div>Demo tài khoản (khi API không khả dụng):</div>
            <div>• admin / admin123 (Admin)</div>
            <div>• manager / manager123 (Manager)</div>
            <div>• staff / staff123 (Staff)</div>
            <div>• user / user123 (User)</div>
          </div>
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
        </Form>
        <div className="text-center mt-4">
          <Text>Bạn chưa có tài khoản? </Text>
          <Link to="/register">Đăng ký</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
