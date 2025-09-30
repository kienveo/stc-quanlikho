import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard/overview",
      icon: "bi bi-graph-up",
      label: "Tổng quan",
      active: location.pathname.includes("/overview"),
    },
    {
      path: "/dashboard/products",
      icon: "bi bi-box-seam",
      label: "Sản phẩm",
      active: location.pathname.includes("/products"),
    },
    {
      path: "/dashboard/categories",
      icon: "bi bi-tags",
      label: "Danh mục",
      active: location.pathname.includes("/categories"),
    },
    {
      path: "/dashboard/orders",
      icon: "bi bi-cart-check",
      label: "Đơn hàng",
      active: location.pathname.includes("/orders"),
    },
    {
      path: "/dashboard/users",
      icon: "bi bi-person",
      label: "Người dùng",
      active: location.pathname.includes("/users"),
    },
    {
      path: "/dashboard/reports",
      icon: "bi bi-file-earmark-bar-graph",
      label: "Báo cáo",
      active: location.pathname.includes("/reports"),
    },
  ];

  return (
    <div
      className="sidebar bg-white border-end"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      {/* Sidebar Header */}
      <div
        className="sidebar-header p-3 border-bottom position-relative"
        style={{
          background:
            "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(194, 241, 255) 100%)",
          borderBottom: "none !important",
        }}
      >
        <Link
          to="/dashboard/overview"
          className="text-decoration-none"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="flex-grow-1 text-center">
            <h5
              className="fw-bold mb-0"
              style={{
                fontSize: "18px",
                letterSpacing: "-0.5px",
                color: "#1e40af",
              }}
            >
              Quản lý kho
            </h5>
            <p className="mb-0" style={{ fontSize: "12px", color: "#3b82f6" }}>
              Inventory System
            </p>
          </div>
        </Link>
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        <nav>
          <ul className="list-unstyled m-0">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`d-flex align-items-center py-3 px-4 text-decoration-none transition-all ${
                    item.active
                      ? "bg-primary text-white"
                      : "text-muted hover-bg-light"
                  }`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: item.active ? "600" : "500",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    display: "block",
                    width: "100%",
                  }}
                >
                  <i
                    className={`${item.icon} me-3`}
                    style={{ fontSize: "18px" }}
                  ></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar Footer
      <div className="sidebar-footer mt-auto p-3 border-top">
        <div className="d-flex align-items-center">
          <div
            className="avatar bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="bi bi-person text-muted"></i>
          </div>
          <div>
            <div className="fw-semibold" style={{ fontSize: "14px" }}>
              Admin User
            </div>
            <small className="text-muted">Building Manager</small>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
