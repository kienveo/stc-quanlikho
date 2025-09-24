import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Button, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  TagsOutlined,
  FileTextOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearToken, clearUser, getUser } from '../utils/auth';
import { hasAnyRole, ROLES } from '../utils/rbac';

const { Header, Sider, Content } = AntLayout;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const rawMenu = [
    { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/products', icon: <ShoppingOutlined />, label: 'Quản lý Sản phẩm' },
    { key: '/categories', icon: <TagsOutlined />, label: 'Quản lý Danh mục' },
    { key: '/orders', icon: <FileTextOutlined />, label: 'Quản lý Đơn hàng' },
    { key: '/users', icon: <UserOutlined />, label: 'Quản lý Người dùng', roles: [ROLES.Admin] },
    { key: '/reports', icon: <BarChartOutlined />, label: 'Báo cáo', roles: [ROLES.Admin, ROLES.Manager] },
  ];

  const menuItems = rawMenu.filter(item => !item.roles || hasAnyRole(item.roles));

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      clearToken();
      clearUser();
      navigate('/login');
    }
  };

  return (
    <AntLayout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-white shadow-lg"
        width={250}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            {collapsed ? 'QK' : 'Quản Lý Kho'}
          </h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none"
        />
      </Sider>
      
      <AntLayout>
        <Header className="bg-white shadow-sm px-4 flex items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          
          <div className="flex items-center space-x-4">
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
            >
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <Avatar icon={<UserOutlined />} />
                <span className="text-gray-700">{getUser()?.username || 'Admin'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content className="p-6 bg-gray-50 min-h-screen">
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
