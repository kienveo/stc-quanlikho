package com.example.stc_quanliko.service;

import com.example.stc_quanliko.dto.request.order.ProductOrderCreateRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderSearchRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderUpdateRequest;
import com.example.stc_quanliko.dto.request.order.StartShippingRequest;
import org.springframework.http.ResponseEntity;

public interface ProductOrderService {

    ResponseEntity<Object> getAllProductOrder();

    ResponseEntity<Object> createProductOrder(ProductOrderCreateRequest request);

    ResponseEntity<Object> getProductOrderByIdDetail(String productOrderId);

    ResponseEntity<Object> checkTrackingNumber(String trackingNumber);

    ResponseEntity<Object> updateProductOrderStatus(ProductOrderUpdateRequest request);

    ResponseEntity<Object> deleteProductOrderById(String productOrderId);

    ResponseEntity<Object> getAllProductOrderPage(ProductOrderSearchRequest request);

    ResponseEntity<Object> getProductOrderStatusByIdDetail(String productOrderId);

    ResponseEntity<Object> startShipping(StartShippingRequest request);
}
