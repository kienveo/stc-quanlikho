import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import {
  ShoppingOutlined,
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: 1234,
      icon: <ShoppingOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Đơn hàng hôm nay',
      value: 56,
      icon: <FileTextOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Khách hàng',
      value: 789,
      icon: <UserOutlined />,
      color: '#fa8c16',
    },
    {
      title: 'Doanh thu tháng',
      value: 125000000,
      icon: <DollarOutlined />,
      color: '#eb2f96',
      prefix: '₫',
    },
  ];

  const recentOrders = [
    {
      key: '1',
      orderId: 'ORD-001',
      customer: 'Nguyễn Văn A',
      amount: 1500000,
      status: 'Đã giao',
      date: '2024-01-15',
    },
    {
      key: '2',
      orderId: 'ORD-002',
      customer: 'Trần Thị B',
      amount: 2300000,
      status: 'Đang xử lý',
      date: '2024-01-15',
    },
    {
      key: '3',
      orderId: 'ORD-003',
      customer: 'Lê Văn C',
      amount: 850000,
      status: 'Chờ xác nhận',
      date: '2024-01-14',
    },
  ];

  const orderColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount.toLocaleString('vi-VN')} ₫`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'Đã giao' ? 'green' : 
                     status === 'Đang xử lý' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
                formatter={stat.prefix ? (value) => `${stat.prefix}${value.toLocaleString('vi-VN')}` : undefined}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Orders */}
      <Card title="Đơn hàng gần đây" className="mb-6">
        <Table
          dataSource={recentOrders}
          columns={orderColumns}
          pagination={false}
          size="small"
        />
      </Card>

      {/* Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card title="Hành động nhanh" className="h-full">
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800">Thêm sản phẩm mới</div>
                <div className="text-sm text-blue-600">Tạo sản phẩm mới trong kho</div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200">
                <div className="font-medium text-green-800">Tạo đơn hàng</div>
                <div className="text-sm text-green-600">Xử lý đơn hàng mới</div>
              </button>
              <button className="w-full p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200">
                <div className="font-medium text-orange-800">Xem báo cáo</div>
                <div className="text-sm text-orange-600">Phân tích dữ liệu bán hàng</div>
              </button>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card title="Thống kê nhanh" className="h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sản phẩm sắp hết</span>
                <span className="font-bold text-red-500">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đơn hàng chờ xử lý</span>
                <span className="font-bold text-orange-500">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Khách hàng mới hôm nay</span>
                <span className="font-bold text-green-500">5</span>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card title="Thông báo" className="h-full">
            <div className="space-y-3">
              <div className="p-2 bg-yellow-50 border-l-4 border-yellow-400">
                <div className="text-sm text-yellow-800">Sản phẩm "iPhone 15" sắp hết hàng</div>
              </div>
              <div className="p-2 bg-blue-50 border-l-4 border-blue-400">
                <div className="text-sm text-blue-800">Đơn hàng mới từ khách hàng VIP</div>
              </div>
              <div className="p-2 bg-green-50 border-l-4 border-green-400">
                <div className="text-sm text-green-800">Nhập kho thành công 100 sản phẩm</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
