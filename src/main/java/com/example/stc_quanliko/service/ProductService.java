package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.products.ProductCreateRequest;
import com.example.stc_quanliko.dto.request.products.ProductUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {

    ResponseBody<Object> getAllProductDetail();

    ResponseBody<Object> createProduct(ProductCreateRequest request);

    ResponseBody<Object> updateProduct(ProductUpdateRequest request);

    ResponseBody<Object> deleteProductById(String productId);

    ResponseBody<Object> importExcel(MultipartFile file);
}
