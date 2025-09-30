# Debug Mock Authentication

## Vấn Đề Hiện Tại
Dữ liệu mock vẫn không thể đăng nhập được.

## Các Bước Debug

### 1. Truy Cập Debug Tool
1. Mở trình duyệt và đi đến: `http://localhost:5174/demo`
2. Chọn tab "Debug Mock Auth"
3. Nhấn "Test Tất Cả Tài Khoản Mock"

### 2. Kiểm Tra Console Log
1. Mở Developer Tools (F12)
2. Chọn tab Console
3. Xem log chi tiết khi test

### 3. Test Thủ Công
Sử dụng các nút "Test nhanh" để test từng tài khoản:
- `admin@demo.com` / `admin123`
- `admin_demo` / `admin123`
- `manager@demo.com` / `manager123`
- `manager_demo` / `manager123`

## Các Nguyên Nhân Có Thể

### 1. Lỗi Logic Tìm Kiếm Tài Khoản
- **Triệu chứng**: Tất cả tài khoản đều fail
- **Nguyên nhân**: Logic tìm kiếm trong mockAuth.js sai
- **Giải pháp**: Kiểm tra console log để xem username/password được truyền

### 2. Lỗi Import/Export
- **Triệu chứng**: Lỗi "mockAuth is not defined"
- **Nguyên nhân**: Import không đúng
- **Giải pháp**: Kiểm tra import path

### 3. Lỗi Async/Await
- **Triệu chứng**: Promise không resolve
- **Nguyên nhân**: Xử lý async không đúng
- **Giải pháp**: Kiểm tra console log

### 4. Lỗi State Management
- **Triệu chứng**: Component không re-render
- **Nguyên nhân**: State không được update
- **Giải pháp**: Kiểm tra setState calls

## Test Code Trực Tiếp

### 1. Test Mock Auth Trực Tiếp
```javascript
// Mở Console trong browser và chạy:
import { mockAuth } from './src/utils/mockAuth.js';

// Test login
mockAuth.login({ username: 'admin@demo.com', password: 'admin123' })
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

### 2. Test Backend Status
```javascript
// Mở Console trong browser và chạy:
import { mockAuth } from './src/utils/mockAuth.js';

// Check backend
mockAuth.checkBackendStatus()
  .then(isAvailable => console.log('Backend available:', isAvailable));
```

## Debug Checklist

- [ ] Mock auth function được gọi
- [ ] Username/password được truyền đúng
- [ ] Logic tìm kiếm tài khoản hoạt động
- [ ] Return value đúng format
- [ ] Error handling hoạt động
- [ ] Component state được update
- [ ] Console log hiển thị đúng

## Thông Tin Tài Khoản Mock

| Username | Password | Role | Expected Result |
|----------|----------|------|-----------------|
| admin@demo.com | admin123 | Admin | ✅ Success |
| manager@demo.com | manager123 | Manager | ✅ Success |
| staff@demo.com | staff123 | Staff | ✅ Success |
| viewer@demo.com | viewer123 | Viewer | ✅ Success |
| admin_demo | admin123 | Admin | ✅ Success |
| manager_demo | manager123 | Manager | ✅ Success |
| staff_demo | staff123 | Staff | ✅ Success |
| viewer_demo | viewer123 | Viewer | ✅ Success |

## Lưu Ý Quan Trọng

1. **Mở Console** để xem log chi tiết
2. **Test từng tài khoản** một cách riêng biệt
3. **Kiểm tra network tab** nếu có API calls
4. **Restart dev server** nếu cần thiết

## Liên Hệ Hỗ Trợ

Nếu vẫn gặp vấn đề:
1. Chụp màn hình kết quả debug
2. Copy console log
3. Mô tả các bước đã thực hiện
