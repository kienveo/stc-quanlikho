# Hướng Dẫn Tạo Dữ Liệu Demo Cho Báo Cáo

## Tổng Quan
Tạo dữ liệu demo phong phú để có biểu đồ đẹp trong phần báo cáo.

## Cách Sử Dụng

### 1. Truy Cập Trang Demo
```
http://localhost:5174/demo
```

### 2. Chọn Tab "Dữ Liệu Báo Cáo"
- Nhấn vào tab "Dữ Liệu Báo Cáo" (biểu tượng bi-bar-chart)

### 3. Tạo Dữ Liệu Demo
- Nhấn nút "Tạo Tất Cả Dữ Liệu Demo"
- Đợi quá trình tạo dữ liệu hoàn tất
- Xem thông báo thành công

### 4. Xem Biểu Đồ
- Đi đến phần "Báo cáo & Thống kê"
- Xem các biểu đồ đã được cập nhật với dữ liệu demo

## Dữ Liệu Sẽ Được Tạo

### 📊 Báo Cáo Doanh Thu (6 tháng)
- Doanh thu theo tháng: 100M - 600M VNĐ
- Số đơn hàng: 50 - 250 đơn/tháng
- Lợi nhuận: 20M - 120M VNĐ/tháng

### 🛒 Đơn Hàng (150 đơn)
- ID đơn hàng: ORD0001 - ORD0150
- Tên khách hàng: Khách hàng 1 - 150
- Tổng tiền: 100K - 5M VNĐ
- Trạng thái: Đang xử lý, Đã xác nhận, Đang giao, Đã giao, Đã hủy
- Quận/huyện: Quận 1, 2, 3, 7, Bình Thạnh, Tân Bình

### 📱 Sản Phẩm (80 sản phẩm)
- ID sản phẩm: PROD0001 - PROD0080
- Tên sản phẩm: Apple iPhone, Samsung Galaxy, Xiaomi, etc.
- Danh mục: Điện thoại, Laptop, Máy tính bảng, Phụ kiện, Đồng hồ thông minh
- Giá: 500K - 20M VNĐ
- Tồn kho: 1 - 100 sản phẩm
- Đã bán: 0 - 50 sản phẩm
- Đánh giá: 3.0 - 5.0 sao

### 📂 Danh Mục (8 danh mục)
- Điện thoại: 25 sản phẩm, 1.5B doanh thu
- Laptop: 18 sản phẩm, 2.2B doanh thu
- Máy tính bảng: 12 sản phẩm, 800M doanh thu
- Phụ kiện: 35 sản phẩm, 600M doanh thu
- Đồng hồ thông minh: 8 sản phẩm, 400M doanh thu
- Tai nghe: 15 sản phẩm, 300M doanh thu
- Loa: 10 sản phẩm, 200M doanh thu
- Sạc dự phòng: 20 sản phẩm, 150M doanh thu

### 👥 Người Dùng (25 người)
- Username: user1@demo.com - user25@demo.com
- Tên: Người dùng 1 - 25
- Vai trò: Admin, Manager, Staff, Viewer
- Quận/huyện: Quận 1, 2, 3, 7, Bình Thạnh, Tân Bình
- Trạng thái: Hoạt động (90%), Không hoạt động (10%)
- Số đơn hàng: 0 - 20 đơn
- Tổng chi tiêu: 100K - 10M VNĐ

## Biểu Đồ Sẽ Có

### 📈 Biểu Đồ Doanh Thu
- **Loại**: Bar Chart
- **Dữ liệu**: Doanh thu theo 6 tháng
- **Màu sắc**: Xanh dương (#8884d8)
- **Tooltip**: Hiển thị doanh thu và số đơn hàng

### 🥧 Biểu Đồ Phân Bố Theo Quận
- **Loại**: Pie Chart
- **Dữ liệu**: Phân bố đơn hàng theo quận/huyện
- **Màu sắc**: Tự động tạo màu sắc
- **Label**: Hiển thị phần trăm

### 📊 Biểu Đồ Hiệu Suất Sản Phẩm
- **Loại**: Bar Chart
- **Dữ liệu**: Top sản phẩm bán chạy
- **Màu sắc**: Xanh lá (#82ca9d)
- **Tooltip**: Hiển thị số lượng bán và doanh thu

## Tính Năng Đặc Biệt

### 🔄 Tự Động Phát Hiện Dữ Liệu Demo
- Các biểu đồ tự động sử dụng dữ liệu demo khi có
- Hiển thị thông báo "Đang sử dụng dữ liệu demo"
- Fallback về API thật khi không có dữ liệu demo

### 💾 Lưu Trữ LocalStorage
- Dữ liệu được lưu trong localStorage
- Không bị mất khi refresh trang
- Có thể xóa bằng nút "Xóa Dữ Liệu Demo"

### 🎨 Giao Diện Đẹp
- Tooltip hiển thị số tiền với định dạng VNĐ
- Màu sắc phân biệt rõ ràng
- Responsive trên mọi thiết bị

## Lưu Ý Quan Trọng

1. **Tạo dữ liệu trước khi xem báo cáo**
2. **Refresh trang sau khi tạo dữ liệu**
3. **Dữ liệu demo chỉ để demo, không phải dữ liệu thật**
4. **Có thể xóa dữ liệu demo bất kỳ lúc nào**

## Troubleshooting

### Biểu Đồ Không Hiển Thị
1. Kiểm tra đã tạo dữ liệu demo chưa
2. Refresh trang sau khi tạo dữ liệu
3. Kiểm tra console log có lỗi không

### Dữ Liệu Không Đúng
1. Xóa dữ liệu demo cũ
2. Tạo lại dữ liệu demo mới
3. Refresh trang

### Lỗi JavaScript
1. Mở Developer Tools (F12)
2. Xem tab Console
3. Tìm và báo cáo lỗi

## Liên Hệ Hỗ Trợ

Nếu gặp vấn đề:
1. Chụp màn hình lỗi
2. Copy console log
3. Mô tả các bước đã thực hiện
4. Ghi rõ thời điểm gặp lỗi
