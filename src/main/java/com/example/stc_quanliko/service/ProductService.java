package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.products.ProductCreateRequest;
import com.example.stc_quanliko.dto.request.products.ProductUpdateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    ResponseEntity<Object> getAllProductDetail();

    ResponseEntity<Object> createProduct(ProductCreateRequest request);

    ResponseEntity<Object> updateProduct(ProductUpdateRequest request);

    ResponseEntity<Object> deleteProductById(String productId);

    ResponseEntity<Object> importExcel(MultipartFile file);
}
