# Debug Đăng Nhập Tài Khoản Demo

## Vấn Đề Hiện Tại
Tài khoản demo không đăng nhập được.

## Các Bước Debug

### 1. Kiểm Tra Backend API
Đảm bảo backend API đang chạy trên `http://localhost:8080`:
```bash
# Kiểm tra API có hoạt động không
curl http://localhost:8080/api/v1/un_auth/signin
```

### 2. Sử Dụng Tool Test Đăng Nhập
1. Truy cập: `http://localhost:5174/demo`
2. Chọn tab "Test Đăng Nhập"
3. Nhấn "Test Tất Cả Tài Khoản Demo"
4. Xem kết quả chi tiết

### 3. Kiểm Tra Console Browser
Mở Developer Tools (F12) và xem tab Console để thấy lỗi chi tiết.

### 4. Kiểm Tra Network Tab
Trong Developer Tools, xem tab Network để kiểm tra:
- API calls có được gửi không
- Response status code
- Response data

## Các Nguyên Nhân Có Thể

### 1. Backend API Không Chạy
- **Triệu chứng**: Network error, connection refused
- **Giải pháp**: Start backend server

### 2. Tài Khoản Demo Chưa Được Tạo
- **Triệu chứng**: 401 Unauthorized, user not found
- **Giải pháp**: Tạo tài khoản demo trước

### 3. Sai Endpoint API
- **Triệu chứng**: 404 Not Found
- **Giải pháp**: Kiểm tra URL API trong config

### 4. Sai Format Dữ Liệu
- **Triệu chứng**: 400 Bad Request
- **Giải pháp**: Kiểm tra payload gửi đi

### 5. CORS Issues
- **Triệu chứng**: CORS error trong console
- **Giải pháp**: Cấu hình CORS trong backend

## Cách Test Thủ Công

### 1. Test Tạo Tài Khoản
```javascript
// Mở Console trong browser và chạy:
fetch('http://localhost:8080/api/v1/un_auth/signup/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'test_user',
    email: 'test@demo.com',
    password: 'test123',
    confirmPassword: 'test123'
  })
})
.then(res => res.json())
.then(data => console.log('Create result:', data))
.catch(err => console.error('Create error:', err));
```

### 2. Test Đăng Nhập
```javascript
// Mở Console trong browser và chạy:
fetch('http://localhost:8080/api/v1/un_auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'test@demo.com',
    password: 'test123'
  })
})
.then(res => res.json())
.then(data => console.log('Login result:', data))
.catch(err => console.error('Login error:', err));
```

## Thông Tin Tài Khoản Demo

| Email | Password | Role |
|-------|----------|------|
| admin@demo.com | admin123 | Admin |
| manager@demo.com | manager123 | Manager |
| staff@demo.com | staff123 | Staff |
| viewer@demo.com | viewer123 | Viewer |

## Lưu Ý Quan Trọng

1. **Backend phải chạy** trước khi test frontend
2. **Tạo tài khoản demo** trước khi test đăng nhập
3. **Kiểm tra console** để xem lỗi chi tiết
4. **Test từng bước** để xác định nguyên nhân

## Liên Hệ Hỗ Trợ

Nếu vẫn gặp vấn đề, hãy:
1. Chụp màn hình lỗi
2. Copy log từ console
3. Mô tả các bước đã thực hiện
