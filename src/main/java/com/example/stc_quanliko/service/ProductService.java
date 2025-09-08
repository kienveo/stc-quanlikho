package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.products.ProductCreateRequest;
import com.example.stc_quanliko.dto.request.products.ProductUpdateRequest;
import com.example.stc_quanliko.service.impl.ResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    ResponseBody<Object> getAllProductDetail();

    ResponseBody<Object> createProduct(ProductCreateRequest request);

    ResponseBody<Object> updateProduct(ProductUpdateRequest request);

    @Transactional
    ResponseBody<Object> createProduct(ProductCreateRequest request);

    @Transactional
    ResponseBody<Object> createProduct(ProductCreateRequest request);

    ResponseBody<Object> deleteProductById(String productId);

    ResponseEntity<Object> importExcel(MultipartFile file);
}
