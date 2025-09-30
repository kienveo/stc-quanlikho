# Debug Vấn Đề Đăng Nhập Bị Thoát Ra

## Vấn Đề
Khi đăng nhập được một lúc lại thoát ra phần đăng nhập.

## Nguyên Nhân Có Thể

### 1. Token Hết Hạn
- **Triệu chứng**: Đăng nhập được, sau đó tự động logout
- **Nguyên nhân**: Token hết hạn quá nhanh
- **Giải pháp**: Kiểm tra thời gian hết hạn token

### 2. Logic Kiểm Tra Authentication Sai
- **Triệu chứng**: ProtectedRoute không nhận diện được user đã đăng nhập
- **Nguyên nhân**: Logic kiểm tra token không đúng
- **Giải pháp**: Sửa logic trong ProtectedRoute

### 3. Token Không Được Lưu Đúng
- **Triệu chứng**: Token bị mất sau khi refresh page
- **Nguyên nhân**: Lưu token với key sai hoặc không lưu
- **Giải pháp**: Kiểm tra localStorage

### 4. Axios Interceptor Xóa Token
- **Triệu chứng**: Token bị xóa khi gọi API
- **Nguyên nhân**: Interceptor xóa token khi có lỗi
- **Giải pháp**: Kiểm tra axios interceptor

## Cách Debug

### 1. Sử Dụng Auth State Debugger
1. Truy cập: `http://localhost:5174/demo`
2. Chọn tab "Debug Auth State"
3. Theo dõi trạng thái authentication real-time
4. Xem token có bị mất không

### 2. Kiểm Tra Console
1. Mở Developer Tools (F12)
2. Xem tab Console
3. Tìm các log về authentication
4. Kiểm tra có lỗi nào không

### 3. Kiểm Tra LocalStorage
1. Mở Developer Tools (F12)
2. Chọn tab Application/Storage
3. Xem Local Storage
4. Kiểm tra các key: `authToken`, `refreshToken`, `tokenExpiredAt`, `authUser`

### 4. Test Thủ Công
```javascript
// Mở Console và chạy:
console.log('Auth Token:', localStorage.getItem('authToken'));
console.log('Expired At:', localStorage.getItem('tokenExpiredAt'));
console.log('Current Time:', Date.now());
console.log('Is Expired:', Date.now() > Number(localStorage.getItem('tokenExpiredAt')));
```

## Các Bước Sửa Lỗi

### 1. Kiểm Tra Token Expiry
- Xem token có hết hạn quá nhanh không
- Mock auth set 1 giờ, có thể cần tăng lên

### 2. Kiểm Tra ProtectedRoute
- Đảm bảo sử dụng `isAuthenticated()` từ `authUtils.js`
- Không sử dụng logic kiểm tra token riêng

### 3. Kiểm Tra Login Component
- Đảm bảo lưu token với key đúng
- Lưu thời gian hết hạn đúng format

### 4. Kiểm Tra Axios Interceptor
- Xem có xóa token khi có lỗi không
- Đảm bảo chỉ xóa token khi thực sự cần

## Debug Checklist

- [ ] Token được lưu đúng key
- [ ] Thời gian hết hạn được tính đúng
- [ ] ProtectedRoute sử dụng logic đúng
- [ ] Axios interceptor không xóa token sai
- [ ] Console không có lỗi
- [ ] LocalStorage không bị clear
- [ ] Mock auth hoạt động đúng

## Test Cases

### 1. Test Đăng Nhập
1. Đăng nhập với tài khoản demo
2. Kiểm tra token được lưu
3. Kiểm tra thời gian hết hạn
4. Navigate đến dashboard
5. Kiểm tra không bị logout

### 2. Test Refresh Page
1. Đăng nhập thành công
2. Refresh page (F5)
3. Kiểm tra vẫn đăng nhập
4. Không bị redirect về login

### 3. Test Token Expiry
1. Đăng nhập thành công
2. Đợi token hết hạn (hoặc thay đổi thời gian)
3. Kiểm tra bị logout đúng cách
4. Không bị logout sớm

## Lưu Ý Quan Trọng

1. **Sử dụng Debug Tool** để theo dõi real-time
2. **Kiểm tra Console** để xem lỗi
3. **Test từng bước** để xác định nguyên nhân
4. **Backup localStorage** trước khi test

## Liên Hệ Hỗ Trợ

Nếu vẫn gặp vấn đề:
1. Chụp màn hình Auth State Debugger
2. Copy console log
3. Mô tả các bước đã thực hiện
4. Ghi rõ thời điểm bị logout
