package com.example.stc_quanliko.controller;


import com.example.stc_quanliko.dto.request.ProductCategoryRequest;
import com.example.stc_quanliko.dto.request.productcategory.ProductCategoryImportRequest;
import com.example.stc_quanliko.service.ProductCategoryService;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import jakarta.validation.ConstraintViolation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Validator;
import java.util.Set;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;
    private final Validator validator;
    @GetMapping("/un_auth/product_category/all")
    public ResponseEntity<Object> getAllProductCategory() {
        return ResponseEntity.ok(productCategoryService.getAllProductCategory());
    }

    @GetMapping("/un_auth/product_category/{category_id}/{type}")
    public ResponseEntity<Object> getAllProductCategoryByCategoryId(@PathVariable("category_id") String categoryId, @PathVariable("type") String type) {
        return ResponseEntity.ok(productCategoryService.getAllProductCategoryByCategoryId(categoryId, type));
    }

    @PostMapping("/un_auth/product_category/create")
    public ResponseEntity<Object> createProductCategory(@RequestBody ProductCategoryRequest request) {
        this.validateRequest(request);
        return ResponseEntity.ok(productCategoryService.createProductCategory(request));
    }

    @PostMapping("/un_auth/product_category/update")
    public ResponseEntity<Object> updateProductCategory(@RequestBody ProductCategoryRequest request) {
        this.validateRequest(request);
        return ResponseEntity.ok(productCategoryService.updateProductCategory(request));
    }

    @DeleteMapping("/un_auth/product_category/delete/{category_id}")
    public ResponseEntity<Object> deleteProductCategory(@PathVariable("category_id") String categoryId) {
        return ResponseEntity.ok(productCategoryService.deleteProductCategoryById(categoryId));
    }

    @PostMapping("/un_auth/product_category/import")
    public ResponseEntity<Object> importProducts(@RequestBody ProductCategoryImportRequest request) {
        return ResponseEntity.ok(productCategoryService.importExcel(request));
    }

    @PostMapping("/un_auth/product_category/import/verify/{category_id}")
    public ResponseEntity<Object> verifyImportProducts(@PathVariable("category_id") String categoryId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(productCategoryService.verifyImportProducts(categoryId, file));
    }

    private <T> void validateRequest(T request) {
        Set<ConstraintViolation<T>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            throw new ServiceSecurityException(violations);
        }
    }
}
