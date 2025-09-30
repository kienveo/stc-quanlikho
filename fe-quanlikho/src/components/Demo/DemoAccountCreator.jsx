import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { showToast } from '../Common/Toast';
import Button from '../Common/Button';

const DemoAccountCreator = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [createdAccounts, setCreatedAccounts] = useState([]);

  const demoAccounts = [
    {
      username: 'admin_demo',
      email: 'admin@demo.com',
      password: 'admin123',
      role: 'Admin',
      description: 'Tài khoản quản trị viên với đầy đủ quyền'
    },
    {
      username: 'manager_demo',
      email: 'manager@demo.com',
      password: 'manager123',
      role: 'Manager',
      description: 'Tài khoản quản lý kho hàng'
    },
    {
      username: 'staff_demo',
      email: 'staff@demo.com',
      password: 'staff123',
      role: 'Staff',
      description: 'Tài khoản nhân viên kho'
    },
    {
      username: 'viewer_demo',
      email: 'viewer@demo.com',
      password: 'viewer123',
      role: 'Viewer',
      description: 'Tài khoản chỉ xem báo cáo'
    }
  ];

  const createDemoAccount = async (account) => {
    try {
      const payload = {
        username: account.username,
        email: account.email,
        password: account.password,
        confirmPassword: account.password,
      };

      const res = await axiosInstance.post("/api/v1/un_auth/signup/user", payload);
      
      if (res.data && res.data.status === 200) {
        return {
          ...account,
          status: 'success',
          message: res.data.message || 'Tạo tài khoản thành công!'
        };
      } else {
        return {
          ...account,
          status: 'error',
          message: res.data.message || 'Tạo tài khoản thất bại!'
        };
      }
    } catch (error) {
      return {
        ...account,
        status: 'error',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản!'
      };
    }
  };

  const handleCreateAllAccounts = async () => {
    setIsCreating(true);
    setCreatedAccounts([]);
    
    const results = [];
    
    for (const account of demoAccounts) {
      const result = await createDemoAccount(account);
      results.push(result);
      setCreatedAccounts([...results]);
      
      // Delay giữa các request để tránh spam
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsCreating(false);
    
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;
    
    showToast(
      `Đã tạo ${successCount} tài khoản thành công, ${errorCount} tài khoản lỗi!`,
      { type: successCount > 0 ? 'success' : 'error' }
    );
  };

  const handleCreateSingleAccount = async (account) => {
    setIsCreating(true);
    const result = await createDemoAccount(account);
    setCreatedAccounts([result]);
    setIsCreating(false);
    
    showToast(result.message, { type: result.status === 'success' ? 'success' : 'error' });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-person-plus me-2"></i>
                Tạo Tài Khoản Demo
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Hướng dẫn:</strong> Sử dụng các tài khoản demo này để test các chức năng của hệ thống quản lý kho.
                Tất cả tài khoản đều có mật khẩu đơn giản để dễ nhớ.
              </div>

              <div className="row mb-4">
                <div className="col-12">
                  <Button
                    onClick={handleCreateAllAccounts}
                    disabled={isCreating}
                    variant="primary"
                    size="lg"
                    className="me-2"
                  >
                    {isCreating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-people me-2"></i>
                        Tạo Tất Cả Tài Khoản Demo
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="row">
                {demoAccounts.map((account, index) => (
                  <div key={index} className="col-md-6 col-lg-3 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title text-primary">
                          <i className="bi bi-person-circle me-2"></i>
                          {account.role}
                        </h6>
                        <div className="mb-2">
                          <small className="text-muted">Username:</small>
                          <div className="fw-bold">{account.username}</div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Email:</small>
                          <div className="fw-bold">{account.email}</div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Password:</small>
                          <div className="fw-bold text-warning">{account.password}</div>
                        </div>
                        <p className="card-text small text-muted">
                          {account.description}
                        </p>
                        <Button
                          onClick={() => handleCreateSingleAccount(account)}
                          disabled={isCreating}
                          variant="outline-primary"
                          size="sm"
                          className="w-100"
                        >
                          <i className="bi bi-plus-circle me-1"></i>
                          Tạo Tài Khoản
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {createdAccounts.length > 0 && (
                <div className="mt-4">
                  <h5>Kết Quả Tạo Tài Khoản:</h5>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Trạng Thái</th>
                          <th>Thông Báo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {createdAccounts.map((account, index) => (
                          <tr key={index}>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>
                              <span className={`badge ${
                                account.role === 'Admin' ? 'bg-danger' :
                                account.role === 'Manager' ? 'bg-warning' :
                                account.role === 'Staff' ? 'bg-info' :
                                'bg-secondary'
                              }`}>
                                {account.role}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${
                                account.status === 'success' ? 'bg-success' : 'bg-danger'
                              }`}>
                                {account.status === 'success' ? 'Thành công' : 'Lỗi'}
                              </span>
                            </td>
                            <td>
                              <small className={
                                account.status === 'success' ? 'text-success' : 'text-danger'
                              }>
                                {account.message}
                              </small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h5>Thông Tin Đăng Nhập Demo:</h5>
                <div className="alert alert-success">
                  <h6><i className="bi bi-key me-2"></i>Thông tin đăng nhập:</h6>
                  <ul className="mb-0">
                    <li><strong>Admin:</strong> admin@demo.com / admin123</li>
                    <li><strong>Manager:</strong> manager@demo.com / manager123</li>
                    <li><strong>Staff:</strong> staff@demo.com / staff123</li>
                    <li><strong>Viewer:</strong> viewer@demo.com / viewer123</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoAccountCreator;
