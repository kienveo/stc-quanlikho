import React, { useState } from 'react';
import DemoAccountCreator from '../components/Demo/DemoAccountCreator';
import DemoDataCreator from '../components/Demo/DemoDataCreator';
import ReportDataCreator from '../components/Demo/ReportDataCreator';
import LoginTester from '../components/Demo/LoginTester';
import MockAuthDebugger from '../components/Demo/MockAuthDebugger';
import AuthStateDebugger from '../components/Demo/AuthStateDebugger';
import LogoutDebugger from '../components/Demo/LogoutDebugger';
import Button from '../components/Common/Button';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('accounts');

  const tabs = [
    { id: 'accounts', label: 'Tài Khoản Demo', icon: 'bi-person-plus' },
    { id: 'data', label: 'Dữ Liệu Demo', icon: 'bi-database' },
    { id: 'reports', label: 'Dữ Liệu Báo Cáo', icon: 'bi-bar-chart' },
    { id: 'login-test', label: 'Test Đăng Nhập', icon: 'bi-bug' },
    { id: 'mock-debug', label: 'Debug Mock Auth', icon: 'bi-tools' },
    { id: 'auth-state', label: 'Debug Auth State', icon: 'bi-shield-check' },
    { id: 'logout-debug', label: 'Debug Logout', icon: 'bi-exclamation-triangle' },
    { id: 'guide', label: 'Hướng Dẫn', icon: 'bi-book' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'accounts':
        return <DemoAccountCreator />;
      case 'data':
        return <DemoDataCreator />;
      case 'reports':
        return <ReportDataCreator />;
      case 'login-test':
        return <LoginTester />;
      case 'mock-debug':
        return <MockAuthDebugger />;
      case 'auth-state':
        return <AuthStateDebugger />;
      case 'logout-debug':
        return <LogoutDebugger />;
      case 'guide':
        return <DemoGuide />;
      default:
        return <DemoAccountCreator />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title mb-0">
                <i className="bi bi-rocket me-2"></i>
                Trang Demo - Hệ Thống Quản Lý Kho
              </h3>
            </div>
            <div className="card-body">
              {/* Navigation Tabs */}
              <ul className="nav nav-tabs mb-4" role="tablist">
                {tabs.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                      type="button"
                    >
                      <i className={`${tab.icon} me-2`}></i>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Tab Content */}
              <div className="tab-content">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DemoGuide = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-book me-2"></i>
                Hướng Dẫn Sử Dụng Demo
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-warning">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <strong>Lưu ý:</strong> Trang này chỉ dành cho mục đích demo và phát triển. 
                Không sử dụng trong môi trường production.
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="bi bi-person-check me-2"></i>
                        Tài Khoản Demo
                      </h5>
                    </div>
                    <div className="card-body">
                      <h6>Các loại tài khoản:</h6>
                      <ul>
                        <li><strong>Admin:</strong> Quyền cao nhất, quản lý toàn bộ hệ thống</li>
                        <li><strong>Manager:</strong> Quản lý kho hàng, đơn hàng</li>
                        <li><strong>Staff:</strong> Nhân viên kho, xử lý đơn hàng</li>
                        <li><strong>Viewer:</strong> Chỉ xem báo cáo và thống kê</li>
                      </ul>
                      
                      <h6>Thông tin đăng nhập:</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Role</th>
                              <th>Email</th>
                              <th>Password</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><span className="badge bg-danger">Admin</span></td>
                              <td>admin@demo.com</td>
                              <td>admin123</td>
                            </tr>
                            <tr>
                              <td><span className="badge bg-warning">Manager</span></td>
                              <td>manager@demo.com</td>
                              <td>manager123</td>
                            </tr>
                            <tr>
                              <td><span className="badge bg-info">Staff</span></td>
                              <td>staff@demo.com</td>
                              <td>staff123</td>
                            </tr>
                            <tr>
                              <td><span className="badge bg-secondary">Viewer</span></td>
                              <td>viewer@demo.com</td>
                              <td>viewer123</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="bi bi-database me-2"></i>
                        Dữ Liệu Demo
                      </h5>
                    </div>
                    <div className="card-body">
                      <h6>Danh mục sản phẩm:</h6>
                      <ul>
                        <li>Điện Thoại</li>
                        <li>Laptop</li>
                        <li>Phụ Kiện</li>
                        <li>Đồ Gia Dụng</li>
                        <li>Thời Trang</li>
                      </ul>
                      
                      <h6>Sản phẩm mẫu:</h6>
                      <ul>
                        <li>iPhone 15 Pro - 25,990,000đ</li>
                        <li>MacBook Air M2 - 25,990,000đ</li>
                        <li>Samsung Galaxy S24 - 19,990,000đ</li>
                        <li>Dell XPS 13 - 29,990,000đ</li>
                        <li>AirPods Pro - 5,990,000đ</li>
                        <li>Và nhiều sản phẩm khác...</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <i className="bi bi-list-check me-2"></i>
                        Các Chức Năng Có Thể Test
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <h6><i className="bi bi-people me-2"></i>Quản Lý Người Dùng</h6>
                          <ul>
                            <li>Đăng ký tài khoản mới</li>
                            <li>Đăng nhập/đăng xuất</li>
                            <li>Quản lý thông tin cá nhân</li>
                            <li>Phân quyền người dùng</li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <h6><i className="bi bi-box me-2"></i>Quản Lý Sản Phẩm</h6>
                          <ul>
                            <li>Thêm/sửa/xóa sản phẩm</li>
                            <li>Quản lý danh mục</li>
                            <li>Theo dõi tồn kho</li>
                            <li>Tìm kiếm sản phẩm</li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <h6><i className="bi bi-cart me-2"></i>Quản Lý Đơn Hàng</h6>
                          <ul>
                            <li>Tạo đơn hàng mới</li>
                            <li>Theo dõi trạng thái đơn hàng</li>
                            <li>Xử lý đơn hàng</li>
                            <li>Lịch sử đơn hàng</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <h6><i className="bi bi-graph-up me-2"></i>Báo Cáo & Thống Kê</h6>
                          <ul>
                            <li>Dashboard tổng quan</li>
                            <li>Báo cáo doanh thu</li>
                            <li>Thống kê sản phẩm</li>
                            <li>Biểu đồ trực quan</li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <h6><i className="bi bi-gear me-2"></i>Hệ Thống</h6>
                          <ul>
                            <li>Cài đặt hệ thống</li>
                            <li>Quản lý vai trò</li>
                            <li>Backup dữ liệu</li>
                            <li>Logs hệ thống</li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <h6><i className="bi bi-shield me-2"></i>Bảo Mật</h6>
                          <ul>
                            <li>Xác thực 2FA</li>
                            <li>Mã hóa dữ liệu</li>
                            <li>Audit logs</li>
                            <li>Session management</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="alert alert-success">
                    <h6><i className="bi bi-lightbulb me-2"></i>Mẹo sử dụng:</h6>
                    <ul className="mb-0">
                      <li>Sử dụng các tài khoản demo để test các chức năng khác nhau</li>
                      <li>Tạo dữ liệu demo trước khi test các chức năng quản lý</li>
                      <li>Kiểm tra responsive design trên các thiết bị khác nhau</li>
                      <li>Test các trường hợp lỗi và edge cases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
