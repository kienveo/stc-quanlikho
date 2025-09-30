import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { showToast } from '../Common/Toast';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { mockAuth } from '../../utils/mockAuth';

const LoginTester = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);

  // Check backend status on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const isAvailable = await mockAuth.checkBackendStatus();
      setIsBackendAvailable(isAvailable);
      setIsCheckingBackend(false);
    };
    checkBackend();
  }, []);

  const demoAccounts = [
    { username: 'admin@demo.com', password: 'admin123', role: 'Admin' },
    { username: 'manager@demo.com', password: 'manager123', role: 'Manager' },
    { username: 'staff@demo.com', password: 'staff123', role: 'Staff' },
    { username: 'viewer@demo.com', password: 'viewer123', role: 'Viewer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testLogin = async (account) => {
    try {
      let result;
      
      if (isBackendAvailable) {
        // Use real API
        const response = await axiosInstance.post("/api/v1/un_auth/signin", {
          username: account.username,
          password: account.password,
        });
        result = response.data;
      } else {
        // Use mock auth
        result = await mockAuth.login({
          username: account.username,
          password: account.password,
        });
      }
      
      return {
        account: account.username,
        success: true,
        message: result.message || 'Login successful',
        data: result.data,
        mode: isBackendAvailable ? 'Real API' : 'Mock Mode'
      };
    } catch (error) {
      return {
        account: account.username,
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
        error: error.response?.data,
        mode: isBackendAvailable ? 'Real API' : 'Mock Mode'
      };
    }
  };

  const handleTestAllAccounts = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    const results = [];
    
    for (const account of demoAccounts) {
      const result = await testLogin(account);
      results.push(result);
      setTestResults([...results]);
      
      // Delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsLoading(false);
    
    const successCount = results.filter(r => r.success).length;
    const errorCount = results.filter(r => !r.success).length;
    
    showToast(
      `Test hoàn thành: ${successCount} thành công, ${errorCount} lỗi`,
      { type: successCount > 0 ? 'success' : 'error' }
    );
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await testLogin(formData);
    setTestResults([result]);
    setIsLoading(false);
    
    showToast(
      result.success ? 'Đăng nhập thành công!' : 'Đăng nhập thất bại!',
      { type: result.success ? 'success' : 'error' }
    );
  };

  const handleQuickLogin = (account) => {
    setFormData({
      username: account.username,
      password: account.password
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-bug me-2"></i>
                Test Đăng Nhập Tài Khoản Demo
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Hướng dẫn:</strong> Sử dụng công cụ này để test đăng nhập với các tài khoản demo.
              </div>

              {isCheckingBackend && (
                <div className="alert alert-info">
                  <i className="bi bi-hourglass-split me-2"></i>
                  Đang kiểm tra kết nối backend...
                </div>
              )}
              
              {!isCheckingBackend && !isBackendAvailable && (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Chế độ Demo:</strong> Backend không khả dụng, đang sử dụng dữ liệu mock.
                  <br />
                  <small>Tất cả tài khoản demo sẽ hoạt động trong chế độ mock.</small>
                </div>
              )}
              
              {!isCheckingBackend && isBackendAvailable && (
                <div className="alert alert-success">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>Kết nối Backend:</strong> Backend API đang hoạt động bình thường.
                </div>
              )}

              {/* Quick Login Buttons */}
              <div className="row mb-4">
                <div className="col-12">
                  <h6>Đăng nhập nhanh:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {demoAccounts.map((account, index) => (
                      <Button
                        key={index}
                        onClick={() => handleQuickLogin(account)}
                        variant="outline-primary"
                        size="sm"
                      >
                        {account.role}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Manual Login Form */}
              <form onSubmit={handleManualLogin} className="mb-4">
                <div className="row">
                  <div className="col-md-5">
                    <Input
                      type="text"
                      name="username"
                      placeholder="Email hoặc username"
                      value={formData.username}
                      onChange={handleChange}
                      icon="bi bi-envelope"
                    />
                  </div>
                  <div className="col-md-5">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      icon="bi bi-lock"
                    />
                  </div>
                  <div className="col-md-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                      className="w-100"
                    >
                      {isLoading ? 'Testing...' : 'Test Login'}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Test All Button */}
              <div className="row mb-4">
                <div className="col-12">
                  <Button
                    onClick={handleTestAllAccounts}
                    disabled={isLoading}
                    variant="success"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Đang test...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-play-circle me-2"></i>
                        Test Tất Cả Tài Khoản Demo
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Results */}
              {testResults.length > 0 && (
                <div className="mt-4">
                  <h5>Kết Quả Test:</h5>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Tài Khoản</th>
                          <th>Trạng Thái</th>
                          <th>Chế Độ</th>
                          <th>Thông Báo</th>
                          <th>Chi Tiết</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testResults.map((result, index) => (
                          <tr key={index}>
                            <td>{result.account}</td>
                            <td>
                              <span className={`badge ${
                                result.success ? 'bg-success' : 'bg-danger'
                              }`}>
                                {result.success ? 'Thành công' : 'Thất bại'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${
                                result.mode === 'Real API' ? 'bg-primary' : 'bg-warning'
                              }`}>
                                {result.mode}
                              </span>
                            </td>
                            <td>{result.message}</td>
                            <td>
                              {result.success && result.data ? (
                                <small className="text-success">
                                  Token: {result.data.accessToken ? 'Có' : 'Không'}
                                </small>
                              ) : (
                                <small className="text-danger">
                                  {JSON.stringify(result.error)}
                                </small>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* API Status */}
              <div className="mt-4">
                <h6>Trạng Thái API:</h6>
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Lưu ý:</strong> Đảm bảo backend API đang chạy trên <code>http://localhost:8080</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTester;
