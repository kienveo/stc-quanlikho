package com.example.stc_quanliko.service.impl;


import com.example.stc_quanliko.dto.request.categories.CategoryCreateRequest;
import com.example.stc_quanliko.dto.request.categories.CategoryUpdateRequest;
import com.example.stc_quanliko.dto.response.categories.CategoryListDetailResponse;
import com.example.stc_quanliko.dto.response.categories.CategoryResponse;
import com.example.stc_quanliko.entity.CategoryModel;
import com.example.stc_quanliko.repository.ICategoryRepository;
import com.example.stc_quanliko.repository.IProductCategoryRepository;
import com.example.stc_quanliko.service.CategoryService;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import com.example.stc_quanliko.utils.ErrorCode;
import com.example.stc_quanliko.utils.ErrorData;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static com.example.stc_quanliko.utils.DateTimeUtils.convertToGMTPlus7;
import static jdk.internal.vm.Continuation.PreemptStatus.SUCCESS;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private static final ErrorCode CATEGORY_NOT_FOUND = null;
    private static final ErrorCode CATEGORY_NAME_EXIST = null;
    private final ICategoryRepository ICategoryRepository;
    private final IProductCategoryRepository IProductCategoryRepository;
    private static final String DEFAULT_SORT_FIELD = "categoryName";

    @Override
    public ApiResponse<Object> getAllCategories() {
        List<CategoryModel> categories = ICategoryRepository.findAll();
        if (Objects.isNull(categories)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(CATEGORY_NOT_FOUND);
        }
        List<CategoryResponse> categoryResponses = new ArrayList<>();
        for (CategoryModel category : categories) {
            var categoryResponse = CategoryResponse.builder()
                    .categoryId(category.getCategoryId())
                    .categoryName(category.getCategoryName())
                    .minQuantity(category.getMinQuantity())
                    .modifyDate(convertToGMTPlus7(category.getModifyDate()))
                    .build();
            categoryResponses.add(categoryResponse);
        }
        categoryResponses = categoryResponses.stream().sorted(Comparator.comparing(CategoryResponse::getCategoryName)).toList();
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, categoryResponses);
        return response;
    }

    @Override
    public ApiResponse<Object> createCategories(CategoryCreateRequest request) {
        var categoryModel = ICategoryRepository.existsByCategoryName(request.getCategoryName());
        if ((boolean) categoryModel) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NAME_EXIST.getCode())
                    .build();
            throw new ServiceSecurityException(CATEGORY_NAME_EXIST);
        }

        String categoryId = UUID.randomUUID().toString().replaceAll("-", "");
        var category = CategoryModel.builder()
                .categoryId(categoryId)
                .categoryName(request.getCategoryName())
                .minQuantity(request.getMinQuantity())
                .createDate(LocalDateTime.now())
                .build();
        ICategoryRepository.save(category);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("categoryId", categoryId);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> updateCategory(CategoryUpdateRequest request) {
        var categoriesModel = ICategoryRepository.findById(request.getCategoryId()).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(CATEGORY_NOT_FOUND);
        });
        this.validateCategoryName(request.getCategoryName(), categoriesModel.getCategoryName(), categoriesModel.getCategoryId());

        categoriesModel.setCategoryName(request.getCategoryName());
        categoriesModel.setMinQuantity(request.getMinQuantity());
        categoriesModel.setModifyDate(LocalDateTime.now());
        ICategoryRepository.save(categoriesModel);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("categoryId", request.getCategoryId());

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> deleteCategoryById(String categoryId) {
        var categoriesModel = ICategoryRepository.findById(categoryId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(CATEGORY_NOT_FOUND);
        });
        IProductCategoryRepository.deleteAllByCategory_CategoryId((categoryId));
        ICategoryRepository.deleteById(categoriesModel.getCategoryId());

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("categoryId", categoryId);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Transactional
    @Override
    public ApiResponse<Object> deleteProductCategoryByCategoryId(String categoryId) {
        var categoriesModel = ICategoryRepository.findById(categoryId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(CATEGORY_NOT_FOUND);
        });
        IProductCategoryRepository.deleteAllByCategory_CategoryId(categoryId);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("categoryId", categoryId);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    private CategoryListDetailResponse buildCategoryModelResponse(CategoryModel categoryModel) {
        CategoryListDetailResponse categoryListResponse = CategoryListDetailResponse.builder()
                .categoryId(categoryModel.getCategoryId())
                .categoryName(categoryModel.getCategoryName())
                .createDate(categoryModel.getCreateDate())
                .modifyDate(categoryModel.getModifyDate())
                .build();
        return categoryListResponse;
    }

    private void validateCategoryName(String categoryName, String categoryNamePresent, String categoryId) {
        var categoryModel = ICategoryRepository.findByCategoryName(categoryName);
        if (!categoryModel.getClass().equals(categoryId) && !Objects.equals(categoryName, categoryNamePresent) && !Objects.equals(categoryModel.getClass(), categoryNamePresent)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NAME_EXIST.getCode())
                    .build();
            throw new ServiceSecurityException(CATEGORY_NAME_EXIST);
        }
    }
}
