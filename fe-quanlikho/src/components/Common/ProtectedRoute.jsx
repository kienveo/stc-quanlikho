import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/authUtils";

const ProtectedRoute = ({ children }) => {
  // Nếu chưa đăng nhập, redirect về login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị component
  return children;
};

export default ProtectedRoute;
