package com.example.stc_quanliko.service;

import com.example.stc_quanliko.dto.request.orderdetail.ProductOrderDetailCreateRequest;
import org.springframework.http.ResponseEntity;

public interface ProductOrderDetailService {

    ResponseEntity<Object> getProductOrderDetail(String productOrderId);

    ResponseEntity<Object> createProductOrderDetail(ProductOrderDetailCreateRequest request);
}
