import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasAnyRole } from '../utils/rbac';

const RequireRole = ({ roles, children }) => {
  if (!hasAnyRole(roles)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireRole;
