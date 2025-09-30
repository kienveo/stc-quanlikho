# Tài Khoản Demo - Hệ Thống Quản Lý Kho

## Tổng Quan

Tài liệu này cung cấp thông tin về các tài khoản demo được tạo sẵn để test hệ thống quản lý kho.

## Truy Cập Trang Demo

Để truy cập trang demo, hãy mở trình duyệt và đi đến:
```
http://localhost:3000/demo
```

## Tài Khoản Demo

### 1. Admin (Quản Trị Viên)
- **Email:** admin@demo.com
- **Password:** admin123
- **Quyền hạn:** 
  - Quản lý toàn bộ hệ thống
  - Tạo/sửa/xóa người dùng
  - Quản lý sản phẩm và danh mục
  - Xem tất cả báo cáo
  - Cài đặt hệ thống

### 2. Manager (Quản Lý)
- **Email:** manager@demo.com
- **Password:** manager123
- **Quyền hạn:**
  - Quản lý kho hàng
  - Tạo/sửa/xóa sản phẩm
  - Quản lý đơn hàng
  - Xem báo cáo quản lý

### 3. Staff (Nhân Viên)
- **Email:** staff@demo.com
- **Password:** staff123
- **Quyền hạn:**
  - Xem danh sách sản phẩm
  - Xử lý đơn hàng
  - Cập nhật tồn kho
  - Xem báo cáo cơ bản

### 4. Viewer (Người Xem)
- **Email:** viewer@demo.com
- **Password:** viewer123
- **Quyền hạn:**
  - Chỉ xem báo cáo và thống kê
  - Không thể chỉnh sửa dữ liệu

## Dữ Liệu Demo

### Danh Mục Sản Phẩm
- Điện Thoại
- Laptop
- Phụ Kiện
- Đồ Gia Dụng
- Thời Trang

### Sản Phẩm Mẫu
1. **iPhone 15 Pro** - 25,990,000đ (50 sản phẩm)
2. **MacBook Air M2** - 25,990,000đ (30 sản phẩm)
3. **Samsung Galaxy S24** - 19,990,000đ (40 sản phẩm)
4. **Dell XPS 13** - 29,990,000đ (25 sản phẩm)
5. **AirPods Pro** - 5,990,000đ (100 sản phẩm)
6. **Bàn Làm Việc** - 2,500,000đ (20 sản phẩm)
7. **Áo Sơ Mi Nam** - 450,000đ (200 sản phẩm)

## Cách Sử Dụng

### 1. Tạo Tài Khoản Demo
1. Truy cập trang `/demo`
2. Chọn tab "Tài Khoản Demo"
3. Nhấn "Tạo Tất Cả Tài Khoản Demo" hoặc tạo từng tài khoản riêng lẻ
4. Đợi quá trình tạo hoàn tất

### 2. Tạo Dữ Liệu Demo
1. Chọn tab "Dữ Liệu Demo"
2. Nhấn "Tạo Tất Cả Dữ Liệu Demo" để tạo danh mục và sản phẩm
3. Hoặc tạo riêng lẻ danh mục và sản phẩm

### 3. Đăng Nhập và Test
1. Truy cập trang đăng nhập `/login`
2. Sử dụng thông tin tài khoản demo ở trên
3. Test các chức năng theo quyền hạn của từng role

## Các Chức Năng Có Thể Test

### Quản Lý Người Dùng
- [ ] Đăng ký tài khoản mới
- [ ] Đăng nhập/đăng xuất
- [ ] Quản lý thông tin cá nhân
- [ ] Phân quyền người dùng

### Quản Lý Sản Phẩm
- [ ] Thêm/sửa/xóa sản phẩm
- [ ] Quản lý danh mục
- [ ] Theo dõi tồn kho
- [ ] Tìm kiếm sản phẩm

### Quản Lý Đơn Hàng
- [ ] Tạo đơn hàng mới
- [ ] Theo dõi trạng thái đơn hàng
- [ ] Xử lý đơn hàng
- [ ] Lịch sử đơn hàng

### Báo Cáo & Thống Kê
- [ ] Dashboard tổng quan
- [ ] Báo cáo doanh thu
- [ ] Thống kê sản phẩm
- [ ] Biểu đồ trực quan

## Lưu Ý Quan Trọng

1. **Môi trường Demo:** Các tài khoản này chỉ dành cho mục đích demo và phát triển
2. **Bảo mật:** Không sử dụng mật khẩu đơn giản trong môi trường production
3. **Dữ liệu:** Dữ liệu demo có thể bị xóa khi restart server
4. **API:** Đảm bảo backend API đang chạy trên `http://localhost:8080`

## Troubleshooting

### Lỗi "Network Error"
- Kiểm tra backend API có đang chạy không
- Kiểm tra URL API trong file config

### Lỗi "Registration Failed"
- Kiểm tra email đã tồn tại chưa
- Kiểm tra format email và password

### Lỗi "Token Expired"
- Đăng xuất và đăng nhập lại
- Kiểm tra refresh token

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console browser để xem lỗi chi tiết
2. Kiểm tra network tab để xem API calls
3. Đảm bảo backend đang chạy và accessible

---

**Lưu ý:** Tài liệu này được tạo tự động và có thể cập nhật theo thời gian.
