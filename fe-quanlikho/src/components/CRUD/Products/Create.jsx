import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Button from "../../Common/Button";
import Input from "../../Common/Input";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
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
      newErrors.name = "Tên sản phẩm là bắt buộc";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU là bắt buộc";
    }

    if (!formData.category) {
      newErrors.category = "Danh mục là bắt buộc";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Giá sản phẩm phải lớn hơn 0";
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = "Số lượng tồn kho không được âm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: API call to create product
      console.log("Creating product:", formData);
      alert("Sản phẩm đã được tạo thành công!");
      navigate("/dashboard/products");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/products");
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Thêm sản phẩm mới</h2>
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
              <h5 className="card-title mb-0">Thông tin sản phẩm</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Input
                      label="Tên sản phẩm"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="Nhập tên sản phẩm"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="SKU"
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      error={errors.sku}
                      placeholder="Nhập mã SKU"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Danh mục</label>
                    <select
                      className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Smartphone">Smartphone</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Accessories">Phụ kiện</option>
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
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
                      <option value="inactive">Ngừng bán</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Giá sản phẩm (VNĐ)"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      error={errors.price}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Số lượng tồn kho"
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      error={errors.stock}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Mô tả sản phẩm</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Nhập mô tả sản phẩm..."
                    />
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
                        Tạo sản phẩm
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
                  Lưu ý khi tạo sản phẩm
                </h6>
                <ul className="mb-0 small">
                  <li>SKU phải là duy nhất trong hệ thống</li>
                  <li>Giá sản phẩm phải lớn hơn 0</li>
                  <li>Số lượng tồn kho không được âm</li>
                  <li>Mô tả sản phẩm giúp khách hàng hiểu rõ hơn</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateProduct;
