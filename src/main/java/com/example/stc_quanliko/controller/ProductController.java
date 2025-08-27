package com.example.stc_quanliko.controller;

import com.example.stc_quanliko.dto.request.products.ProductUpdateRequest;
import com.example.stc_quanliko.dto.request.products.ProductCreateRequest;
import com.example.stc_quanliko.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.validation.Validator;



@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final Validator validator;

    @GetMapping("/un_auth/product/product_list")
    public ResponseEntity<Object> getAllProductDetail() {
        return ResponseEntity.ok(productService.getAllProductDetail());
    }

    @PostMapping("/un_auth/product/create")
    public ResponseEntity<Object> createProduct(@RequestBody ProductCreateRequest request) {
        this.validateRequest(request);
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @PostMapping("/un_auth/product/product_update")
    public ResponseEntity<Object> updateProduct(@RequestBody ProductUpdateRequest request) {
        this.validateRequest(request);
        return ResponseEntity.ok(productService.updateProduct(request));
    }

    @DeleteMapping("/un_auth/product/delete/{product_id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("product_id") String productId) {
        return ResponseEntity.ok(productService.deleteProductById(productId));
    }

    @PostMapping("/un_auth/product/import")
    public ResponseEntity<Object> importProducts(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(productService.importExcel(file));
    }

    private <T> void validateRequest(T request) {
        var violations = validator.validate(request);
        if (!violations.isEmpty()) throw new ServiceSecurityException(violations);
    }
}
