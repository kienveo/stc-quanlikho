import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Tag,
  Popconfirm,
  message,
  Tree,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
} from '@ant-design/icons';

const { Search } = Input;

const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  // Mock data
  const [categories, setCategories] = useState([
    {
      key: '1',
      id: 'C001',
      name: 'Điện thoại',
      description: 'Các loại điện thoại di động',
      productCount: 45,
      status: 'Hoạt động',
      parentId: null,
    },
    {
      key: '2',
      id: 'C002',
      name: 'iPhone',
      description: 'Điện thoại iPhone',
      productCount: 12,
      status: 'Hoạt động',
      parentId: '1',
    },
    {
      key: '3',
      id: 'C003',
      name: 'Samsung',
      description: 'Điện thoại Samsung',
      productCount: 18,
      status: 'Hoạt động',
      parentId: '1',
    },
    {
      key: '4',
      id: 'C004',
      name: 'Laptop',
      description: 'Máy tính xách tay',
      productCount: 25,
      status: 'Hoạt động',
      parentId: null,
    },
    {
      key: '5',
      id: 'C005',
      name: 'MacBook',
      description: 'Laptop Apple',
      productCount: 8,
      status: 'Hoạt động',
      parentId: '4',
    },
    {
      key: '6',
      id: 'C006',
      name: 'Dell',
      description: 'Laptop Dell',
      productCount: 10,
      status: 'Hoạt động',
      parentId: '4',
    },
    {
      key: '7',
      id: 'C007',
      name: 'Phụ kiện',
      description: 'Các phụ kiện điện tử',
      productCount: 67,
      status: 'Hoạt động',
      parentId: null,
    },
  ]);

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <FolderOutlined className="mr-2 text-blue-500" />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'productCount',
      key: 'productCount',
      width: 120,
      render: (count) => (
        <Tag color="blue">{count} sản phẩm</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={status === 'Hoạt động' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này?"
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
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setCategories(categories.filter(item => item.key !== key));
    message.success('Xóa danh mục thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingCategory) {
        // Update existing category
        setCategories(categories.map(item => 
          item.key === editingCategory.key 
            ? { ...item, ...values }
            : item
        ));
        message.success('Cập nhật danh mục thành công');
      } else {
        // Add new category
        const newCategory = {
          key: Date.now().toString(),
          ...values,
          productCount: 0,
        };
        setCategories([...categories, newCategory]);
        message.success('Thêm danh mục thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Build tree data for hierarchical view
  const buildTreeData = (data, parentId = null) => {
    return data
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: buildTreeData(data, item.id),
      }));
  };

  const treeData = buildTreeData(categories);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh mục</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm danh mục
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <Space className="w-full">
          <Search
            placeholder="Tìm kiếm danh mục..."
            allowClear
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
        </Space>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tree View */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Cấu trúc danh mục</h3>
          <Tree
            showLine
            defaultExpandAll
            treeData={treeData.map(item => ({
              title: (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <FolderOutlined className="mr-2 text-blue-500" />
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag color="blue" size="small">{item.productCount}</Tag>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => handleEdit(item)}
                    />
                    <Popconfirm
                      title="Xóa danh mục?"
                      onConfirm={() => handleDelete(item.key)}
                    >
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                      />
                    </Popconfirm>
                  </div>
                </div>
              ),
              key: item.key,
              children: item.children,
            }))}
          />
        </div>

        {/* Table View */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Danh sách danh mục</h3>
          <Table
            columns={columns}
            dataSource={categories}
            pagination={{
              total: categories.length,
              pageSize: 5,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} của ${total} danh mục`,
            }}
            size="small"
          />
        </div>
      </div>

      <Modal
        title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={500}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'Hoạt động',
          }}
        >
          <Form.Item
            label="Mã danh mục"
            name="id"
            rules={[{ required: true, message: 'Vui lòng nhập mã danh mục' }]}
          >
            <Input placeholder="Nhập mã danh mục" />
          </Form.Item>

          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea placeholder="Nhập mô tả danh mục" rows={3} />
          </Form.Item>

          <Form.Item
            label="Danh mục cha"
            name="parentId"
          >
            <Input placeholder="Để trống nếu là danh mục gốc" />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
          >
            <Input placeholder="Hoạt động" disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
