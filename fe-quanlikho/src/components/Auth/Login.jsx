import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { showToast } from "../Common/Toast";
import axiosInstance from "../../api/axiosInstance";
import { mockAuth } from "../../utils/mockAuth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);

  // Check backend status on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const isAvailable = await mockAuth.checkBackendStatus();
      setIsBackendAvailable(isAvailable);
      setIsCheckingBackend(false);
    };
    checkBackend();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Email or Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      let result;
      
      if (isBackendAvailable) {
        // Use real API
        const response = await axiosInstance.post("/api/v1/un_auth/signin", {
          username: formData.username,
          password: formData.password,
        });
        result = response.data;
      } else {
        // Use mock auth
        result = await mockAuth.login({
          username: formData.username,
          password: formData.password,
        });
      }

      if (result.status === 200) {
        // Success
        showToast(result.message || "Login successful!", {
          type: "success",
        });
        // Save token, refreshToken and expired time
        localStorage.setItem("authToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        if (result.data.expiresIn) {
          const expiredAt = Date.now() + result.data.expiresIn * 1000;
          localStorage.setItem("tokenExpiredAt", expiredAt.toString());
        }
        // Also save user data
        if (result.data.user) {
          localStorage.setItem("authUser", JSON.stringify(result.data.user));
        }
        // Redirect
        navigate("/dashboard/overview", { replace: true });
      } else if (result.status === 400 && Array.isArray(result.data)) {
        // Validation error
        const fieldErrors = {};
        result.data.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
        showToast(result.message || "Validation error!", { type: "error" });
      } else {
        // Other error
        setErrors({ general: result.message || "Login failed." });
        showToast(result.message || "Login failed!", { type: "error" });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const result = error.response.data;
        if (result.status === 401 && result.message === "Need to verify") {
          showToast(result.message || "You need to verify your account!", {
            type: "warning",
          });
          navigate("/verify-otp", { state: { email: formData.username } });
        } else if (result.status === 400 && Array.isArray(result.data)) {
          // Validation error
          const fieldErrors = {};
          result.data.forEach((err) => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
          showToast(result.message || "Validation error!", { type: "error" });
        } else {
          setErrors({ general: result.message || "Login failed." });
          showToast(result.message || "Login failed!", { type: "error" });
        }
      } else {
        setErrors({ general: "Unable to connect to server." });
        showToast("Unable to connect to server!", { type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark mb-2">Xin chào</h2>
        <p className="text-muted">Chào mừng trở lại hệ thống quản lý kho</p>
      </div>

      <form onSubmit={handleSubmit}>
        {isCheckingBackend && (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-hourglass-split me-2"></i>
            Đang kiểm tra kết nối backend...
          </div>
        )}
        
        {!isCheckingBackend && !isBackendAvailable && (
          <div className="alert alert-warning" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            <strong>Chế độ Demo:</strong> Backend không khả dụng, đang sử dụng dữ liệu mock.
            <br />
            <small>Tài khoản demo: admin@demo.com / admin123</small>
          </div>
        )}
        
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}

        <Input
          type="text"
          name="username"
          placeholder="Email hoặc tên đăng nhập"
          value={formData.username}
          onChange={handleChange}
          icon="bi bi-envelope"
          error={errors.username}
        />

        <Input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          icon="bi bi-lock"
          error={errors.password}
        />

        <div className="d-grid mb-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="py-3 fw-semibold"
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </div>

        <div className="text-center mb-3">
          <Link
            to="/forgot-password"
            className="text-decoration-none text-muted"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <div className="text-center">
          <span className="text-muted">Chưa có tài khoản? </span>
          <Link
            to="/register"
            className="text-primary text-decoration-none fw-semibold"
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
