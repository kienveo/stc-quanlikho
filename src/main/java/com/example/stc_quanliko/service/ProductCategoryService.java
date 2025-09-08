package com.example.stc_quanliko.service;

import com.example.stc_quanliko.dto.request.ProductCategoryRequest;
import com.example.stc_quanliko.dto.request.productcategory.ProductCategoryImportRequest;
import com.example.stc_quanliko.service.impl.ResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProductCategoryService {
        ResponseBody<Object> getAllProductCategory();
        ResponseBody<Object> createProductCategory(ProductCategoryRequest request);
        ResponseBody<Object> updateProductCategory(ProductCategoryRequest request);
        ResponseBody<Object> deleteProductCategoryById(String id);
        ResponseBody<Object> getAllProductCategoryByCategoryId(String categoryId, String type);

        ResponseBody<Object> importExcel(ProductCategoryImportRequest request);

        ResponseEntity<Object> verifyImportProducts(String categoryId, MultipartFile file);
    }

