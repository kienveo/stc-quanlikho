import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import { StatisticsCards } from "../Charts";

const OverviewDashboard = () => {
  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Tổng quan hệ thống</h2>
            <div className="text-muted">
              <i className="bi bi-calendar3 me-2"></i>
              {new Date().toLocaleDateString('vi-VN')}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards />

      {/* Quick Actions */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Thao tác nhanh</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="d-grid">
                    <a href="/dashboard/products/create" className="btn btn-primary">
                      <i className="bi bi-plus-circle me-2"></i>
                      Thêm sản phẩm
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-grid">
                    <a href="/dashboard/orders/create" className="btn btn-success">
                      <i className="bi bi-cart-plus me-2"></i>
                      Tạo đơn hàng
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-grid">
                    <a href="/dashboard/categories/create" className="btn btn-info">
                      <i className="bi bi-tag me-2"></i>
                      Thêm danh mục
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-grid">
                    <a href="/dashboard/reports" className="btn btn-warning">
                      <i className="bi bi-file-earmark-bar-graph me-2"></i>
                      Xem báo cáo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Sản phẩm gần hết hàng</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Laptop Dell XPS 13</h6>
                    <small className="text-muted">SKU: LP001</small>
                  </div>
                  <span className="badge bg-warning">5 sản phẩm</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">iPhone 15 Pro</h6>
                    <small className="text-muted">SKU: IP001</small>
                  </div>
                  <span className="badge bg-danger">2 sản phẩm</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Samsung Galaxy S24</h6>
                    <small className="text-muted">SKU: SG001</small>
                  </div>
                  <span className="badge bg-warning">3 sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Đơn hàng gần đây</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Đơn hàng #ORD001</h6>
                    <small className="text-muted">Nguyễn Văn A</small>
                  </div>
                  <span className="badge bg-success">Hoàn thành</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Đơn hàng #ORD002</h6>
                    <small className="text-muted">Trần Thị B</small>
                  </div>
                  <span className="badge bg-warning">Đang xử lý</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Đơn hàng #ORD003</h6>
                    <small className="text-muted">Lê Văn C</small>
                  </div>
                  <span className="badge bg-info">Chờ xác nhận</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OverviewDashboard;
