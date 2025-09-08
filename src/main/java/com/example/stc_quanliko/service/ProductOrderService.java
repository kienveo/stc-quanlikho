package com.example.stc_quanliko.service;

import com.example.stc_quanliko.dto.request.order.ProductOrderCreateRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderSearchRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderUpdateRequest;
import com.example.stc_quanliko.dto.request.order.StartShippingRequest;
import com.example.stc_quanliko.service.impl.ResponseBody;
import org.springframework.http.ResponseEntity;

public interface ProductOrderService {

    ResponseEntity<Object> getAllProductOrder();

    ResponseBody<Object> createProductOrder(ProductOrderCreateRequest request);

    ResponseEntity<Object> getProductOrderByIdDetail(String productOrderId);

    ResponseBody<Object> checkTrackingNumber(String trackingNumber);

    ResponseBody<Object> updateProductOrderStatus(ProductOrderUpdateRequest request);

    ResponseBody<Object> deleteProductOrderById(String productOrderId);

    ResponseBody<Object> getAllProductOrderPage(ProductOrderSearchRequest request);

    ResponseBody<Object> getProductOrderStatusByIdDetail(String productOrderId);

    ResponseBody<Object> startShipping(StartShippingRequest request);
}
