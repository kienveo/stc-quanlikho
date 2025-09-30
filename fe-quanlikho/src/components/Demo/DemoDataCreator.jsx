import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { showToast } from '../Common/Toast';
import Button from '../Common/Button';

const DemoDataCreator = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [createdData, setCreatedData] = useState([]);

  const demoCategories = [
    { name: 'Điện Thoại', description: 'Các loại điện thoại di động' },
    { name: 'Laptop', description: 'Máy tính xách tay' },
    { name: 'Phụ Kiện', description: 'Phụ kiện điện tử' },
    { name: 'Đồ Gia Dụng', description: 'Đồ dùng trong gia đình' },
    { name: 'Thời Trang', description: 'Quần áo, giày dép' }
  ];

  const demoProducts = [
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

  const createCategory = async (category) => {
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

  const createProduct = async (product) => {
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

  const handleCreateCategories = async () => {
    setIsCreating(true);
    setCreatedData([]);
    
    const results = [];
    
    for (const category of demoCategories) {
      const result = await createCategory(category);
      results.push(result);
      setCreatedData([...results]);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsCreating(false);
    
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;
    
    showToast(
      `Đã tạo ${successCount} danh mục thành công, ${errorCount} danh mục lỗi!`,
      { type: successCount > 0 ? 'success' : 'error' }
    );
  };

  const handleCreateProducts = async () => {
    setIsCreating(true);
    setCreatedData([]);
    
    const results = [];
    
    for (const product of demoProducts) {
      const result = await createProduct(product);
      results.push(result);
      setCreatedData([...results]);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsCreating(false);
    
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;
    
    showToast(
      `Đã tạo ${successCount} sản phẩm thành công, ${errorCount} sản phẩm lỗi!`,
      { type: successCount > 0 ? 'success' : 'error' }
    );
  };

  const handleCreateAllData = async () => {
    setIsCreating(true);
    setCreatedData([]);
    
    // Tạo danh mục trước
    await handleCreateCategories();
    
    // Đợi một chút rồi tạo sản phẩm
    await new Promise(resolve => setTimeout(resolve, 2000));
    await handleCreateProducts();
    
    setIsCreating(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">
                <i className="bi bi-database me-2"></i>
                Tạo Dữ Liệu Demo
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Hướng dẫn:</strong> Tạo dữ liệu demo bao gồm danh mục sản phẩm và sản phẩm mẫu để test các chức năng quản lý kho.
              </div>

              <div className="row mb-4">
                <div className="col-12">
                  <Button
                    onClick={handleCreateAllData}
                    disabled={isCreating}
                    variant="primary"
                    size="lg"
                    className="me-2"
                  >
                    {isCreating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-database me-2"></i>
                        Tạo Tất Cả Dữ Liệu Demo
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleCreateCategories}
                    disabled={isCreating}
                    variant="outline-primary"
                    size="lg"
                    className="me-2"
                  >
                    <i className="bi bi-tags me-2"></i>
                    Tạo Danh Mục Demo
                  </Button>
                  
                  <Button
                    onClick={handleCreateProducts}
                    disabled={isCreating}
                    variant="outline-success"
                    size="lg"
                  >
                    <i className="bi bi-box me-2"></i>
                    Tạo Sản Phẩm Demo
                  </Button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Danh Mục Demo</h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {demoCategories.map((category, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{category.name}</strong>
                              <br />
                              <small className="text-muted">{category.description}</small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Sản Phẩm Demo</h6>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Tên</th>
                              <th>Giá</th>
                              <th>Số lượng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {demoProducts.map((product, index) => (
                              <tr key={index}>
                                <td>
                                  <div>
                                    <strong>{product.name}</strong>
                                    <br />
                                    <small className="text-muted">{product.sku}</small>
                                  </div>
                                </td>
                                <td>
                                  {product.price.toLocaleString('vi-VN')}đ
                                </td>
                                <td>
                                  <span className="badge bg-info">{product.quantity}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {createdData.length > 0 && (
                <div className="mt-4">
                  <h5>Kết Quả Tạo Dữ Liệu:</h5>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Loại</th>
                          <th>Tên</th>
                          <th>Trạng Thái</th>
                          <th>Thông Báo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {createdData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <span className={`badge ${
                                item.type === 'category' ? 'bg-primary' : 'bg-success'
                              }`}>
                                {item.type === 'category' ? 'Danh Mục' : 'Sản Phẩm'}
                              </span>
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <span className={`badge ${
                                item.status === 'success' ? 'bg-success' : 'bg-danger'
                              }`}>
                                {item.status === 'success' ? 'Thành công' : 'Lỗi'}
                              </span>
                            </td>
                            <td>
                              <small className={
                                item.status === 'success' ? 'text-success' : 'text-danger'
                              }>
                                {item.message}
                              </small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDataCreator;
