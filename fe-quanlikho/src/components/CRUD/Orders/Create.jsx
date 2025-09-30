import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Button from "../../Common/Button";
import Input from "../../Common/Input";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    items: [],
    totalAmount: 0,
    status: "pending",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  // Mock products
  const products = [
    { id: 1, name: "Laptop Dell XPS 13", price: 25000000, stock: 15 },
    { id: 2, name: "iPhone 15 Pro", price: 30000000, stock: 8 },
    { id: 3, name: "Samsung Galaxy S24", price: 22000000, stock: 12 }
  ];

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

  const addProduct = (product) => {
    const existingItem = formData.items.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setFormData(prev => ({
          ...prev,
          items: prev.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { ...product, quantity: 1 }]
      }));
    }
    
    calculateTotal();
  };

  const removeProduct = (productId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== productId)
    }));
    calculateTotal();
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (quantity > product.stock) {
      alert(`Số lượng không được vượt quá ${product.stock}`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      )
    }));
    calculateTotal();
  };

  const calculateTotal = () => {
    const total = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setFormData(prev => ({
      ...prev,
      totalAmount: total
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Tên khách hàng là bắt buộc";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email khách hàng là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Email không hợp lệ";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Số điện thoại là bắt buộc";
    }

    if (formData.items.length === 0) {
      newErrors.items = "Đơn hàng phải có ít nhất 1 sản phẩm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: API call to create order
      console.log("Creating order:", formData);
      alert("Đơn hàng đã được tạo thành công!");
      navigate("/dashboard/orders");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/orders");
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Tạo đơn hàng mới</h2>
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

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8">
            {/* Customer Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">Thông tin khách hàng</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <Input
                      label="Tên khách hàng"
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      error={errors.customerName}
                      placeholder="Nhập tên khách hàng"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Email"
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      error={errors.customerEmail}
                      placeholder="Nhập email khách hàng"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Số điện thoại"
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      error={errors.customerPhone}
                      placeholder="Nhập số điện thoại"
                      required
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
                      <option value="pending">Chờ xác nhận</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="completed">Hoàn thành</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Ghi chú</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Nhập ghi chú cho đơn hàng..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Selection */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Chọn sản phẩm</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {products.map(product => (
                    <div key={product.id} className="col-md-6">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="card-title">{product.name}</h6>
                          <p className="card-text">
                            <span className="fw-bold text-success">
                              {product.price.toLocaleString('vi-VN')} VNĐ
                            </span>
                            <br />
                            <small className="text-muted">
                              Tồn kho: {product.stock} sản phẩm
                            </small>
                          </p>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => addProduct(product)}
                          >
                            <i className="bi bi-plus-circle me-1"></i>
                            Thêm vào đơn
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Order Summary */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Tóm tắt đơn hàng</h5>
              </div>
              <div className="card-body">
                {formData.items.length === 0 ? (
                  <p className="text-muted text-center">Chưa có sản phẩm nào</p>
                ) : (
                  <>
                    <div className="list-group list-group-flush">
                      {formData.items.map(item => (
                        <div key={item.id} className="list-group-item px-0">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{item.name}</h6>
                              <small className="text-muted">
                                {item.price.toLocaleString('vi-VN')} VNĐ
                              </small>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                style={{ width: "60px" }}
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                min="1"
                                max={item.stock}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeProduct(item.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Tổng cộng:</h5>
                      <h5 className="mb-0 text-success">
                        {formData.totalAmount.toLocaleString('vi-VN')} VNĐ
                      </h5>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="card mt-3">
              <div className="card-body">
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Tạo đơn hàng
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
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default CreateOrder;
