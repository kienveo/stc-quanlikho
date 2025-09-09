package com.example.stc_quanliko.controller;


import com.example.stc_quanliko.dto.request.orderdetail.ProductOrderDetailCreateRequest;
import com.example.stc_quanliko.service.ProductOrderDetailService;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import jakarta.validation.ConstraintViolation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Validator;
import java.util.Set;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductOrderDetailController {

    private final ProductOrderDetailService productOrderDetailService;
    private final Validator validator;

    @PostMapping("/un_auth/product_order_detail/create")
    public ResponseEntity<Object> createProductOrderDetail(@RequestBody ProductOrderDetailCreateRequest request) {
        this.validateRequest(request);
        return ResponseEntity.ok(productOrderDetailService.createProductOrderDetail(request));
    }

    @GetMapping("/un_auth/product_order_detail/{product_order_id}")
    public ResponseEntity<Object> getProductOrderDetail(@PathVariable("product_order_id") String productOrderId) {
        return ResponseEntity.ok(productOrderDetailService.getProductOrderDetail(productOrderId));
    }

    private <T> void validateRequest(T request) {
        Set<ConstraintViolation<T>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            throw new ServiceSecurityException(violations);
        }
    }
}
