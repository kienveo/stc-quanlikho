import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Button from "../../Common/Button";
import Input from "../../Common/Input";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên danh mục là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: API call to create category
      console.log("Creating category:", formData);
      alert("Danh mục đã được tạo thành công!");
      navigate("/dashboard/categories");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/categories");
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Thêm danh mục mới</h2>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Quay lại
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông tin danh mục</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <Input
                      label="Tên danh mục"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Nhập tên danh mục"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Nhập mô tả danh mục..."
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Trạng thái</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Ngừng hoạt động</option>
                    </select>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        Tạo danh mục
                      </Button>
                      <Button
                        type="button"
                        variant="outline-secondary"
                        size="lg"
                        onClick={handleCancel}
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Hủy
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Hướng dẫn</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <h6 className="alert-heading">
                  <i className="bi bi-info-circle me-2"></i>
                  Lưu ý khi tạo danh mục
                </h6>
                <ul className="mb-0 small">
                  <li>Tên danh mục phải là duy nhất</li>
                  <li>Mô tả giúp người dùng hiểu rõ hơn về danh mục</li>
                  <li>Danh mục ngừng hoạt động sẽ không hiển thị khi tạo sản phẩm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCategory;
