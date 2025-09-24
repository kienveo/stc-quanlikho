import React from 'react';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Fake auth: accept any credentials
    setToken('fake-demo-token');
    setUser({ username: values.username, role: 'Admin' });
    message.success('Đăng nhập thành công');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow">
        <div className="text-center mb-6">
          <Title level={3}>Đăng nhập</Title>
          <Text type="secondary">Quản lý Kho - Admin</Text>
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
          <Button type="primary" htmlType="submit" block>
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
