package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.products.ProductCreateRequest;
import com.example.stc_quanliko.dto.request.products.ProductUpdateRequest;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.CsvValidationException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {

    ApiResponse<Object> getAllProductDetail();

    ApiResponse<Object> createProduct(ProductCreateRequest request);

    ApiResponse<Object> updateProduct(ProductUpdateRequest request);

    ApiResponse<Object> deleteProductById(String productId);

    ApiResponse<Object> importExcel(MultipartFile file) throws IOException, CsvValidationException;
}
