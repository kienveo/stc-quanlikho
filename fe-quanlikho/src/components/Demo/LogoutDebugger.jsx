import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../utils/authUtils';
import Button from '../Common/Button';

const LogoutDebugger = () => {
  const [authHistory, setAuthHistory] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const addAuthEvent = (event, details = {}) => {
    const timestamp = new Date().toLocaleString();
    const newEvent = {
      id: Date.now(),
      timestamp,
      event,
      details,
      isAuthenticated: isAuthenticated()
    };
    
    setAuthHistory(prev => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events
  };

  useEffect(() => {
    // Monitor localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'authToken' || e.key === 'tokenExpiredAt' || e.key === 'refreshToken') {
        addAuthEvent(`localStorage.${e.key} changed`, {
          oldValue: e.oldValue,
          newValue: e.newValue,
          key: e.key
        });
      }
    };

    // Monitor page visibility changes
    const handleVisibilityChange = () => {
      addAuthEvent('Page visibility changed', {
        hidden: document.hidden,
        isAuthenticated: isAuthenticated()
      });
    };

    // Monitor beforeunload
    const handleBeforeUnload = () => {
      addAuthEvent('Page before unload', {
        isAuthenticated: isAuthenticated()
      });
    };

    // Monitor focus/blur
    const handleFocus = () => {
      addAuthEvent('Window focused', {
        isAuthenticated: isAuthenticated()
      });
    };

    const handleBlur = () => {
      addAuthEvent('Window blurred', {
        isAuthenticated: isAuthenticated()
      });
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Start monitoring
    setIsMonitoring(true);
    addAuthEvent('Debugger started', {
      isAuthenticated: isAuthenticated()
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      setIsMonitoring(false);
    };
  }, []);

  const handleClearHistory = () => {
    setAuthHistory([]);
  };

  const handleTestLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiredAt');
    localStorage.removeItem('authUser');
    addAuthEvent('Manual logout test', {
      isAuthenticated: isAuthenticated()
    });
  };

  const handleTestLogin = () => {
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
    
    addAuthEvent('Manual login test', {
      isAuthenticated: isAuthenticated()
    });
  };

  const getEventIcon = (event) => {
    if (event.includes('login')) return 'bi-person-check';
    if (event.includes('logout')) return 'bi-person-x';
    if (event.includes('localStorage')) return 'bi-database';
    if (event.includes('Page')) return 'bi-window';
    if (event.includes('Window')) return 'bi-laptop';
    return 'bi-info-circle';
  };

  const getEventColor = (event) => {
    if (event.includes('login')) return 'success';
    if (event.includes('logout')) return 'danger';
    if (event.includes('localStorage')) return 'warning';
    if (event.includes('Page')) return 'info';
    if (event.includes('Window')) return 'secondary';
    return 'primary';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-bug me-2"></i>
                Debug Logout Issues
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Real-time Monitoring:</strong> Theo dõi tất cả sự kiện có thể gây logout.
              </div>

              {/* Control Buttons */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex gap-2">
                    <Button
                      onClick={handleTestLogin}
                      variant="success"
                      size="sm"
                    >
                      Test Login
                    </Button>
                    <Button
                      onClick={handleTestLogout}
                      variant="danger"
                      size="sm"
                    >
                      Test Logout
                    </Button>
                    <Button
                      onClick={handleClearHistory}
                      variant="outline-secondary"
                      size="sm"
                    >
                      Clear History
                    </Button>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Trạng Thái Hiện Tại</h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Monitoring:</span>
                        <span className={`badge ${isMonitoring ? 'bg-success' : 'bg-danger'}`}>
                          {isMonitoring ? 'Đang theo dõi' : 'Dừng'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Authenticated:</span>
                        <span className={`badge ${isAuthenticated() ? 'bg-success' : 'bg-danger'}`}>
                          {isAuthenticated() ? 'Có' : 'Không'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Events:</span>
                        <span className="badge bg-info">{authHistory.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">LocalStorage</h6>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>authToken:</span>
                        <span className={`badge ${localStorage.getItem('authToken') ? 'bg-success' : 'bg-danger'}`}>
                          {localStorage.getItem('authToken') ? 'Có' : 'Không'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>tokenExpiredAt:</span>
                        <span className={`badge ${localStorage.getItem('tokenExpiredAt') ? 'bg-success' : 'bg-danger'}`}>
                          {localStorage.getItem('tokenExpiredAt') ? 'Có' : 'Không'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>authUser:</span>
                        <span className={`badge ${localStorage.getItem('authUser') ? 'bg-success' : 'bg-danger'}`}>
                          {localStorage.getItem('authUser') ? 'Có' : 'Không'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event History */}
              <div className="mt-4">
                <h5>Lịch Sử Sự Kiện:</h5>
                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <table className="table table-striped table-sm">
                    <thead className="sticky-top bg-light">
                      <tr>
                        <th>Thời Gian</th>
                        <th>Sự Kiện</th>
                        <th>Trạng Thái</th>
                        <th>Chi Tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authHistory.map((event) => (
                        <tr key={event.id}>
                          <td>
                            <small>{event.timestamp}</small>
                          </td>
                          <td>
                            <i className={`bi ${getEventIcon(event.event)} me-1`}></i>
                            {event.event}
                          </td>
                          <td>
                            <span className={`badge ${
                              event.isAuthenticated ? 'bg-success' : 'bg-danger'
                            }`}>
                              {event.isAuthenticated ? 'Auth' : 'No Auth'}
                            </span>
                          </td>
                          <td>
                            <small>
                              {Object.keys(event.details).length > 0 ? 
                                JSON.stringify(event.details) : 
                                'Không có chi tiết'
                              }
                            </small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-4">
                <div className="alert alert-warning">
                  <h6><i className="bi bi-lightbulb me-2"></i>Hướng dẫn sử dụng:</h6>
                  <ol className="mb-0">
                    <li>Mở tab này trước khi đăng nhập</li>
                    <li>Đăng nhập với tài khoản demo</li>
                    <li>Quan sát các sự kiện trong bảng</li>
                    <li>Tìm sự kiện gây logout</li>
                    <li>Kiểm tra chi tiết để xác định nguyên nhân</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutDebugger;
