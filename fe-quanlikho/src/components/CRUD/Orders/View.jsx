import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Button from "../../Common/Button";

const ViewOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const order = {
    id: parseInt(id),
    orderNumber: "ORD001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@email.com",
    customerPhone: "0123456789",
    totalAmount: 25000000,
    status: "completed",
    orderDate: "2024-01-15",
    items: [
      {
        id: 1,
        name: "Laptop Dell XPS 13",
        price: 25000000,
        quantity: 1,
        total: 25000000
      }
    ],
    notes: "Giao hàng trong giờ hành chính"
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-warning", text: "Chờ xác nhận" },
      processing: { class: "bg-info", text: "Đang xử lý" },
      completed: { class: "bg-success", text: "Hoàn thành" },
      cancelled: { class: "bg-danger", text: "Đã hủy" }
    };
    const config = statusConfig[status] || { class: "bg-secondary", text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const handleEdit = () => {
    // TODO: Navigate to edit page
    console.log("Edit order:", order.id);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      // TODO: API call to delete order
      console.log("Delete order:", order.id);
      alert("Đơn hàng đã được xóa thành công!");
      navigate("/dashboard/orders");
    }
  };

  const handleBack = () => {
    navigate("/dashboard/orders");
  };

  const handleStatusChange = (newStatus) => {
    if (window.confirm(`Bạn có chắc chắn muốn thay đổi trạng thái thành "${newStatus}"?`)) {
      // TODO: API call to update status
      console.log("Update order status:", order.id, newStatus);
      alert("Trạng thái đã được cập nhật thành công!");
    }
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Chi tiết đơn hàng</h2>
            <div className="d-flex gap-2">
              <Button
                variant="outline-warning"
                onClick={handleEdit}
              >
                <i className="bi bi-pencil me-2"></i>
                Chỉnh sửa
              </Button>
              <Button
                variant="outline-danger"
                onClick={handleDelete}
              >
                <i className="bi bi-trash me-2"></i>
                Xóa
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleBack}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Order Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông tin đơn hàng</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Mã đơn hàng</label>
                  <div className="form-control-plaintext">{order.orderNumber}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Ngày đặt hàng</label>
                  <div className="form-control-plaintext">
                    <i className="bi bi-calendar3 me-2"></i>
                    {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Trạng thái</label>
                  <div className="form-control-plaintext">
                    {getStatusBadge(order.status)}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tổng tiền</label>
                  <div className="form-control-plaintext">
                    <span className="fw-bold text-success fs-5">
                      {order.totalAmount.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                </div>
                {order.notes && (
                  <div className="col-12">
                    <label className="form-label fw-semibold">Ghi chú</label>
                    <div className="form-control-plaintext">{order.notes}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông tin khách hàng</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tên khách hàng</label>
                  <div className="form-control-plaintext">{order.customerName}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="form-control-plaintext">{order.customerEmail}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Số điện thoại</label>
                  <div className="form-control-plaintext">{order.customerPhone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Sản phẩm trong đơn hàng</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="fw-semibold">{item.name}</div>
                        </td>
                        <td>{item.price.toLocaleString('vi-VN')} VNĐ</td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="fw-bold">
                          {item.total.toLocaleString('vi-VN')} VNĐ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <th colSpan="3">Tổng cộng:</th>
                      <th className="text-success">
                        {order.totalAmount.toLocaleString('vi-VN')} VNĐ
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Status Actions */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Thay đổi trạng thái</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                {order.status === 'pending' && (
                  <Button
                    variant="outline-success"
                    onClick={() => handleStatusChange('processing')}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Xác nhận đơn hàng
                  </Button>
                )}
                {order.status === 'processing' && (
                  <Button
                    variant="outline-success"
                    onClick={() => handleStatusChange('completed')}
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Hoàn thành
                  </Button>
                )}
                {(order.status === 'pending' || order.status === 'processing') && (
                  <Button
                    variant="outline-danger"
                    onClick={() => handleStatusChange('cancelled')}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Hủy đơn hàng
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Thao tác nhanh</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  onClick={() => console.log("Print invoice")}
                >
                  <i className="bi bi-printer me-2"></i>
                  In hóa đơn
                </Button>
                <Button
                  variant="outline-info"
                  onClick={() => console.log("Send email")}
                >
                  <i className="bi bi-envelope me-2"></i>
                  Gửi email
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => console.log("View history")}
                >
                  <i className="bi bi-clock-history me-2"></i>
                  Lịch sử thay đổi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewOrder;
