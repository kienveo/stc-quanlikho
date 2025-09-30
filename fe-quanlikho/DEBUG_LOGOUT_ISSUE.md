# Debug Vấn Đề Bị Thoát Sau Khi Đăng Nhập

## Vấn Đề
Vẫn bị thoát sau khi đăng nhập thành công.

## Nguyên Nhân Đã Phát Hiện

### 1. Axios Interceptor Xóa Token
- **Vấn đề**: Axios interceptor xóa token và reload page khi không có token hợp lệ
- **Đã sửa**: Loại bỏ việc xóa token và reload page không cần thiết

### 2. API Calls Sau Đăng Nhập
- **Vấn đề**: Có thể có API calls được thực hiện ngay sau khi đăng nhập
- **Giải pháp**: Sử dụng debug tool để theo dõi

## Cách Debug Chi Tiết

### 1. Sử Dụng Logout Debugger
1. Truy cập: `http://localhost:5174/demo`
2. Chọn tab "Debug Logout"
3. Mở tab này TRƯỚC khi đăng nhập
4. Đăng nhập với tài khoản demo
5. Quan sát các sự kiện trong bảng

### 2. Các Sự Kiện Cần Chú Ý
- `localStorage.authToken changed` - Token bị thay đổi
- `localStorage.tokenExpiredAt changed` - Thời gian hết hạn bị thay đổi
- `Page visibility changed` - Trang bị ẩn/hiện
- `Window focused/blurred` - Focus thay đổi

### 3. Kiểm Tra Console
1. Mở Developer Tools (F12)
2. Xem tab Console
3. Tìm các log về authentication
4. Kiểm tra có lỗi axios không

## Các Bước Debug

### Bước 1: Chuẩn Bị
1. Mở trang debug: `http://localhost:5174/demo`
2. Chọn tab "Debug Logout"
3. Đảm bảo monitoring đang hoạt động

### Bước 2: Test Đăng Nhập
1. Mở tab mới: `http://localhost:5174/login`
2. Đăng nhập với tài khoản demo
3. Quay lại tab debug
4. Xem các sự kiện được ghi lại

### Bước 3: Phân Tích Kết Quả
1. Tìm sự kiện gây logout
2. Kiểm tra chi tiết sự kiện
3. Xác định nguyên nhân

## Các Nguyên Nhân Có Thể

### 1. Axios Interceptor
- **Triệu chứng**: Token bị xóa ngay sau đăng nhập
- **Nguyên nhân**: Interceptor xóa token khi có lỗi
- **Đã sửa**: ✅

### 2. API Calls Tự Động
- **Triệu chứng**: Có API calls được thực hiện sau đăng nhập
- **Nguyên nhân**: Component gọi API khi mount
- **Giải pháp**: Kiểm tra các component Management

### 3. Token Expiry Logic
- **Triệu chứng**: Token bị coi là hết hạn
- **Nguyên nhân**: Logic kiểm tra thời gian sai
- **Giải pháp**: Kiểm tra `authUtils.js`

### 4. Page Refresh/Reload
- **Triệu chứng**: Page bị reload
- **Nguyên nhân**: Code gọi `window.location.reload()`
- **Giải pháp**: Tìm và loại bỏ

## Test Cases

### 1. Test Đăng Nhập Cơ Bản
1. Mở debug tool
2. Đăng nhập với `admin@demo.com` / `admin123`
3. Kiểm tra không bị logout
4. Navigate đến dashboard
5. Kiểm tra vẫn đăng nhập

### 2. Test Refresh Page
1. Đăng nhập thành công
2. Refresh page (F5)
3. Kiểm tra vẫn đăng nhập
4. Không bị redirect về login

### 3. Test Navigate
1. Đăng nhập thành công
2. Navigate giữa các trang
3. Kiểm tra không bị logout
4. Quay lại trang trước

## Debug Checklist

- [ ] Axios interceptor không xóa token
- [ ] Không có API calls tự động
- [ ] Token expiry logic đúng
- [ ] Không có page reload
- [ ] ProtectedRoute hoạt động đúng
- [ ] Console không có lỗi
- [ ] LocalStorage không bị clear

## Lưu Ý Quan Trọng

1. **Mở debug tool TRƯỚC khi đăng nhập**
2. **Theo dõi tất cả sự kiện**
3. **Kiểm tra console log**
4. **Test từng bước một**

## Liên Hệ Hỗ Trợ

Nếu vẫn gặp vấn đề:
1. Chụp màn hình debug tool
2. Copy console log
3. Mô tả các bước đã thực hiện
4. Ghi rõ thời điểm bị logout
