package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.categories.CategoryCreateRequest;
import com.example.stc_quanliko.dto.request.categories.CategoryUpdateRequest;
import com.example.stc_quanliko.service.exception.ApiResponse;

public interface CategoryService {

    ApiResponse<Object> getAllCategories();

    ApiResponse<Object> createCategories(CategoryCreateRequest request);

    ApiResponse<Object> updateCategory(CategoryUpdateRequest request);

    ApiResponse<Object> deleteCategoryById(String categoryId);

    ApiResponse<Object> deleteProductCategoryByCategoryId(String categoryId);
}
