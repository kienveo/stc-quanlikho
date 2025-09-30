import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../utils/authUtils';
import Button from '../Common/Button';

const AuthStateDebugger = () => {
  const [authState, setAuthState] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkAuthState = () => {
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredAt = localStorage.getItem('tokenExpiredAt');
    const user = localStorage.getItem('authUser');
    
    const now = Date.now();
    const expiredTime = expiredAt ? Number(expiredAt) : 0;
    const isExpired = expiredTime > 0 && now > expiredTime;
    const timeUntilExpiry = expiredTime > 0 ? Math.max(0, expiredTime - now) : 0;
    
    setAuthState({
      token: token ? `${token.substring(0, 20)}...` : 'Không có',
      refreshToken: refreshToken ? `${refreshToken.substring(0, 20)}...` : 'Không có',
      expiredAt: expiredAt ? new Date(Number(expiredAt)).toLocaleString() : 'Không có',
      user: user ? JSON.parse(user) : null,
      isAuthenticated: isAuthenticated(),
      isExpired: isExpired,
      timeUntilExpiry: Math.floor(timeUntilExpiry / 1000 / 60), // minutes
      currentTime: new Date().toLocaleString()
    });
  };

  useEffect(() => {
    checkAuthState();
    const interval = setInterval(checkAuthState, 1000); // Check every second
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    checkAuthState();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleClearAuth = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiredAt');
    localStorage.removeItem('authUser');
    checkAuthState();
  };

  const handleMockLogin = () => {
    const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const mockRefreshToken = `mock_refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiredAt = Date.now() + (3600 * 1000); // 1 hour
    
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('refreshToken', mockRefreshToken);
    localStorage.setItem('tokenExpiredAt', expiredAt.toString());
    localStorage.setItem('authUser', JSON.stringify({
      id: 1,
      username: 'admin@demo.com',
      email: 'admin@demo.com',
      role: 'Admin',
      name: 'Admin Demo',
      isActive: true
    }));
    
    checkAuthState();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-shield-check me-2"></i>
                Debug Authentication State
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Real-time Debug:</strong> Theo dõi trạng thái authentication trong thời gian thực.
              </div>

              {/* Action Buttons */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex gap-2">
                    <Button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      variant="primary"
                      size="sm"
                    >
                      {isRefreshing ? 'Đang refresh...' : 'Refresh'}
                    </Button>
                    <Button
                      onClick={handleMockLogin}
                      variant="success"
                      size="sm"
                    >
                      Mock Login
                    </Button>
                    <Button
                      onClick={handleClearAuth}
                      variant="danger"
                      size="sm"
                    >
                      Clear Auth
                    </Button>
                  </div>
                </div>
              </div>

              {/* Auth State Display */}
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Trạng Thái Authentication</h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td><strong>Is Authenticated:</strong></td>
                            <td>
                              <span className={`badge ${
                                authState.isAuthenticated ? 'bg-success' : 'bg-danger'
                              }`}>
                                {authState.isAuthenticated ? 'Có' : 'Không'}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Token:</strong></td>
                            <td><code>{authState.token}</code></td>
                          </tr>
                          <tr>
                            <td><strong>Refresh Token:</strong></td>
                            <td><code>{authState.refreshToken}</code></td>
                          </tr>
                          <tr>
                            <td><strong>Expired At:</strong></td>
                            <td>{authState.expiredAt}</td>
                          </tr>
                          <tr>
                            <td><strong>Is Expired:</strong></td>
                            <td>
                              <span className={`badge ${
                                authState.isExpired ? 'bg-danger' : 'bg-success'
                              }`}>
                                {authState.isExpired ? 'Đã hết hạn' : 'Còn hạn'}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Time Until Expiry:</strong></td>
                            <td>
                              <span className={`badge ${
                                authState.timeUntilExpiry < 5 ? 'bg-warning' : 'bg-info'
                              }`}>
                                {authState.timeUntilExpiry} phút
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Thông Tin User</h6>
                    </div>
                    <div className="card-body">
                      {authState.user ? (
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <td><strong>ID:</strong></td>
                              <td>{authState.user.id}</td>
                            </tr>
                            <tr>
                              <td><strong>Username:</strong></td>
                              <td>{authState.user.username}</td>
                            </tr>
                            <tr>
                              <td><strong>Email:</strong></td>
                              <td>{authState.user.email}</td>
                            </tr>
                            <tr>
                              <td><strong>Role:</strong></td>
                              <td>
                                <span className="badge bg-primary">
                                  {authState.user.role}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td><strong>Name:</strong></td>
                              <td>{authState.user.name}</td>
                            </tr>
                            <tr>
                              <td><strong>Active:</strong></td>
                              <td>
                                <span className={`badge ${
                                  authState.user.isActive ? 'bg-success' : 'bg-danger'
                                }`}>
                                  {authState.user.isActive ? 'Có' : 'Không'}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-muted">Không có thông tin user</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Time */}
              <div className="mt-3">
                <small className="text-muted">
                  <i className="bi bi-clock me-1"></i>
                  Thời gian hiện tại: {authState.currentTime}
                </small>
              </div>

              {/* Auto Refresh Indicator */}
              <div className="mt-2">
                <small className="text-info">
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  Tự động refresh mỗi giây
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthStateDebugger;
