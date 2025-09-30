import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import DataTable from "../Common/DataTable";
import SearchForm from "../Common/SearchForm";
import Button from "../Common/Button";
import axiosInstance from "../../api/axiosInstance";
import { isAuthenticated } from "../../utils/authUtils";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load products and categories
  useEffect(() => {
    if (isAuthenticated()) {
      loadProducts();
      loadCategories();
    }
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/un_auth/product/product_list");
      if (response.data && response.data.status === 200) {
        setProducts(response.data.data || []);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/un_auth/category/all");
      if (response.data && response.data.status === 200) {
        setCategories(response.data.data || []);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const columns = [
    {
      key: "productName",
      label: "Tên sản phẩm",
      render: (value, row) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-muted">ID: {row.productId}</small>
        </div>
      )
    },
    {
      key: "categoryName",
      label: "Danh mục"
    },
    {
      key: "price",
      label: "Giá",
      render: (value) => `${value?.toLocaleString('vi-VN') || 0} VNĐ`
    },
    {
      key: "quantity",
      label: "Tồn kho",
      render: (value) => (
        <span className={`badge ${value < 10 ? 'bg-warning' : 'bg-success'}`}>
          {value || 0} sản phẩm
        </span>
      )
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (value) => (
        <span className={`badge ${value === 1 ? 'bg-success' : 'bg-secondary'}`}>
          {value === 1 ? 'Hoạt động' : 'Ngừng bán'}
        </span>
      )
    },
    {
      key: "actions",
      label: "Thao tác",
      render: (value, row) => (
        <div className="d-flex gap-2">
          <Link
            to={`/dashboard/products/view/${row.productId}`}
            className="btn btn-sm btn-outline-primary"
          >
            <i className="bi bi-eye"></i>
          </Link>
          <button className="btn btn-sm btn-outline-warning">
            <i className="bi bi-pencil"></i>
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDeleteProduct(row.productId)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  ];

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await axiosInstance.delete(`/api/v1/un_auth/product/delete/${productId}`);
        if (response.data && response.data.status === 200) {
          alert("Xóa sản phẩm thành công!");
          loadProducts();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Có lỗi xảy ra khi xóa sản phẩm!");
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productId?.toString().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Quản lý sản phẩm</h2>
            <Link to="/dashboard/products/create" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Thêm sản phẩm
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
                    placeholder="Tìm theo tên sản phẩm hoặc SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Danh mục</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Tất cả danh mục</option>
                    {categories.map(category => (
                      <option key={category.categoryId} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
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

      {/* Products Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                Danh sách sản phẩm ({filteredProducts.length})
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
                  data={filteredProducts}
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

export default ProductManagement;
