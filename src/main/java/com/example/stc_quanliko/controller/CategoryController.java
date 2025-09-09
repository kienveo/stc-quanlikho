package com.example.stc_quanliko.controller;


import com.example.stc_quanliko.dto.request.categories.CategoryCreateRequest;
import com.example.stc_quanliko.dto.request.categories.CategoryUpdateRequest;
import com.example.stc_quanliko.service.CategoryService;
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
public class CategoryController {

    private final CategoryService categoryService;
    private final Validator validator;

    @GetMapping("/un_auth/category/all")
    public ResponseEntity<Object> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }


    @PostMapping("/un_auth/category/category_create")
    public ResponseEntity<Object> createCategory(@RequestBody CategoryCreateRequest request) {
        this.validateRequest(request);
        return ResponseEntity.ok(categoryService.createCategories(request));
    }

    @PostMapping("/un_auth/category/category_update")
    public ResponseEntity<Object> updateCategoriesDetail(@RequestBody CategoryUpdateRequest request) {
        this.validateRequest(request);
        return ResponseEntity.ok(categoryService.updateCategory(request));
    }

    @DeleteMapping("/un_auth/category/delete/{category_id}")
    public ResponseEntity<Object> deleteCategory(@PathVariable("category_id") String categoryId) {
        return ResponseEntity.ok(categoryService.deleteCategoryById(categoryId));
    }

    @DeleteMapping("/un_auth/product_category/all/delete/{category_id}")
    public ResponseEntity<Object> deleteProductCategoryByCategoryId(@PathVariable("category_id") String categoryId) {
        return ResponseEntity.ok(categoryService.deleteProductCategoryByCategoryId(categoryId));
    }

    private <T> void validateRequest(T request) {
        Set<ConstraintViolation<T>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            throw new ServiceSecurityException(violations);
        }
    }
}
