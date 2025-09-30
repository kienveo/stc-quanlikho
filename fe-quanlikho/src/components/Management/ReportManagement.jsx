import React, { useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import { StatisticsChart } from "../Charts";

const ReportManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("sales");

  const reportTypes = [
    { value: "sales", label: "Báo cáo doanh thu" },
    { value: "inventory", label: "Báo cáo tồn kho" },
    { value: "orders", label: "Báo cáo đơn hàng" },
    { value: "products", label: "Báo cáo sản phẩm" }
  ];

  const periods = [
    { value: "week", label: "7 ngày qua" },
    { value: "month", label: "30 ngày qua" },
    { value: "quarter", label: "3 tháng qua" },
    { value: "year", label: "1 năm qua" }
  ];

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Báo cáo & Thống kê</h2>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-download me-2"></i>
                Xuất Excel
              </button>
              <button className="btn btn-outline-success">
                <i className="bi bi-printer me-2"></i>
                In báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Loại báo cáo</label>
                  <select
                    className="form-select"
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                  >
                    {reportTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Khoảng thời gian</label>
                  <select
                    className="form-select"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    {periods.map(period => (
                      <option key={period.value} value={period.value}>
                        {period.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">&nbsp;</label>
                  <div className="d-grid">
                    <button className="btn btn-primary">
                      <i className="bi bi-search me-2"></i>
                      Tạo báo cáo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Biểu đồ thống kê</h5>
            </div>
            <div className="card-body">
              <StatisticsChart />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">2,450,000,000</h4>
                  <p className="mb-0">Tổng doanh thu</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-currency-dollar fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">156</h4>
                  <p className="mb-0">Đơn hàng</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-cart-check fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">1,234</h4>
                  <p className="mb-0">Sản phẩm</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-box-seam fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">89</h4>
                  <p className="mb-0">Khách hàng</p>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-people fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Top sản phẩm bán chạy</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">iPhone 15 Pro</h6>
                    <small className="text-muted">SKU: IP001</small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">45 đơn</div>
                    <small className="text-muted">1,350,000,000 VNĐ</small>
                  </div>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Laptop Dell XPS 13</h6>
                    <small className="text-muted">SKU: LP001</small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">32 đơn</div>
                    <small className="text-muted">800,000,000 VNĐ</small>
                  </div>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Samsung Galaxy S24</h6>
                    <small className="text-muted">SKU: SG001</small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">28 đơn</div>
                    <small className="text-muted">616,000,000 VNĐ</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Sản phẩm sắp hết hàng</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">MacBook Pro M3</h6>
                    <small className="text-muted">SKU: MB001</small>
                  </div>
                  <span className="badge bg-danger">2 sản phẩm</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">iPad Air 5</h6>
                    <small className="text-muted">SKU: IP002</small>
                  </div>
                  <span className="badge bg-warning">5 sản phẩm</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">AirPods Pro 2</h6>
                    <small className="text-muted">SKU: AP001</small>
                  </div>
                  <span className="badge bg-warning">3 sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportManagement;
