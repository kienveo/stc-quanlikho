import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/auth';
import { message } from 'antd';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Show message when redirecting to login
    message.warning('Vui lòng đăng nhập để tiếp tục');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  // Check if user data exists
  const user = getUser();
  if (!user || !user.role) {
    message.error('Thông tin người dùng không hợp lệ, vui lòng đăng nhập lại');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default RequireAuth;
