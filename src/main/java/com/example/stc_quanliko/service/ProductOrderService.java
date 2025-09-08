package com.example.stc_quanliko.service;

import com.example.stc_quanliko.dto.request.order.ProductOrderCreateRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderSearchRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderUpdateRequest;
import com.example.stc_quanliko.dto.request.order.StartShippingRequest;
import com.example.stc_quanliko.service.exception.ApiResponse;

public interface ProductOrderService {

    ApiResponse<Object> getAllProductOrder();

    ApiResponse<Object> createProductOrder(ProductOrderCreateRequest request);

    ApiResponse<Object> getProductOrderByIdDetail(String productOrderId);

    ApiResponse<Object> checkTrackingNumber(String trackingNumber);

    ApiResponse<Object> updateProductOrderStatus(ProductOrderUpdateRequest request);

    ApiResponse<Object> deleteProductOrderById(String productOrderId);

    ApiResponse<Object> getAllProductOrderPage(ProductOrderSearchRequest request);

    ApiResponse<Object> getProductOrderStatusByIdDetail(String productOrderId);

    ApiResponse<Object> startShipping(StartShippingRequest request);
}
