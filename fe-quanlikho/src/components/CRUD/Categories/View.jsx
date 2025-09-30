import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Button from "../../Common/Button";

const ViewCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const category = {
    id: parseInt(id),
    name: "Laptop",
    description: "Máy tính xách tay với hiệu năng cao, phù hợp cho công việc và giải trí",
    productCount: 25,
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20"
  };

  const handleEdit = () => {
    // TODO: Navigate to edit page
    console.log("Edit category:", category.id);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      // TODO: API call to delete category
      console.log("Delete category:", category.id);
      alert("Danh mục đã được xóa thành công!");
      navigate("/dashboard/categories");
    }
  };

  const handleBack = () => {
    navigate("/dashboard/categories");
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Chi tiết danh mục</h2>
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
                <div className="col-12">
                  <label className="form-label fw-semibold">Tên danh mục</label>
                  <div className="form-control-plaintext">
                    <span className="badge bg-primary fs-6">{category.name}</span>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Mô tả</label>
                  <div className="form-control-plaintext">
                    {category.description || "Chưa có mô tả"}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Số sản phẩm</label>
                  <div className="form-control-plaintext">
                    <span className="badge bg-info fs-6">{category.productCount} sản phẩm</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Trạng thái</label>
                  <div className="form-control-plaintext">
                    <span className={`badge ${category.status === 'active' ? 'bg-success' : 'bg-secondary'} fs-6`}>
                      {category.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </span>
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
                    {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Cập nhật lần cuối</label>
                  <div className="form-control-plaintext">
                    <i className="bi bi-clock me-2"></i>
                    {new Date(category.updatedAt).toLocaleDateString('vi-VN')}
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
                  onClick={() => navigate(`/dashboard/products/create?category=${category.id}`)}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Thêm sản phẩm
                </Button>
                <Button
                  variant="outline-info"
                  onClick={() => navigate(`/dashboard/products?category=${category.name}`)}
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Xem sản phẩm
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => console.log("View statistics")}
                >
                  <i className="bi bi-graph-up me-2"></i>
                  Thống kê
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewCategory;
