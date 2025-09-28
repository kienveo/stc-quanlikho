# API Integration Guide

## Cấu hình Backend

### 1. Environment Variables
Tạo file `.env.local` trong thư mục gốc:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_APP_ENV=development
```

### 2. API Endpoints cần thiết

#### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/profile` - Lấy thông tin user
- `POST /api/auth/refresh` - Refresh token

#### User Management
- `GET /api/users` - Lấy danh sách users
- `GET /api/users/:id` - Lấy user theo ID
- `POST /api/users` - Tạo user mới
- `PUT /api/users/:id` - Cập nhật user
- `DELETE /api/users/:id` - Xóa user

#### Product Management
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy sản phẩm theo ID
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

#### Order Management
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy đơn hàng theo ID
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

#### Reports
- `GET /api/reports/dashboard` - Thống kê dashboard
- `GET /api/reports/sales` - Báo cáo bán hàng
- `GET /api/reports/inventory` - Báo cáo tồn kho
- `GET /api/reports/user-activity` - Báo cáo hoạt động user

### 3. Response Format

#### Login Response
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "Admin"
    }
  }
}
```

#### Dashboard Stats Response
```json
{
  "success": true,
  "data": {
    "stats": [
      {
        "title": "Tổng sản phẩm",
        "value": 1234,
        "icon": "ShoppingOutlined",
        "color": "#1890ff"
      }
    ],
    "recentOrders": [
      {
        "key": "1",
        "orderId": "ORD-001",
        "customer": "Nguyễn Văn A",
        "amount": 1500000,
        "status": "Đã giao",
        "date": "2024-01-15"
      }
    ]
  }
}
```

### 4. Error Response Format
```json
{
  "success": false,
  "message": "Thông báo lỗi",
  "error": "Chi tiết lỗi"
}
```

## Cách sử dụng

### 1. Khi Backend chưa sẵn sàng
- Ứng dụng sẽ tự động fallback về chế độ demo
- Sử dụng tài khoản demo để test

### 2. Khi Backend đã sẵn sàng
- Cập nhật `VITE_API_BASE_URL` trong `.env.local`
- Ứng dụng sẽ tự động kết nối với API thực tế

### 3. Testing
- Chạy `npm run dev` để test với API
- Kiểm tra console để xem log API calls
- Sử dụng Network tab trong DevTools để debug

## Lưu ý
- API interceptor sẽ tự động xử lý lỗi và hiển thị thông báo
- Token sẽ được tự động thêm vào header Authorization
- Khi token hết hạn, user sẽ được redirect về trang login
- Tất cả API calls đều có timeout và error handling
