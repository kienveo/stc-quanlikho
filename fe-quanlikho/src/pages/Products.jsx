import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  InputNumber,
  Select,
  Tag,
  Popconfirm,
  message,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Mock data
  const [allProducts, setAllProducts] = useState([
    {
      key: '1',
      id: 'P001',
      name: 'iPhone 15 Pro',
      category: 'Điện thoại',
      price: 29990000,
      stock: 50,
      status: 'Còn hàng',
      description: 'iPhone 15 Pro 128GB',
    },
    {
      key: '2',
      id: 'P002',
      name: 'Samsung Galaxy S24',
      category: 'Điện thoại',
      price: 24990000,
      stock: 30,
      status: 'Còn hàng',
      description: 'Samsung Galaxy S24 256GB',
    },
    {
      key: '3',
      id: 'P003',
      name: 'MacBook Air M2',
      category: 'Laptop',
      price: 29990000,
      stock: 5,
      status: 'Sắp hết',
      description: 'MacBook Air M2 13 inch',
    },
    {
      key: '4',
      id: 'P004',
      name: 'iPad Pro 12.9',
      category: 'Tablet',
      price: 24990000,
      stock: 0,
      status: 'Hết hàng',
      description: 'iPad Pro 12.9 inch M2',
    },
  ]);

  // Filter products based on search criteria
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = !searchText || 
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.id.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesStatus = !selectedStatus || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price) => `${price.toLocaleString('vi-VN')} ₫`,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      render: (stock) => (
        <span className={stock === 0 ? 'text-red-500' : stock < 10 ? 'text-orange-500' : 'text-green-500'}>
          {stock}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const color = status === 'Còn hàng' ? 'green' : 
                     status === 'Sắp hết' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
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
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleView = (record) => {
    // Handle view product details
    message.info(`Xem chi tiết sản phẩm: ${record.name}`);
  };

  const handleDelete = (key) => {
    setAllProducts(allProducts.filter(item => item.key !== key));
    message.success('Xóa sản phẩm thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingProduct) {
        // Update existing product
        setAllProducts(allProducts.map(item => 
          item.key === editingProduct.key 
            ? { ...item, ...values }
            : item
        ));
        message.success('Cập nhật sản phẩm thành công');
      } else {
        // Add new product
        const newProduct = {
          key: Date.now().toString(),
          ...values,
        };
        setAllProducts([...allProducts, newProduct]);
        message.success('Thêm sản phẩm thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <Space className="w-full">
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
          />
          <Select 
            placeholder="Danh mục" 
            style={{ width: 150 }} 
            allowClear
            value={selectedCategory}
            onChange={setSelectedCategory}
          >
            <Option value="Điện thoại">Điện thoại</Option>
            <Option value="Laptop">Laptop</Option>
            <Option value="Tablet">Tablet</Option>
          </Select>
          <Select 
            placeholder="Trạng thái" 
            style={{ width: 150 }} 
            allowClear
            value={selectedStatus}
            onChange={setSelectedStatus}
          >
            <Option value="Còn hàng">Còn hàng</Option>
            <Option value="Sắp hết">Sắp hết</Option>
            <Option value="Hết hàng">Hết hàng</Option>
          </Select>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        pagination={{
          total: filteredProducts.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} sản phẩm`,
        }}
        scroll={{ x: 1000 }}
      />

      <Modal
        title={editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'Còn hàng',
          }}
        >
          <Form.Item
            label="Mã sản phẩm"
            name="id"
            rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}
          >
            <Input placeholder="Nhập mã sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea placeholder="Nhập mô tả sản phẩm" rows={3} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Danh mục"
              name="category"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
            >
              <Select placeholder="Chọn danh mục">
                <Option value="Điện thoại">Điện thoại</Option>
                <Option value="Laptop">Laptop</Option>
                <Option value="Tablet">Tablet</Option>
                <Option value="Phụ kiện">Phụ kiện</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            >
              <InputNumber
                placeholder="Nhập giá"
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Số lượng tồn kho"
              name="stock"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
            >
              <InputNumber
                placeholder="Nhập số lượng"
                style={{ width: '100%' }}
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Trạng thái"
              name="status"
            >
              <Select>
                <Option value="Còn hàng">Còn hàng</Option>
                <Option value="Sắp hết">Sắp hết</Option>
                <Option value="Hết hàng">Hết hàng</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
