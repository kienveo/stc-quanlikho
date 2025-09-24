import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Select,
  Tag,
  Popconfirm,
  message,
  Descriptions,
  Card,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const Orders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [form] = Form.useForm();

  // Mock data
  const [orders, setOrders] = useState([
    {
      key: '1',
      id: 'ORD-001',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0123456789',
      customerEmail: 'nguyenvana@email.com',
      totalAmount: 1500000,
      status: 'Đã giao',
      paymentMethod: 'Chuyển khoản',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-16',
      items: [
        { product: 'iPhone 15 Pro', quantity: 1, price: 1500000 },
      ],
    },
    {
      key: '2',
      id: 'ORD-002',
      customerName: 'Trần Thị B',
      customerPhone: '0987654321',
      customerEmail: 'tranthib@email.com',
      totalAmount: 2300000,
      status: 'Đang xử lý',
      paymentMethod: 'Tiền mặt',
      orderDate: '2024-01-15',
      deliveryDate: null,
      items: [
        { product: 'Samsung Galaxy S24', quantity: 1, price: 2300000 },
      ],
    },
    {
      key: '3',
      id: 'ORD-003',
      customerName: 'Lê Văn C',
      customerPhone: '0369852147',
      customerEmail: 'levanc@email.com',
      totalAmount: 850000,
      status: 'Chờ xác nhận',
      paymentMethod: 'Chuyển khoản',
      orderDate: '2024-01-14',
      deliveryDate: null,
      items: [
        { product: 'AirPods Pro', quantity: 1, price: 850000 },
      ],
    },
    {
      key: '4',
      id: 'ORD-004',
      customerName: 'Phạm Thị D',
      customerPhone: '0741258963',
      customerEmail: 'phamthid@email.com',
      totalAmount: 3200000,
      status: 'Đã hủy',
      paymentMethod: 'Chuyển khoản',
      orderDate: '2024-01-13',
      deliveryDate: null,
      items: [
        { product: 'MacBook Air M2', quantity: 1, price: 3200000 },
      ],
    },
  ]);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.customerPhone}</div>
        </div>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      render: (amount) => `${amount.toLocaleString('vi-VN')} ₫`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const color = status === 'Đã giao' ? 'green' : 
                     status === 'Đang xử lý' ? 'blue' : 
                     status === 'Chờ xác nhận' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 150,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: 120,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          {record.status === 'Chờ xác nhận' && (
            <Button
              type="text"
              icon={<CheckOutlined />}
              size="small"
              onClick={() => handleConfirm(record.key)}
            />
          )}
          {record.status !== 'Đã giao' && record.status !== 'Đã hủy' && (
            <Button
              type="text"
              icon={<CloseOutlined />}
              size="small"
              danger
              onClick={() => handleCancel(record.key)}
            />
          )}
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    setViewingOrder(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingOrder(record);
    setViewingOrder(null);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleConfirm = (key) => {
    setOrders(orders.map(item => 
      item.key === key 
        ? { ...item, status: 'Đang xử lý' }
        : item
    ));
    message.success('Xác nhận đơn hàng thành công');
  };

  const handleCancel = (key) => {
    setOrders(orders.map(item => 
      item.key === key 
        ? { ...item, status: 'Đã hủy' }
        : item
    ));
    message.success('Hủy đơn hàng thành công');
  };

  const handleDelete = (key) => {
    setOrders(orders.filter(item => item.key !== key));
    message.success('Xóa đơn hàng thành công');
  };

  const handleModalOk = () => {
    if (viewingOrder) {
      setIsModalVisible(false);
      return;
    }

    form.validateFields().then(values => {
      if (editingOrder) {
        setOrders(orders.map(item => 
          item.key === editingOrder.key 
            ? { ...item, ...values }
            : item
        ));
        message.success('Cập nhật đơn hàng thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setViewingOrder(null);
    setEditingOrder(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <Space className="w-full">
          <Search
            placeholder="Tìm kiếm đơn hàng..."
            allowClear
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Select placeholder="Trạng thái" style={{ width: 150 }} allowClear>
            <Option value="Chờ xác nhận">Chờ xác nhận</Option>
            <Option value="Đang xử lý">Đang xử lý</Option>
            <Option value="Đã giao">Đã giao</Option>
            <Option value="Đã hủy">Đã hủy</Option>
          </Select>
          <Select placeholder="Phương thức thanh toán" style={{ width: 200 }} allowClear>
            <Option value="Tiền mặt">Tiền mặt</Option>
            <Option value="Chuyển khoản">Chuyển khoản</Option>
            <Option value="Thẻ tín dụng">Thẻ tín dụng</Option>
          </Select>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={orders}
        pagination={{
          total: orders.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} đơn hàng`,
        }}
        scroll={{ x: 1000 }}
      />

      <Modal
        title={viewingOrder ? 'Chi tiết đơn hàng' : 'Chỉnh sửa đơn hàng'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText={viewingOrder ? 'Đóng' : 'Lưu'}
        cancelText="Hủy"
      >
        {viewingOrder ? (
          <div>
            <Descriptions title="Thông tin đơn hàng" bordered column={2}>
              <Descriptions.Item label="Mã đơn hàng">{viewingOrder.id}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={viewingOrder.status === 'Đã giao' ? 'green' : 
                           viewingOrder.status === 'Đang xử lý' ? 'blue' : 
                           viewingOrder.status === 'Chờ xác nhận' ? 'orange' : 'red'}>
                  {viewingOrder.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tên khách hàng">{viewingOrder.customerName}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{viewingOrder.customerPhone}</Descriptions.Item>
              <Descriptions.Item label="Email">{viewingOrder.customerEmail}</Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">{viewingOrder.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">{viewingOrder.orderDate}</Descriptions.Item>
              <Descriptions.Item label="Ngày giao">{viewingOrder.deliveryDate || 'Chưa giao'}</Descriptions.Item>
              <Descriptions.Item label="Tổng tiền" span={2}>
                <span className="text-lg font-bold text-red-600">
                  {viewingOrder.totalAmount.toLocaleString('vi-VN')} ₫
                </span>
              </Descriptions.Item>
            </Descriptions>

            <Card title="Sản phẩm trong đơn hàng" className="mt-4">
              <Table
                dataSource={viewingOrder.items}
                columns={[
                  { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
                  { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', width: 100 },
                  { 
                    title: 'Giá', 
                    dataIndex: 'price', 
                    key: 'price', 
                    width: 150,
                    render: (price) => `${price.toLocaleString('vi-VN')} ₫`
                  },
                ]}
                pagination={false}
                size="small"
              />
            </Card>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Mã đơn hàng"
                name="id"
                rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng' }]}
              >
                <Input placeholder="Nhập mã đơn hàng" />
              </Form.Item>

              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              >
                <Select>
                  <Option value="Chờ xác nhận">Chờ xác nhận</Option>
                  <Option value="Đang xử lý">Đang xử lý</Option>
                  <Option value="Đã giao">Đã giao</Option>
                  <Option value="Đã hủy">Đã hủy</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Tên khách hàng"
                name="customerName"
                rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="customerPhone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </div>

            <Form.Item
              label="Email"
              name="customerEmail"
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
              >
                <Select>
                  <Option value="Tiền mặt">Tiền mặt</Option>
                  <Option value="Chuyển khoản">Chuyển khoản</Option>
                  <Option value="Thẻ tín dụng">Thẻ tín dụng</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Tổng tiền"
                name="totalAmount"
                rules={[{ required: true, message: 'Vui lòng nhập tổng tiền' }]}
              >
                <Input placeholder="Nhập tổng tiền" />
              </Form.Item>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
