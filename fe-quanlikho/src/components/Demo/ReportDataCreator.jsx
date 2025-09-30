import React, { useState } from 'react';
import Button from '../Common/Button';

const ReportDataCreator = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [createdData, setCreatedData] = useState({
    sales: 0,
    orders: 0,
    products: 0,
    categories: 0,
    users: 0
  });

  const createSalesData = () => {
    const salesData = [];
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
    
    months.forEach((month, index) => {
      salesData.push({
        month: month,
        revenue: Math.floor(Math.random() * 500000000) + 100000000, // 100M - 600M
        orders: Math.floor(Math.random() * 200) + 50, // 50 - 250 orders
        products: Math.floor(Math.random() * 100) + 20, // 20 - 120 products
        profit: Math.floor(Math.random() * 100000000) + 20000000 // 20M - 120M profit
      });
    });

    localStorage.setItem('demo_sales_data', JSON.stringify(salesData));
    return salesData.length;
  };

  const createOrdersData = () => {
    const ordersData = [];
    const statuses = ['Đang xử lý', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'];
    const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 7', 'Quận Bình Thạnh', 'Quận Tân Bình'];
    
    for (let i = 0; i < 150; i++) {
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30));
      
      ordersData.push({
        id: `ORD${String(i + 1).padStart(4, '0')}`,
        customerName: `Khách hàng ${i + 1}`,
        totalAmount: Math.floor(Math.random() * 5000000) + 100000, // 100K - 5M
        status: statuses[Math.floor(Math.random() * statuses.length)],
        district: districts[Math.floor(Math.random() * districts.length)],
        orderDate: orderDate.toISOString().split('T')[0],
        items: Math.floor(Math.random() * 10) + 1
      });
    }

    localStorage.setItem('demo_orders_data', JSON.stringify(ordersData));
    return ordersData.length;
  };

  const createProductsData = () => {
    const productsData = [];
    const categories = ['Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện', 'Đồng hồ thông minh'];
    const brands = ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Huawei', 'Dell', 'HP', 'Asus'];
    
    for (let i = 0; i < 80; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      
      productsData.push({
        id: `PROD${String(i + 1).padStart(4, '0')}`,
        name: `${brand} ${category} ${i + 1}`,
        category: category,
        brand: brand,
        price: Math.floor(Math.random() * 20000000) + 500000, // 500K - 20M
        stock: Math.floor(Math.random() * 100) + 1,
        sold: Math.floor(Math.random() * 50),
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
        status: Math.random() > 0.1 ? 'Hoạt động' : 'Ngừng bán'
      });
    }

    localStorage.setItem('demo_products_data', JSON.stringify(productsData));
    return productsData.length;
  };

  const createCategoriesData = () => {
    const categoriesData = [
      { name: 'Điện thoại', count: 25, revenue: 1500000000, color: '#FF6B6B' },
      { name: 'Laptop', count: 18, revenue: 2200000000, color: '#4ECDC4' },
      { name: 'Máy tính bảng', count: 12, revenue: 800000000, color: '#45B7D1' },
      { name: 'Phụ kiện', count: 35, revenue: 600000000, color: '#96CEB4' },
      { name: 'Đồng hồ thông minh', count: 8, revenue: 400000000, color: '#FFEAA7' },
      { name: 'Tai nghe', count: 15, revenue: 300000000, color: '#DDA0DD' },
      { name: 'Loa', count: 10, revenue: 200000000, color: '#98D8C8' },
      { name: 'Sạc dự phòng', count: 20, revenue: 150000000, color: '#F7DC6F' }
    ];

    localStorage.setItem('demo_categories_data', JSON.stringify(categoriesData));
    return categoriesData.length;
  };

  const createUsersData = () => {
    const usersData = [];
    const roles = ['Admin', 'Manager', 'Staff', 'Viewer'];
    const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 7', 'Quận Bình Thạnh', 'Quận Tân Bình'];
    
    for (let i = 0; i < 25; i++) {
      const role = roles[Math.floor(Math.random() * roles.length)];
      const district = districts[Math.floor(Math.random() * districts.length)];
      
      usersData.push({
        id: i + 1,
        username: `user${i + 1}@demo.com`,
        name: `Người dùng ${i + 1}`,
        role: role,
        district: district,
        isActive: Math.random() > 0.1,
        lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        ordersCount: Math.floor(Math.random() * 20),
        totalSpent: Math.floor(Math.random() * 10000000) + 100000
      });
    }

    localStorage.setItem('demo_users_data', JSON.stringify(usersData));
    return usersData.length;
  };

  const createChartData = () => {
    // Sales trend data (6 months)
    const salesTrend = [
      { month: 'Tháng 1', revenue: 450000000, orders: 120, profit: 90000000 },
      { month: 'Tháng 2', revenue: 520000000, orders: 145, profit: 104000000 },
      { month: 'Tháng 3', revenue: 480000000, orders: 135, profit: 96000000 },
      { month: 'Tháng 4', revenue: 580000000, orders: 165, profit: 116000000 },
      { month: 'Tháng 5', revenue: 620000000, orders: 180, profit: 124000000 },
      { month: 'Tháng 6', revenue: 550000000, orders: 155, profit: 110000000 }
    ];

    // District distribution data
    const districtData = [
      { name: 'Quận 1', value: 35, revenue: 800000000 },
      { name: 'Quận 2', value: 28, revenue: 650000000 },
      { name: 'Quận 3', value: 22, revenue: 520000000 },
      { name: 'Quận 7', value: 18, revenue: 420000000 },
      { name: 'Quận Bình Thạnh', value: 15, revenue: 350000000 },
      { name: 'Quận Tân Bình', value: 12, revenue: 280000000 }
    ];

    // Product performance data
    const productPerformance = [
      { name: 'iPhone 15 Pro', sales: 45, revenue: 450000000 },
      { name: 'Samsung Galaxy S24', sales: 38, revenue: 380000000 },
      { name: 'MacBook Pro M3', sales: 25, revenue: 500000000 },
      { name: 'iPad Air', sales: 32, revenue: 320000000 },
      { name: 'AirPods Pro', sales: 55, revenue: 110000000 },
      { name: 'Apple Watch', sales: 28, revenue: 140000000 }
    ];

    localStorage.setItem('demo_sales_trend', JSON.stringify(salesTrend));
    localStorage.setItem('demo_district_data', JSON.stringify(districtData));
    localStorage.setItem('demo_product_performance', JSON.stringify(productPerformance));

    return {
      salesTrend: salesTrend.length,
      districtData: districtData.length,
      productPerformance: productPerformance.length
    };
  };

  const handleCreateAllData = async () => {
    setIsCreating(true);
    
    try {
      // Create all demo data
      const salesCount = createSalesData();
      const ordersCount = createOrdersData();
      const productsCount = createProductsData();
      const categoriesCount = createCategoriesData();
      const usersCount = createUsersData();
      const chartData = createChartData();

      setCreatedData({
        sales: salesCount,
        orders: ordersCount,
        products: productsCount,
        categories: categoriesCount,
        users: usersCount,
        charts: chartData.salesTrend + chartData.districtData + chartData.productPerformance
      });

      // Show success message
      alert('✅ Đã tạo dữ liệu demo thành công!\n\n' +
            `📊 Báo cáo doanh thu: ${salesCount} bản ghi\n` +
            `🛒 Đơn hàng: ${ordersCount} đơn\n` +
            `📱 Sản phẩm: ${productsCount} sản phẩm\n` +
            `📂 Danh mục: ${categoriesCount} danh mục\n` +
            `👥 Người dùng: ${usersCount} người\n` +
            `📈 Dữ liệu biểu đồ: ${chartData.salesTrend + chartData.districtData + chartData.productPerformance} bản ghi\n\n` +
            'Bây giờ bạn có thể xem biểu đồ đẹp trong phần Báo cáo!');
    } catch (error) {
      console.error('Error creating demo data:', error);
      alert('❌ Có lỗi khi tạo dữ liệu demo: ' + error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClearData = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu demo?')) {
      localStorage.removeItem('demo_sales_data');
      localStorage.removeItem('demo_orders_data');
      localStorage.removeItem('demo_products_data');
      localStorage.removeItem('demo_categories_data');
      localStorage.removeItem('demo_users_data');
      localStorage.removeItem('demo_sales_trend');
      localStorage.removeItem('demo_district_data');
      localStorage.removeItem('demo_product_performance');
      
      setCreatedData({
        sales: 0,
        orders: 0,
        products: 0,
        categories: 0,
        users: 0
      });
      
      alert('✅ Đã xóa tất cả dữ liệu demo!');
    }
  };

  const checkExistingData = () => {
    const sales = localStorage.getItem('demo_sales_data');
    const orders = localStorage.getItem('demo_orders_data');
    const products = localStorage.getItem('demo_products_data');
    const categories = localStorage.getItem('demo_categories_data');
    const users = localStorage.getItem('demo_users_data');
    const charts = localStorage.getItem('demo_sales_trend');

    return {
      hasData: !!(sales || orders || products || categories || users || charts),
      sales: sales ? JSON.parse(sales).length : 0,
      orders: orders ? JSON.parse(orders).length : 0,
      products: products ? JSON.parse(products).length : 0,
      categories: categories ? JSON.parse(categories).length : 0,
      users: users ? JSON.parse(users).length : 0
    };
  };

  const existingData = checkExistingData();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Tạo Dữ Liệu Demo Cho Báo Cáo
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Tạo dữ liệu demo phong phú</strong> để có biểu đồ đẹp trong phần báo cáo.
              </div>

              {/* Existing Data Status */}
              {existingData.hasData && (
                <div className="alert alert-success">
                  <h6><i className="bi bi-check-circle me-2"></i>Dữ liệu demo đã có:</h6>
                  <div className="row">
                    <div className="col-md-2">
                      <small>📊 Báo cáo: {existingData.sales}</small>
                    </div>
                    <div className="col-md-2">
                      <small>🛒 Đơn hàng: {existingData.orders}</small>
                    </div>
                    <div className="col-md-2">
                      <small>📱 Sản phẩm: {existingData.products}</small>
                    </div>
                    <div className="col-md-2">
                      <small>📂 Danh mục: {existingData.categories}</small>
                    </div>
                    <div className="col-md-2">
                      <small>👥 Người dùng: {existingData.users}</small>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Creation Buttons */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex gap-2 flex-wrap">
                    <Button
                      onClick={handleCreateAllData}
                      disabled={isCreating}
                      variant="primary"
                      size="lg"
                    >
                      {isCreating ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Đang tạo...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-magic me-2"></i>
                          Tạo Tất Cả Dữ Liệu Demo
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={handleClearData}
                      variant="outline-danger"
                      size="lg"
                    >
                      <i className="bi bi-trash me-2"></i>
                      Xóa Dữ Liệu Demo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Data Preview */}
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Dữ Liệu Sẽ Được Tạo</h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li><i className="bi bi-check-circle text-success me-2"></i>📊 Báo cáo doanh thu (6 tháng)</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>🛒 Đơn hàng (150 đơn)</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>📱 Sản phẩm (80 sản phẩm)</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>📂 Danh mục (8 danh mục)</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>👥 Người dùng (25 người)</li>
                        <li><i className="bi bi-check-circle text-success me-2"></i>📈 Dữ liệu biểu đồ phong phú</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Biểu Đồ Sẽ Có</h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li><i className="bi bi-bar-chart text-primary me-2"></i>Biểu đồ doanh thu theo tháng</li>
                        <li><i className="bi bi-pie-chart text-primary me-2"></i>Phân bố theo quận/huyện</li>
                        <li><i className="bi bi-graph-up text-primary me-2"></i>Xu hướng bán hàng</li>
                        <li><i className="bi bi-activity text-primary me-2"></i>Hiệu suất sản phẩm</li>
                        <li><i className="bi bi-people text-primary me-2"></i>Thống kê người dùng</li>
                        <li><i className="bi bi-cart text-primary me-2"></i>Phân tích đơn hàng</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-4">
                <div className="alert alert-warning">
                  <h6><i className="bi bi-lightbulb me-2"></i>Hướng dẫn sử dụng:</h6>
                  <ol className="mb-0">
                    <li>Nhấn "Tạo Tất Cả Dữ Liệu Demo" để tạo dữ liệu</li>
                    <li>Đi đến phần "Báo cáo & Thống kê" để xem biểu đồ</li>
                    <li>Dữ liệu sẽ được lưu trong localStorage</li>
                    <li>Refresh trang để thấy biểu đồ mới</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDataCreator;
