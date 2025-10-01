package com.example.stc_quanliko.service.impl;

import com.example.stc_quanliko.dto.request.orderdetail.ProductOrderDetailCreateRequest;
import com.example.stc_quanliko.dto.request.orderdetail.ProductOrderDetailRequest;
import com.example.stc_quanliko.dto.response.orderdetail.ProductOrderDetailListResponse;
import com.example.stc_quanliko.entity.CategoryModel;
import com.example.stc_quanliko.entity.ProductCategoryModel;
import com.example.stc_quanliko.entity.ProductOrderDetailModel;
import com.example.stc_quanliko.entity.ProductOrderModel;
import com.example.stc_quanliko.repository.*;
import com.example.stc_quanliko.service.ProductOrderDetailService;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import com.example.stc_quanliko.utils.ErrorCode;
import com.example.stc_quanliko.utils.ErrorData;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import static com.example.stc_quanliko.utils.DateTimeUtils.convertToGMTPlus7;
import static jdk.internal.vm.Continuation.PreemptStatus.SUCCESS;

@Service
@RequiredArgsConstructor
public class ProductOrderDetailServiceImpl implements ProductOrderDetailService {

    static final ErrorCode PRODUCT_ORDER_DETAIL_NOT_FOUND = null;
    private static final ErrorCode PRODUCT_ORDER_NOT_FOUND = null;
    private static final ErrorCode PRODUCT_CATEGORY_NOT_FOUND = null;
    final private IProductOrderDetailRepository IProductOrderDetailRepository;
    final private IProductOrderRepository IProductOrderRepository;
    final private IProductCategoryRepository IProductCategoryRepository;
    private final ICategoryRepository ICategoryRepository;

    @Override
    public ResponseEntity<Object> getProductOrderDetail(String productOrderId) {
        List<ProductOrderDetailModel> orderDetailModels = IProductOrderDetailRepository.findAllByProductOrderId(productOrderId);
        if (orderDetailModels.isEmpty()) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_ORDER_DETAIL_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_DETAIL_NOT_FOUND);
        }

        // 🛠️ Sửa lỗi: Lấy danh sách productCategoryIds từ đối tượng quan hệ
        List<String> productCategoryIds = orderDetailModels.stream()
                // Truy cập qua đối tượng Product Category đã được ánh xạ
                .map(model -> String.valueOf(model.getProductCategory().getProductCategoryId()))
                .toList();

        List<ProductCategoryModel> pods = IProductCategoryRepository.findAllByProductCategoryIdIn(productCategoryIds);
        Map<String, Integer> stockMap = pods.stream().collect(Collectors.toMap(ProductCategoryModel::getProductCategoryId, ProductCategoryModel::getQuantity));

        // 🛠️ Sửa lỗi: Lấy danh sách categoryIds từ đối tượng ProductCategoryModel
        List<String> categoryIds = pods.stream()
                // Truy cập CategoryId trong ProductCategoryModel
                .map(productCategoryModel -> productCategoryModel.getCategory().toString())
                .toList();

        // 🛠️ Sửa lỗi: Thay thế Collections.singletonList()
        List<CategoryModel> categories = ICategoryRepository.findAllByCategoryIdIn(Collections.singletonList(categoryIds));
        Map<String, String> categoryNameMap = categories.stream().collect(Collectors.toMap(CategoryModel::getCategoryId, CategoryModel::getCategoryName));

        List<ProductOrderDetailListResponse> productOrderDetailListResponses = new ArrayList<>();
        orderDetailModels.forEach(productOrderDetail -> {
            // Lấy ID từ đối tượng quan hệ
            ProductCategoryModel pc = productOrderDetail.getProductCategory();
            String currentProductCategoryId = String.valueOf(pc.getProductCategoryId());
            String currentCategoryId = String.valueOf(pc.getCategory()); // Dùng Category ID để lookup Category Name

            productOrderDetailListResponses.add(ProductOrderDetailListResponse.builder()
                    .productOrderId(productOrderId)
                    .productCategoryId(currentProductCategoryId) // Sử dụng ID lấy từ quan hệ
                    .productName(productOrderDetail.getProductName())
                    .quantity(productOrderDetail.getQuantity())
                    .price(productOrderDetail.getPrice())
                    .subtotal(productOrderDetail.getSubtotal())
                    .createDate(convertToGMTPlus7(productOrderDetail.getCreateDate()))
                    .stock(stockMap.getOrDefault(currentProductCategoryId, 0))
                    .categoryName(categoryNameMap.getOrDefault(currentCategoryId, "")) // Sử dụng Category ID đã sửa
                    .build());
        });

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productOrderDetailListResponses", productOrderDetailListResponses);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Object> createProductOrderDetail(ProductOrderDetailCreateRequest request) {
        List<ProductOrderDetailModel> pods = new ArrayList<>();
        for (ProductOrderDetailRequest data : request.getDetailRequests()) {
            ProductOrderModel productsOrderModel = IProductOrderRepository.findByProductOrderIdAndIsDelete(data.getProductOrderId(), Boolean.FALSE);
            if (Objects.isNull(productsOrderModel)) {
                var errorMapping = ErrorData.builder()
                        .errorKey1(PRODUCT_ORDER_NOT_FOUND.getCode())
                        .build();
                throw new ServiceSecurityException(PRODUCT_ORDER_NOT_FOUND);
            }

            // 🛠️ Sửa lỗi: Giả định dùng findByProductCategoryId vì data.getProductCategoryId() là String (Khóa Business)
            var pc = IProductCategoryRepository.findByProductCategoryId(data.getProductCategoryId()).orElseThrow(() -> {
                var errorMapping = ErrorData.builder()
                        .errorKey1(PRODUCT_CATEGORY_NOT_FOUND.getCode())
                        .build();
                return new ServiceSecurityException(PRODUCT_CATEGORY_NOT_FOUND);
            });

            String productOrderDetailId = UUID.randomUUID().toString().replaceAll("-", "");

            // 🛠️ Sửa lỗi: Loại bỏ các trường ID nguyên thủy và chỉ thiết lập đối tượng quan hệ
            ProductOrderDetailModel productOrderDetailModel = ProductOrderDetailModel.builder()
                    .productOrderDetailId(productOrderDetailId)
                    .productOrder(productsOrderModel)        // ✅ truyền object
                    .productCategory((ProductCategoryModel) pc)                     // ✅ truyền object
                    .productName(data.getProductName())
                    .quantity(data.getQuantity())
                    .price(data.getPrice())
                    .subtotal(data.getSubtotal())
                    .createDate(LocalDateTime.now())
                    .build();

            pods.add(productOrderDetailModel);
        }

        IProductOrderDetailRepository.saveAll(pods);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productOrderDetailList", pods);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return ResponseEntity.ok(response);
    }
}
