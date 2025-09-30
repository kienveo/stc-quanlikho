import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import DataTable from "../Common/DataTable";
import axiosInstance from "../../api/axiosInstance";
import { isAuthenticated } from "../../utils/authUtils";

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load orders
  useEffect(() => {
    if (isAuthenticated()) {
      loadOrders();
    }
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/un_auth/product_order/product_order_list");
      if (response.data && response.data.status === 200) {
        setOrders(response.data.data || []);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      0: { class: "bg-warning", text: "Chờ xác nhận" },
      1: { class: "bg-info", text: "Đang xử lý" },
      2: { class: "bg-success", text: "Hoàn thành" },
      3: { class: "bg-danger", text: "Đã hủy" }
    };
    const config = statusConfig[status] || { class: "bg-secondary", text: "Không xác định" };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const columns = [
    {
      key: "trackingNumber",
      label: "Mã đơn hàng",
      render: (value, row) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-muted">{row.orderDate}</small>
        </div>
      )
    },
    {
      key: "customerName",
      label: "Khách hàng",
      render: (value, row) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-muted">{row.customerEmail}</small>
        </div>
      )
    },
    {
      key: "items",
      label: "Số sản phẩm",
      render: (value) => (
        <span className="badge bg-light text-dark">{value || 0} sản phẩm</span>
      )
    },
    {
      key: "totalAmount",
      label: "Tổng tiền",
      render: (value) => `${value?.toLocaleString('vi-VN') || 0} VNĐ`
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (value) => getStatusBadge(value)
    },
    {
      key: "actions",
      label: "Thao tác",
      render: (value, row) => (
        <div className="d-flex gap-2">
          <Link
            to={`/dashboard/orders/view/${row.productOrderId}`}
            className="btn btn-sm btn-outline-primary"
          >
            <i className="bi bi-eye"></i>
          </Link>
          {row.status === 0 && (
            <button className="btn btn-sm btn-outline-success">
              <i className="bi bi-check"></i>
            </button>
          )}
          {row.status !== 2 && row.status !== 3 && (
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDeleteOrder(row.productOrderId)}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      )
    }
  ];

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        const response = await axiosInstance.delete(`/api/v1/un_auth/product_order/delete/${orderId}`);
        if (response.data && response.data.status === 200) {
          alert("Xóa đơn hàng thành công!");
          loadOrders();
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Có lỗi xảy ra khi xóa đơn hàng!");
      }
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || order.status?.toString() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Quản lý đơn hàng</h2>
            <Link to="/dashboard/orders/create" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Tạo đơn hàng
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Tìm kiếm</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm theo mã đơn hàng, tên khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Trạng thái</label>
                  <select
                    className="form-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="">Tất cả trạng thái</option>
                    <option value="0">Chờ xác nhận</option>
                    <option value="1">Đang xử lý</option>
                    <option value="2">Hoàn thành</option>
                    <option value="3">Đã hủy</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">&nbsp;</label>
                  <div className="d-grid">
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-funnel"></i> Lọc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                Danh sách đơn hàng ({filteredOrders.length})
              </h5>
            </div>
            <div className="card-body p-0">
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
                </div>
              ) : (
                <DataTable
                  data={filteredOrders}
                  columns={columns}
                  searchable={false}
                  pagination={true}
                  itemsPerPage={10}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderManagement;
