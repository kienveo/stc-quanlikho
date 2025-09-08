package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.categories.CategoryCreateRequest;
import com.example.stc_quanliko.dto.request.categories.CategoryUpdateRequest;
import com.example.stc_quanliko.service.impl.ResponseBody;

public interface CategoryService {

    ResponseBody<Object> getAllCategories();

    ResponseBody<Object> createCategories(CategoryCreateRequest request);

    ResponseBody<Object> updateCategory(CategoryUpdateRequest request);

    ResponseBody<Object> deleteCategoryById(String categoryId);

    ResponseBody<Object> deleteProductCategoryByCategoryId(String categoryId);
}
