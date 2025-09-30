import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import OTPVerification from "./components/Auth/OTPVerification";
import { 
  ProductManagement,
  CategoryManagement,
  OrderManagement,
  UserManagement,
  ReportManagement,
  OverviewDashboard
} from "./components/Management";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Toast from "./components/Common/Toast";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CreateProduct from "./components/CRUD/Products/Create";
import ViewProduct from "./components/CRUD/Products/View";
import CreateCategory from "./components/CRUD/Categories/Create";
import ViewCategory from "./components/CRUD/Categories/View";
import CreateOrder from "./components/CRUD/Orders/Create";
import ViewOrder from "./components/CRUD/Orders/View";
import CreateUser from "./components/CRUD/Users/Create";
import ViewUser from "./components/CRUD/Users/View";
import Demo from "./pages/Demo";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Toast />
        <Routes>
          {/* Auth Routes - Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Demo Route - Public */}
          <Route path="/demo" element={<Demo />} />

          {/* Dashboard Routes - Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard/overview" replace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/overview"
            element={
              <ProtectedRoute>
                <OverviewDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/products"
            element={
              <ProtectedRoute>
                <ProductManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categories"
            element={
              <ProtectedRoute>
                <CategoryManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/orders"
            element={
              <ProtectedRoute>
                <OrderManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/reports"
            element={
              <ProtectedRoute>
                <ReportManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/products/create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/products/view/:id"
            element={
              <ProtectedRoute>
                <ViewProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categories/create"
            element={
              <ProtectedRoute>
                <CreateCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/categories/view/:id"
            element={
              <ProtectedRoute>
                <ViewCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/orders/create"
            element={
              <ProtectedRoute>
                <CreateOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/orders/view/:id"
            element={
              <ProtectedRoute>
                <ViewOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/users/create"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/users/view/:id"
            element={
              <ProtectedRoute>
                <ViewUser />
              </ProtectedRoute>
            }
          />

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
