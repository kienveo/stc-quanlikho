import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Button from "../../Common/Button";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const product = {
    id: parseInt(id),
    name: "Laptop Dell XPS 13",
    sku: "LP001",
    category: "Laptop",
    price: 25000000,
    stock: 15,
    status: "active",
    description: "Laptop Dell XPS 13 với hiệu năng mạnh mẽ, thiết kế sang trọng và màn hình 13.4 inch 4K. Phù hợp cho công việc và giải trí.",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20"
  };

  const handleEdit = () => {
    // TODO: Navigate to edit page
    console.log("Edit product:", product.id);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      // TODO: API call to delete product
      console.log("Delete product:", product.id);
      alert("Sản phẩm đã được xóa thành công!");
      navigate("/dashboard/products");
    }
  };

  const handleBack = () => {
    navigate("/dashboard/products");
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Chi tiết sản phẩm</h2>
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
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông tin cơ bản</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tên sản phẩm</label>
                  <div className="form-control-plaintext">{product.name}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">SKU</label>
                  <div className="form-control-plaintext">{product.sku}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Danh mục</label>
                  <div className="form-control-plaintext">
                    <span className="badge bg-primary">{product.category}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Trạng thái</label>
                  <div className="form-control-plaintext">
                    <span className={`badge ${product.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {product.status === 'active' ? 'Hoạt động' : 'Ngừng bán'}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Giá sản phẩm</label>
                  <div className="form-control-plaintext">
                    <span className="fw-bold text-success">
                      {product.price.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Số lượng tồn kho</label>
                  <div className="form-control-plaintext">
                    <span className={`badge ${product.stock < 10 ? 'bg-warning' : 'bg-success'}`}>
                      {product.stock} sản phẩm
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Mô tả sản phẩm</label>
                  <div className="form-control-plaintext">
                    {product.description || "Chưa có mô tả"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông tin bổ sung</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold">Ngày tạo</label>
                  <div className="form-control-plaintext">
                    <i className="bi bi-calendar3 me-2"></i>
                    {new Date(product.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Cập nhật lần cuối</label>
                  <div className="form-control-plaintext">
                    <i className="bi bi-clock me-2"></i>
                    {new Date(product.updatedAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Thao tác nhanh</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate(`/dashboard/orders/create?product=${product.id}`)}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Tạo đơn hàng
                </Button>
                <Button
                  variant="outline-info"
                  onClick={() => console.log("Update stock")}
                >
                  <i className="bi bi-box-arrow-in-down me-2"></i>
                  Cập nhật tồn kho
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

export default ViewProduct;
