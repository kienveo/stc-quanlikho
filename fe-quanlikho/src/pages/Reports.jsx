import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  DatePicker,
  Select,
  Button,
  Space,
  Progress,
} from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reports = () => {
  const [dateRange, setDateRange] = useState(null);
  const [reportType, setReportType] = useState('sales');

  // Mock data for statistics
  const stats = [
    {
      title: 'Tổng doanh thu',
      value: 125000000,
      prefix: '₫',
      color: '#1890ff',
    },
    {
      title: 'Số đơn hàng',
      value: 156,
      color: '#52c41a',
    },
    {
      title: 'Khách hàng mới',
      value: 45,
      color: '#fa8c16',
    },
    {
      title: 'Tỷ lệ chuyển đổi',
      value: 12.5,
      suffix: '%',
      color: '#eb2f96',
    },
  ];

  // Mock data for top products
  const topProducts = [
    {
      key: '1',
      product: 'iPhone 15 Pro',
      sales: 25,
      revenue: 37500000,
      growth: 15.2,
    },
    {
      key: '2',
      product: 'Samsung Galaxy S24',
      sales: 18,
      revenue: 41400000,
      growth: 8.7,
    },
    {
      key: '3',
      product: 'MacBook Air M2',
      sales: 12,
      revenue: 35988000,
      growth: 22.1,
    },
    {
      key: '4',
      product: 'iPad Pro 12.9',
      sales: 8,
      revenue: 19992000,
      growth: -5.3,
    },
  ];

  // Mock data for sales by category
  const salesByCategory = [
    { category: 'Điện thoại', sales: 65, revenue: 75000000, color: '#1890ff' },
    { category: 'Laptop', sales: 25, revenue: 45000000, color: '#52c41a' },
    { category: 'Tablet', sales: 8, revenue: 20000000, color: '#fa8c16' },
    { category: 'Phụ kiện', sales: 2, revenue: 5000000, color: '#eb2f96' },
  ];

  const productColumns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'sales',
      key: 'sales',
      width: 120,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 150,
      render: (revenue) => `${revenue.toLocaleString('vi-VN')} ₫`,
    },
    {
      title: 'Tăng trưởng',
      dataIndex: 'growth',
      key: 'growth',
      width: 120,
      render: (growth) => (
        <span className={growth > 0 ? 'text-green-500' : 'text-red-500'}>
          {growth > 0 ? '+' : ''}{growth}%
        </span>
      ),
    },
  ];

  const handleExport = () => {
    // Handle export logic
    console.log('Exporting report...');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Báo cáo & Thống kê</h1>
        <Space>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={['Từ ngày', 'Đến ngày']}
            suffixIcon={<CalendarOutlined />}
          />
          <Select
            value={reportType}
            onChange={setReportType}
            style={{ width: 150 }}
          >
            <Option value="sales">Báo cáo bán hàng</Option>
            <Option value="inventory">Báo cáo tồn kho</Option>
            <Option value="customer">Báo cáo khách hàng</Option>
          </Select>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExport}
          >
            Xuất báo cáo
          </Button>
        </Space>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
                formatter={stat.prefix ? (value) => `${stat.prefix}${value.toLocaleString('vi-VN')}` : undefined}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts and Tables */}
      <Row gutter={[16, 16]}>
        {/* Top Products */}
        <Col xs={24} lg={12}>
          <Card title="Sản phẩm bán chạy" className="h-full">
            <Table
              dataSource={topProducts}
              columns={productColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Sales by Category */}
        <Col xs={24} lg={12}>
          <Card title="Doanh thu theo danh mục" className="h-full">
            <div className="space-y-4">
              {salesByCategory.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-sm text-gray-500">
                      {item.sales} đơn ({item.revenue.toLocaleString('vi-VN')} ₫)
                    </span>
                  </div>
                  <Progress
                    percent={item.sales}
                    strokeColor={item.color}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Additional Reports */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={8}>
          <Card title="Báo cáo hàng ngày" className="h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-blue-800">Đơn hàng hôm nay</div>
                  <div className="text-sm text-blue-600">12 đơn hàng mới</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">12</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-800">Doanh thu hôm nay</div>
                  <div className="text-sm text-green-600">8,500,000 ₫</div>
                </div>
                <div className="text-2xl font-bold text-green-600">8.5M</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-medium text-orange-800">Khách hàng mới</div>
                  <div className="text-sm text-orange-600">3 khách hàng</div>
                </div>
                <div className="text-2xl font-bold text-orange-600">3</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Cảnh báo tồn kho" className="h-full">
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <div className="font-medium text-red-800">iPhone 15 Pro</div>
                <div className="text-sm text-red-600">Còn 2 sản phẩm</div>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div className="font-medium text-yellow-800">Samsung Galaxy S24</div>
                <div className="text-sm text-yellow-600">Còn 5 sản phẩm</div>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div className="font-medium text-yellow-800">MacBook Air M2</div>
                <div className="text-sm text-yellow-600">Còn 3 sản phẩm</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Hoạt động gần đây" className="h-full">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Đơn hàng mới #ORD-001</div>
                  <div className="text-gray-500">2 phút trước</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Nhập kho 50 iPhone 15</div>
                  <div className="text-gray-500">1 giờ trước</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Cập nhật giá Samsung S24</div>
                  <div className="text-gray-500">3 giờ trước</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="text-sm">
                  <div className="font-medium">Thêm danh mục mới</div>
                  <div className="text-gray-500">5 giờ trước</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;

