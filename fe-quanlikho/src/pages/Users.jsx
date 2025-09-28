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
  Avatar,
  Popconfirm,
  message,
  Switch,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Mock data
  const [allUsers, setAllUsers] = useState([
    {
      key: '1',
      id: 'U001',
      username: 'admin',
      fullName: 'Nguyễn Văn Admin',
      email: 'admin@example.com',
      phone: '0123456789',
      role: 'Admin',
      status: 'Hoạt động',
      lastLogin: '2024-01-15 10:30',
      createdAt: '2024-01-01',
    },
    {
      key: '2',
      id: 'U002',
      username: 'manager1',
      fullName: 'Trần Thị Manager',
      email: 'manager1@example.com',
      phone: '0987654321',
      role: 'Manager',
      status: 'Hoạt động',
      lastLogin: '2024-01-15 09:15',
      createdAt: '2024-01-05',
    },
    {
      key: '3',
      id: 'U003',
      username: 'staff1',
      fullName: 'Lê Văn Staff',
      email: 'staff1@example.com',
      phone: '0369852147',
      role: 'Staff',
      status: 'Hoạt động',
      lastLogin: '2024-01-14 16:45',
      createdAt: '2024-01-10',
    },
    {
      key: '4',
      id: 'U004',
      username: 'staff2',
      fullName: 'Phạm Thị Staff',
      email: 'staff2@example.com',
      phone: '0741258963',
      role: 'Staff',
      status: 'Khóa',
      lastLogin: '2024-01-10 14:20',
      createdAt: '2024-01-12',
    },
  ]);

  // Filter users based on search criteria
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = !searchText || 
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone.includes(searchText);
    
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = !selectedStatus || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      title: 'Thông tin',
      key: 'info',
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-3" />
          <div>
            <div className="font-medium">{record.fullName}</div>
            <div className="text-sm text-gray-500">@{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role) => {
        const color = role === 'Admin' ? 'red' : 
                     role === 'Manager' ? 'blue' : 'green';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status, record) => (
        <Switch
          checked={status === 'Hoạt động'}
          onChange={(checked) => handleToggleStatus(record.key, checked)}
          checkedChildren={<UnlockOutlined />}
          unCheckedChildren={<LockOutlined />}
        />
      ),
    },
    {
      title: 'Đăng nhập cuối',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 150,
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
            title="Bạn có chắc muốn xóa người dùng này?"
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
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleToggleStatus = (key, checked) => {
    setAllUsers(allUsers.map(item => 
      item.key === key 
        ? { ...item, status: checked ? 'Hoạt động' : 'Khóa' }
        : item
    ));
    message.success(checked ? 'Kích hoạt người dùng thành công' : 'Khóa người dùng thành công');
  };

  const handleDelete = (key) => {
    setAllUsers(allUsers.filter(item => item.key !== key));
    message.success('Xóa người dùng thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        // Update existing user
        setAllUsers(allUsers.map(item => 
          item.key === editingUser.key 
            ? { ...item, ...values }
            : item
        ));
        message.success('Cập nhật người dùng thành công');
      } else {
        // Add new user
        const newUser = {
          key: Date.now().toString(),
          ...values,
          lastLogin: 'Chưa đăng nhập',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setAllUsers([...allUsers, newUser]);
        message.success('Thêm người dùng thành công');
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
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Người dùng</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm người dùng
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <Space className="w-full">
          <Search
            placeholder="Tìm kiếm người dùng..."
            allowClear
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
          />
          <Select 
            placeholder="Vai trò" 
            style={{ width: 150 }} 
            allowClear
            value={selectedRole}
            onChange={setSelectedRole}
          >
            <Option value="Admin">Admin</Option>
            <Option value="Manager">Manager</Option>
            <Option value="Staff">Staff</Option>
          </Select>
          <Select 
            placeholder="Trạng thái" 
            style={{ width: 150 }} 
            allowClear
            value={selectedStatus}
            onChange={setSelectedStatus}
          >
            <Option value="Hoạt động">Hoạt động</Option>
            <Option value="Khóa">Khóa</Option>
          </Select>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={{
          total: filteredUsers.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} người dùng`,
        }}
        scroll={{ x: 1000 }}
      />

      <Modal
        title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
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
            status: 'Hoạt động',
            role: 'Staff',
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
            >
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>

            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Vai trò"
              name="role"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
            >
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="Manager">Manager</Option>
                <Option value="Staff">Staff</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Trạng thái"
              name="status"
            >
              <Select>
                <Option value="Hoạt động">Hoạt động</Option>
                <Option value="Khóa">Khóa</Option>
              </Select>
            </Form.Item>
          </div>

          {!editingUser && (
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
