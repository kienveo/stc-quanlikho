package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.categories.CategoryCreateRequest;
import com.example.stc_quanliko.dto.request.categories.CategoryUpdateRequest;
import org.springframework.http.ResponseEntity;

public interface CategoryService {

    ResponseEntity<Object> getAllCategories();

    ResponseEntity<Object> createCategories(CategoryCreateRequest request);

    ResponseEntity<Object> updateCategory(CategoryUpdateRequest request);

    ResponseEntity<Object> deleteCategoryById(String categoryId);

    ResponseEntity<Object> deleteProductCategoryByCategoryId(String categoryId);
}
