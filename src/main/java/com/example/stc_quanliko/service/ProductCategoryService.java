package com.example.stc_quanliko.service;

import com.example.stc_quanliko.dto.request.ProductCategoryRequest;
import com.example.stc_quanliko.dto.request.productcategory.ProductCategoryImportRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProductCategoryService {
        ResponseEntity<Object> getAllProductCategory();
        ResponseEntity<Object> createProductCategory(ProductCategoryRequest request);
        ResponseEntity<Object> updateProductCategory(ProductCategoryRequest request);
        ResponseEntity<Object> deleteProductCategoryById(String id);
        ResponseEntity<Object> getAllProductCategoryByCategoryId(String categoryId, String type);
        ResponseEntity<Object> importExcel(ProductCategoryImportRequest request);
        ResponseEntity<Object> verifyImportProducts(String categoryId, MultipartFile file);
    }

