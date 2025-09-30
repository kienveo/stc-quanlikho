import React, { useState } from 'react';
import { mockAuth } from '../../utils/mockAuth';
import { showToast } from '../Common/Toast';
import Button from '../Common/Button';
import Input from '../Common/Input';

const MockAuthDebugger = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [debugResults, setDebugResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testMockLogin = async (username, password) => {
    try {
      console.log('Testing mock login with:', { username, password });
      const result = await mockAuth.login({ username, password });
      console.log('Mock login result:', result);
      return {
        username,
        success: true,
        result: result
      };
    } catch (error) {
      console.error('Mock login error:', error);
      return {
        username,
        success: false,
        error: error
      };
    }
  };

  const handleTestAllAccounts = async () => {
    setIsLoading(true);
    setDebugResults([]);
    
    const testAccounts = [
      { username: 'admin@demo.com', password: 'admin123' },
      { username: 'manager@demo.com', password: 'manager123' },
      { username: 'staff@demo.com', password: 'staff123' },
      { username: 'viewer@demo.com', password: 'viewer123' },
      { username: 'admin_demo', password: 'admin123' },
      { username: 'manager_demo', password: 'manager123' },
      { username: 'staff_demo', password: 'staff123' },
      { username: 'viewer_demo', password: 'viewer123' }
    ];
    
    const results = [];
    
    for (const account of testAccounts) {
      const result = await testMockLogin(account.username, account.password);
      results.push(result);
      setDebugResults([...results]);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsLoading(false);
    
    const successCount = results.filter(r => r.success).length;
    const errorCount = results.filter(r => !r.success).length;
    
    showToast(
      `Debug hoàn thành: ${successCount} thành công, ${errorCount} lỗi`,
      { type: successCount > 0 ? 'success' : 'error' }
    );
  };

  const handleManualTest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await testMockLogin(formData.username, formData.password);
    setDebugResults([result]);
    setIsLoading(false);
    
    showToast(
      result.success ? 'Test thành công!' : 'Test thất bại!',
      { type: result.success ? 'success' : 'error' }
    );
  };

  const handleQuickTest = (username, password) => {
    setFormData({ username, password });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-bug me-2"></i>
                Debug Mock Authentication
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <strong>Debug Tool:</strong> Công cụ này để debug mock authentication trực tiếp.
              </div>

              {/* Quick Test Buttons */}
              <div className="row mb-4">
                <div className="col-12">
                  <h6>Test nhanh:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleQuickTest('admin@demo.com', 'admin123')}
                      variant="outline-primary"
                      size="sm"
                    >
                      admin@demo.com
                    </Button>
                    <Button
                      onClick={() => handleQuickTest('admin_demo', 'admin123')}
                      variant="outline-secondary"
                      size="sm"
                    >
                      admin_demo
                    </Button>
                    <Button
                      onClick={() => handleQuickTest('manager@demo.com', 'manager123')}
                      variant="outline-success"
                      size="sm"
                    >
                      manager@demo.com
                    </Button>
                    <Button
                      onClick={() => handleQuickTest('manager_demo', 'manager123')}
                      variant="outline-info"
                      size="sm"
                    >
                      manager_demo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Manual Test Form */}
              <form onSubmit={handleManualTest} className="mb-4">
                <div className="row">
                  <div className="col-md-5">
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      icon="bi bi-envelope"
                    />
                  </div>
                  <div className="col-md-5">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
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
                      {isLoading ? 'Testing...' : 'Test'}
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
                        Test Tất Cả Tài Khoản Mock
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Results */}
              {debugResults.length > 0 && (
                <div className="mt-4">
                  <h5>Kết Quả Debug:</h5>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Trạng Thái</th>
                          <th>Thông Báo</th>
                          <th>Dữ Liệu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {debugResults.map((result, index) => (
                          <tr key={index}>
                            <td>{result.username}</td>
                            <td>
                              <span className={`badge ${
                                result.success ? 'bg-success' : 'bg-danger'
                              }`}>
                                {result.success ? 'Thành công' : 'Thất bại'}
                              </span>
                            </td>
                            <td>
                              {result.success ? 
                                result.result.message : 
                                result.error.response?.data?.message || 'Lỗi không xác định'
                              }
                            </td>
                            <td>
                              <pre className="mb-0" style={{ fontSize: '12px', maxHeight: '100px', overflow: 'auto' }}>
                                {JSON.stringify(result.success ? result.result : result.error, null, 2)}
                              </pre>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Console Log */}
              <div className="mt-4">
                <h6>Console Log:</h6>
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  Mở Developer Tools (F12) và xem tab Console để thấy log chi tiết.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockAuthDebugger;
