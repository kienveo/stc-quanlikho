package com.example.stc_quanliko.service;

import com.example.stc_quanliko.dto.request.ProductCategoryRequest;
import com.example.stc_quanliko.dto.request.productcategory.ProductCategoryImportRequest;
import com.example.stc_quanliko.service.exception.ApiResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ProductCategoryService {
        ApiResponse<Object> getAllProductCategory();
        ApiResponse<Object> createProductCategory(ProductCategoryRequest request);
        ApiResponse<Object> updateProductCategory(ProductCategoryRequest request);
        ApiResponse<Object> deleteProductCategoryById(String id);
        ApiResponse<Object> getAllProductCategoryByCategoryId(String categoryId, String type);

        ApiResponse<Object> importExcel(ProductCategoryImportRequest request);

        ApiResponse<Object> verifyImportProducts(String categoryId, MultipartFile file);
    }

