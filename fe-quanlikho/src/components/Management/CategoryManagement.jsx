import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import DataTable from "../Common/DataTable";
import axiosInstance from "../../api/axiosInstance";
import { isAuthenticated } from "../../utils/authUtils";

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load categories
  useEffect(() => {
    if (isAuthenticated()) {
      loadCategories();
    }
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/un_auth/category/all");
      if (response.data && response.data.status === 200) {
        setCategories(response.data.data || []);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      key: "categoryName",
      label: "Tên danh mục",
      render: (value) => (
        <div className="fw-semibold">{value}</div>
      )
    },
    {
      key: "description",
      label: "Mô tả"
    },
    {
      key: "productCount",
      label: "Số sản phẩm",
      render: (value) => (
        <span className="badge bg-info">{value || 0} sản phẩm</span>
      )
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (value) => (
        <span className={`badge ${value === 1 ? 'bg-success' : 'bg-secondary'}`}>
          {value === 1 ? 'Hoạt động' : 'Ngừng hoạt động'}
        </span>
      )
    },
    {
      key: "actions",
      label: "Thao tác",
      render: (value, row) => (
        <div className="d-flex gap-2">
          <Link
            to={`/dashboard/categories/view/${row.categoryId}`}
            className="btn btn-sm btn-outline-primary"
          >
            <i className="bi bi-eye"></i>
          </Link>
          <button className="btn btn-sm btn-outline-warning">
            <i className="bi bi-pencil"></i>
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDeleteCategory(row.categoryId)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  ];

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        const response = await axiosInstance.delete(`/api/v1/un_auth/category/delete/${categoryId}`);
        if (response.data && response.data.status === 200) {
          alert("Xóa danh mục thành công!");
          loadCategories();
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Có lỗi xảy ra khi xóa danh mục!");
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Quản lý danh mục</h2>
            <Link to="/dashboard/categories/create" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Thêm danh mục
            </Link>
          </div>
        </div>
      </div>

      {/* Search */}
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
                    placeholder="Tìm theo tên danh mục hoặc mô tả..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                Danh sách danh mục ({filteredCategories.length})
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
                  data={filteredCategories}
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

export default CategoryManagement;
