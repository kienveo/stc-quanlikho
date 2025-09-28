import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasAnyRole, getCurrentRoles } from '../utils/rbac';
import { Result, Button } from 'antd';

const RequireRole = ({ roles, children, fallback = null }) => {
  const userRoles = getCurrentRoles();
  
  if (!hasAnyRole(roles)) {
    if (fallback) {
      return fallback;
    }
    
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Result
          status="403"
          title="403"
          subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
          extra={
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Quyền hiện tại: {userRoles.join(', ') || 'Không có quyền'}
              </p>
              <p className="text-gray-600 mb-4">
                Quyền yêu cầu: {roles.join(', ')}
              </p>
              <Button type="primary" onClick={() => window.history.back()}>
                Quay lại
              </Button>
            </div>
          }
        />
      </div>
    );
  }
  
  return children;
};

export default RequireRole;
