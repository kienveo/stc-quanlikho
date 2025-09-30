import axiosInstance from '../api/axiosInstance';

// Danh sách tài khoản demo
export const demoAccounts = [
  {
    username: 'admin_demo',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'Admin',
    description: 'Tài khoản quản trị viên với đầy đủ quyền'
  },
  {
    username: 'manager_demo',
    email: 'manager@demo.com',
    password: 'manager123',
    role: 'Manager',
    description: 'Tài khoản quản lý kho hàng'
  },
  {
    username: 'staff_demo',
    email: 'staff@demo.com',
    password: 'staff123',
    role: 'Staff',
    description: 'Tài khoản nhân viên kho'
  },
  {
    username: 'viewer_demo',
    email: 'viewer@demo.com',
    password: 'viewer123',
    role: 'Viewer',
    description: 'Tài khoản chỉ xem báo cáo'
  }
];

// Danh sách danh mục demo
export const demoCategories = [
  { name: 'Điện Thoại', description: 'Các loại điện thoại di động' },
  { name: 'Laptop', description: 'Máy tính xách tay' },
  { name: 'Phụ Kiện', description: 'Phụ kiện điện tử' },
  { name: 'Đồ Gia Dụng', description: 'Đồ dùng trong gia đình' },
  { name: 'Thời Trang', description: 'Quần áo, giày dép' }
];

// Danh sách sản phẩm demo
export const demoProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Điện thoại iPhone 15 Pro 128GB',
    price: 25990000,
    quantity: 50,
    category: 'Điện Thoại',
    sku: 'IP15P-128'
  },
  {
    name: 'MacBook Air M2',
    description: 'Laptop MacBook Air M2 13 inch',
    price: 25990000,
    quantity: 30,
    category: 'Laptop',
    sku: 'MBA-M2-13'
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Điện thoại Samsung Galaxy S24 256GB',
    price: 19990000,
    quantity: 40,
    category: 'Điện Thoại',
    sku: 'SGS24-256'
  },
  {
    name: 'Dell XPS 13',
    description: 'Laptop Dell XPS 13 i7',
    price: 29990000,
    quantity: 25,
    category: 'Laptop',
    sku: 'DXPS13-I7'
  },
  {
    name: 'AirPods Pro',
    description: 'Tai nghe AirPods Pro 2',
    price: 5990000,
    quantity: 100,
    category: 'Phụ Kiện',
    sku: 'APP2'
  },
  {
    name: 'Bàn Làm Việc',
    description: 'Bàn làm việc gỗ cao cấp',
    price: 2500000,
    quantity: 20,
    category: 'Đồ Gia Dụng',
    sku: 'BLV-GO'
  },
  {
    name: 'Áo Sơ Mi Nam',
    description: 'Áo sơ mi nam cao cấp',
    price: 450000,
    quantity: 200,
    category: 'Thời Trang',
    sku: 'ASM-NAM'
  }
];

// Hàm tạo tài khoản demo
export const createDemoAccount = async (account) => {
  try {
    const payload = {
      username: account.username,
      email: account.email,
      password: account.password,
      confirmPassword: account.password,
    };

    const res = await axiosInstance.post("/api/v1/un_auth/signup/user", payload);
    
    if (res.data && res.data.status === 200) {
      return {
        ...account,
        status: 'success',
        message: res.data.message || 'Tạo tài khoản thành công!'
      };
    } else {
      return {
        ...account,
        status: 'error',
        message: res.data.message || 'Tạo tài khoản thất bại!'
      };
    }
  } catch (error) {
    return {
      ...account,
      status: 'error',
      message: error.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản!'
    };
  }
};

// Hàm tạo danh mục demo
export const createDemoCategory = async (category) => {
  try {
    const payload = {
      name: category.name,
      description: category.description
    };

    const res = await axiosInstance.post("/api/v1/un_auth/category/category_create", payload);
    
    if (res.data && res.data.status === 200) {
      return {
        type: 'category',
        name: category.name,
        status: 'success',
        message: 'Tạo danh mục thành công!'
      };
    } else {
      return {
        type: 'category',
        name: category.name,
        status: 'error',
        message: res.data.message || 'Tạo danh mục thất bại!'
      };
    }
  } catch (error) {
    return {
      type: 'category',
      name: category.name,
      status: 'error',
      message: error.response?.data?.message || 'Có lỗi xảy ra khi tạo danh mục!'
    };
  }
};

// Hàm tạo sản phẩm demo
export const createDemoProduct = async (product) => {
  try {
    const payload = {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      sku: product.sku
    };

    const res = await axiosInstance.post("/api/v1/un_auth/product/create", payload);
    
    if (res.data && res.data.status === 200) {
      return {
        type: 'product',
        name: product.name,
        status: 'success',
        message: 'Tạo sản phẩm thành công!'
      };
    } else {
      return {
        type: 'product',
        name: product.name,
        status: 'error',
        message: res.data.message || 'Tạo sản phẩm thất bại!'
      };
    }
  } catch (error) {
    return {
      type: 'product',
      name: product.name,
      status: 'error',
      message: error.response?.data?.message || 'Có lỗi xảy ra khi tạo sản phẩm!'
    };
  }
};

// Hàm tạo tất cả tài khoản demo
export const createAllDemoAccounts = async () => {
  const results = [];
  
  for (const account of demoAccounts) {
    const result = await createDemoAccount(account);
    results.push(result);
    
    // Delay giữa các request để tránh spam
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
};

// Hàm tạo tất cả danh mục demo
export const createAllDemoCategories = async () => {
  const results = [];
  
  for (const category of demoCategories) {
    const result = await createDemoCategory(category);
    results.push(result);
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
};

// Hàm tạo tất cả sản phẩm demo
export const createAllDemoProducts = async () => {
  const results = [];
  
  for (const product of demoProducts) {
    const result = await createDemoProduct(product);
    results.push(result);
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
};

// Hàm tạo tất cả dữ liệu demo
export const createAllDemoData = async () => {
  const results = [];
  
  // Tạo danh mục trước
  const categoryResults = await createAllDemoCategories();
  results.push(...categoryResults);
  
  // Đợi một chút rồi tạo sản phẩm
  await new Promise(resolve => setTimeout(resolve, 2000));
  const productResults = await createAllDemoProducts();
  results.push(...productResults);
  
  return results;
};

export default {
  demoAccounts,
  demoCategories,
  demoProducts,
  createDemoAccount,
  createDemoCategory,
  createDemoProduct,
  createAllDemoAccounts,
  createAllDemoCategories,
  createAllDemoProducts,
  createAllDemoData
};
