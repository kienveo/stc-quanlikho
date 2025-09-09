package com.example.stc_quanliko.service.impl;

import com.example.stc_quanliko.dto.request.order.ProductOrderCreateRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderSearchRequest;
import com.example.stc_quanliko.dto.request.order.ProductOrderUpdateRequest;
import com.example.stc_quanliko.dto.request.order.StartShippingRequest;
import com.example.stc_quanliko.dto.request.orderdetail.ProductOrderDetailRequest;
import com.example.stc_quanliko.dto.response.order.ProductOrderListResponse;
import com.example.stc_quanliko.dto.response.order.ProductOrderResponse;
import com.example.stc_quanliko.dto.response.orderdetail.ProductOrderDetailListResponse;
import com.example.stc_quanliko.entity.CategoryModel;
import com.example.stc_quanliko.entity.ProductCategoryModel;
import com.example.stc_quanliko.entity.ProductOrderDetailModel;
import com.example.stc_quanliko.entity.ProductOrderModel;
import com.example.stc_quanliko.repository.*;
import com.example.stc_quanliko.service.ProductOrderService;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import com.example.stc_quanliko.utils.ErrorCode;
import com.example.stc_quanliko.utils.ErrorData;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.print.attribute.standard.JobState;
import javax.tools.Diagnostic;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.example.stc_quanliko.service.impl.ProductOrderDetailServiceImpl.*;
import static com.example.stc_quanliko.utils.DateTimeUtils.addSevenHours;
import static jdk.internal.vm.Continuation.PreemptStatus.SUCCESS;

@Service
@RequiredArgsConstructor
public abstract class ProductOrderServiceImpl implements ProductOrderService {

    private static final ErrorCode PRODUCT_ORDER_NOT_FOUND = null;;
    private static final ErrorCode PRODUCT_CATEGORY_NOT_FOUND = null;
    final private IUsersRepository IUsersRepository;
    final private IProductOrderRepository IProductOrderRepository;
    final private IProductOrderDetailRepository IProductOrderDetailRepository;
    final private IProductCategoryRepository IProductCategoryRepository;
    private final ICategoryRepository ICategoryRepository;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final String MONEY = "MONEY";
    private static final int TRACKING_NUMBER_LENGTH = 12;
    private static final String DEFAULT_SORT_FIELD = "orderDate";
    private Object TypeStatusOrder;


    @Override
    public ApiResponse<Object> getAllProductOrder() {
        List<ProductOrderModel> productsOrderModels = IProductOrderRepository.findAllByIsDelete(Boolean.FALSE);
        LocalDateTime now = LocalDateTime.now();
        JobState TypeStatusOrder = null;
        productsOrderModels = productsOrderModels.stream()
                .filter(order -> (order.getStatus().equals(TypeStatusOrder.toString()) ||
                        (order.getStatus().equals(TypeStatusOrder.PENDING.toString()) &&
                                order.getOrderDate().isAfter(now.minusHours(24)))))
                .collect(Collectors.toList());
        List<ProductOrderListResponse> productOrderListResponse = new ArrayList<>();
        for (ProductOrderModel productOrder : productsOrderModels) {
            productOrderListResponse.add(ProductOrderListResponse.builder()
                    .productOrderId(productOrder.getProductOrderId())
                    .userId(productOrder.getUserId())
                    .fullName(productOrder.getFullName())
                    .email(productOrder.getEmail())
                    .phoneNumber(productOrder.getPhoneNumber())
                    .totalAmount(productOrder.getTotalAmount())
                    .shippingAddress(productOrder.getShippingAddress())
                    .note(productOrder.getNote())
                    .status(productOrder.getStatus())
                    .orderDate(addSevenHours(productOrder.getOrderDate()))
                    .trackingNumber(productOrder.getTrackingNumber())
                    .isDelete(productOrder.getIsDelete())
                    .build());
        }
        productOrderListResponse = productOrderListResponse.stream()
                .sorted(Comparator.comparing(ProductOrderListResponse::getOrderDate).reversed())
                .collect(Collectors.toList());
        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productOrderListResponse", productOrderListResponse);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> createProductOrder(ProductOrderCreateRequest request) {
        if (Objects.nonNull(request.getUserId()) && !request.getUserId().isEmpty()) {
            IUsersRepository.findById(request.getUserId()).orElseThrow(() -> {
                Diagnostic<Object> USER_NOT_FOUND = null;
                var errorMapping = ErrorData.builder()
                        .errorKey1(USER_NOT_FOUND.getCode())
                        .build();
                return new ServiceSecurityException(USER_NOT_FOUND);
            });
        }
        var totalAmount = 0.0;

        var productOrderId = UUID.randomUUID().toString().replaceAll("-", "");
        JobState TypeStatusOrder = null;
        var productOrder = ProductOrderModel.builder()
                .productOrderId(productOrderId)
                .userId(request.getUserId())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .totalAmount(totalAmount)
                .shippingAddress(request.getShippingAddress())
                .note(request.getNote())
                .orderDate(LocalDateTime.now())
                .trackingNumber(generateTrackingNumber())
                .status(TypeStatusOrder.PENDING.toString())
                .isDelete(Boolean.FALSE)
                .build();
        IProductOrderRepository.save(productOrder);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productOrderId", productOrderId);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> getProductOrderByIdDetail(String productOrderId) {
        var productsOrderModel = IProductOrderRepository.findByProductOrderIdAndIsDelete(productOrderId, Boolean.FALSE);
        if (Objects.isNull(productsOrderModel)) {
            var errorMapping = ErrorData.builder()
                    .errorKey2(PRODUCT_ORDER_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_NOT_FOUND);
        }

        ProductOrderResponse productOrderListResponse = getProductOrderResponse(productOrderId, productsOrderModel);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, productOrderListResponse);
        return response;
    }

    @Override
    public ApiResponse<Object> checkTrackingNumber(String trackingNumber) {
        var productsOrderModel = IProductOrderRepository.findByTrackingNumberAndIsDelete(trackingNumber, Boolean.FALSE);
        if (Objects.isNull(productsOrderModel)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_ORDER_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_NOT_FOUND);
        }
        ProductOrderResponse productOrderListResponse = getProductOrderResponse(productsOrderModel.getProductOrderId(), productsOrderModel);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, productOrderListResponse);
        return response;
    }

    @Override
    public ApiResponse<Object> updateProductOrderStatus(ProductOrderUpdateRequest request) {
        var productsOrderModel = IProductOrderRepository.findByProductOrderIdAndIsDelete(request.getProductOrderId(), Boolean.FALSE);
        if (Objects.isNull(productsOrderModel)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_ORDER_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_NOT_FOUND);
        }

        Map<String, Integer> requestChangeMap = request.getProductOrderDetails().stream().collect(Collectors.toMap(ProductOrderDetailRequest::getProductCategoryId, ProductOrderDetailRequest::getQuantity));
        List<ProductOrderDetailModel> pods = IProductOrderDetailRepository.findAllByProductOrderId(request.getProductOrderId());
        if (!CollectionUtils.isEmpty(request.getProductOrderDetails()) && productsOrderModel.getStatus().equalsIgnoreCase(TypeStatusOrder.toString())) {
            Function<? super ProductOrderDetailModel, ? extends String> keyMapper = (Function<? super ProductOrderDetailModel, ? extends String>) productOrderDetailModel1 -> productOrderDetailModel1.getProductCategoryId().toString();
            Map<String, Integer> savedMap = new HashMap<>();
            for (ProductOrderDetailModel productOrderDetailModel : pods) {
                if (savedMap.put(keyMapper.apply(productOrderDetailModel), productOrderDetailModel.getQuantity()) != null) {
                    throw new IllegalStateException("Duplicate key");
                }
            }
            List<String> productCategoryIds = new ArrayList<>();
            Function<? super ProductOrderDetailModel, ? extends String> mapper = (Function<? super ProductOrderDetailModel, ? extends String>) ProductOrderDetailModel::getProductCategoryId;
            for (ProductOrderDetailModel productOrderDetailModel : pods) {
                String s = mapper.apply(productOrderDetailModel);
                productCategoryIds.add(s);
            }
            List<ProductCategoryModel> pcs = IProductCategoryRepository.findAllByProductCategoryIdIn(productCategoryIds);
            for (ProductCategoryModel pc : pcs) {
                String productCategoryId = pc.getProductCategoryId();
                if (requestChangeMap.containsKey(productCategoryId) && savedMap.containsKey(productCategoryId)) {
                    int newQuantity = pc.getQuantity() + savedMap.get(productCategoryId) - requestChangeMap.get(productCategoryId);
                    pc.setQuantity(newQuantity);
                }
            }
            IProductCategoryRepository.saveAll(pcs);
            for (ProductOrderDetailModel pod : pods) {
                if (requestChangeMap.containsKey(pod.getProductCategoryId())) {
                    pod.setQuantity(requestChangeMap.get(pod.getProductCategoryId()));
                }
            }
        } else {

            for (ProductOrderDetailModel pod : pods) {
                if (requestChangeMap.containsKey(pod.getProductCategoryId())) {
                    pod.setQuantity(requestChangeMap.get(pod.getProductCategoryId()));
                }
            }
        }
        IProductOrderDetailRepository.saveAll(pods);


        productsOrderModel.setStatus(request.getStatus());
        IProductOrderRepository.save(productsOrderModel);
        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productOrderId", request.getProductOrderId());
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> deleteProductOrderById(String productOrderId) {
        var productsOrderModel = IProductOrderRepository.findByProductOrderIdAndIsDelete(productOrderId, Boolean.FALSE);
        if (Objects.isNull(productsOrderModel)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_ORDER_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_NOT_FOUND);
        }
        productsOrderModel.setIsDelete(Boolean.TRUE);
        IProductOrderRepository.save(productsOrderModel);
        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productOrderId", productOrderId);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> getAllProductOrderPage(ProductOrderSearchRequest request) {
        var mapper = new ObjectMapper();
        var json = mapper.createObjectNode();

        Pageable pageable;

        if (request.getSortBy() == null || request.getSortBy().isEmpty()) {
            request.setSortBy(DEFAULT_SORT_FIELD);
        }

        if (request.getSortDirection() == null || request.getSortDirection().isEmpty()) {
            request.setSortDirection("asc");
        }

        if (request.getSortDirection().equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(Integer.parseInt(request.getPageNumber()) - 1, Integer.parseInt(request.getPageSize()), Sort.by(request.getSortBy()).descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(request.getPageNumber()) - 1, Integer.parseInt(request.getPageSize()), Sort.by(request.getSortBy()).ascending());
        }

        Page<ProductOrderModel> productsOrderModels = IProductOrderRepository.findByProductOrderIdAndStatusAndIsDelete(request.getProductOrderId(), request.getStatus(), Boolean.FALSE, pageable);
        var listProductOrderDetail = productsOrderModels.getContent();

        var productOrderDetailListResponse = new ArrayList<ProductOrderResponse>();
        listProductOrderDetail.forEach(productOrder -> productOrderDetailListResponse.add(this.getProductOrderResponse(productOrder.getProductOrderId(), productOrder)));

        json.putPOJO("page_number", request.getPageNumber());
        json.putPOJO("total_records", productsOrderModels.getTotalElements());
        json.putPOJO("page_size", request.getPageSize());
        json.putPOJO("list_product_order", productOrderDetailListResponse);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);

        return response;
    }

    @Override
    public ApiResponse<Object> getProductOrderStatusByIdDetail(String productOrderId) {
        var productsOrderModel = IProductOrderRepository.findByProductOrderIdAndIsDelete(productOrderId, Boolean.FALSE);
        if (Objects.isNull(productsOrderModel)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_ORDER_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_NOT_FOUND);
        }

        ProductOrderListResponse productOrderListResponse = ProductOrderListResponse.builder()
                .productOrderId(productsOrderModel.getProductOrderId())
                .userId(productsOrderModel.getUserId())
                .fullName(productsOrderModel.getFullName())
                .email(productsOrderModel.getEmail())
                .phoneNumber(productsOrderModel.getPhoneNumber())
                .totalAmount(productsOrderModel.getTotalAmount())
                .shippingAddress(productsOrderModel.getShippingAddress())
                .note(productsOrderModel.getNote())
                .status(productsOrderModel.getStatus())
                .orderDate(productsOrderModel.getOrderDate())
                .isDelete(productsOrderModel.getIsDelete())
                .build();

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, productOrderListResponse);
        return response;
    }

    @Override
    public ApiResponse<Object> startShipping(StartShippingRequest request) {
        List<ProductCategoryModel> pcList = new ArrayList<>();
        String productOrderId = "";
        if (!CollectionUtils.isEmpty(request.getDetailRequests())) {
            productOrderId = request.getDetailRequests().get(0).getProductOrderId();
        }
        var productsOrderModel = IProductOrderRepository.findByProductOrderIdAndIsDelete(productOrderId, Boolean.FALSE);
        if (Objects.isNull(productsOrderModel)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_ORDER_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_NOT_FOUND);
        }
        for (ProductOrderDetailRequest data : request.getDetailRequests()) {
            var pc = IProductCategoryRepository.findById(data.getProductCategoryId()).orElseThrow(() -> {
                var errorMapping = ErrorData.builder()
                        .errorKey1(PRODUCT_CATEGORY_NOT_FOUND.getCode())
                        .build();
                return new ServiceSecurityException(PRODUCT_CATEGORY_NOT_FOUND);
            });
            pc.setQuantity(pc.getQuantity() - data.getQuantity());
            pcList.add(pc);
        }

        IProductCategoryRepository.saveAll(pcList);
        productsOrderModel.setStatus(TypeStatusOrder.toString());
        IProductOrderRepository.save(productsOrderModel);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, "Xuất kho thành công!");
        return response;
    }

    private ProductOrderResponse getProductOrderResponse(String productOrderId, ProductOrderModel productOrderModel) {
        var orderDetailModels = IProductOrderDetailRepository.findAllByProductOrderId(productOrderId);
        if (orderDetailModels.isEmpty()) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_ORDER_DETAIL_NOT_FOUND.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_ORDER_DETAIL_NOT_FOUND);
        }

        List<String> productCategoryIds = (List<String>) orderDetailModels.stream().map(ProductOrderDetailModel::getProductCategoryId);
        List<ProductCategoryModel> pods = IProductCategoryRepository.findAllByProductCategoryIdIn(productCategoryIds);
        Map<String, Integer> stockMap = pods.stream().collect(Collectors.toMap(ProductCategoryModel::getProductCategoryId, ProductCategoryModel::getQuantity));
        Function<? super ProductCategoryModel, ? extends String> valueMapper = (Function<? super ProductCategoryModel, ? extends String>) productCategoryModel -> productCategoryModel.getCategoryId().toString();
        Map<String, String> categoryMap = new HashMap<>();
        for (ProductCategoryModel pod : pods) {
            if (categoryMap.put(pod.getProductCategoryId(), valueMapper.apply(pod)) != null) {
                throw new IllegalStateException("Duplicate key");
            }
        }
        List<Object> categoryIds = Collections.singletonList(pods.stream().map(ProductCategoryModel::getCategoryId));
        List<CategoryModel> categories = ICategoryRepository.findAllByCategoryIdIn(categoryIds);
        Map<String, String> categoryNameMap = categories.stream().collect(Collectors.toMap(CategoryModel::getCategoryId, CategoryModel::getCategoryName));

        List<ProductOrderDetailListResponse> productOrderDetailListResponses = new ArrayList<>();
        for(ProductOrderDetailModel productOrderDetail : orderDetailModels) {
            productOrderDetailListResponses.add(ProductOrderDetailListResponse.builder()
                    .productOrderId(productOrderId)
                    .productCategoryId((String) productOrderDetail.getProductCategoryId())
                    .productName(productOrderDetail.getProductName())
                    .quantity(productOrderDetail.getQuantity())
                    .price(productOrderDetail.getPrice())
                    .subtotal(productOrderDetail.getSubtotal())
                    .createDate(productOrderDetail.getCreateDate())
                    .stock(stockMap.get(productOrderDetail.getProductCategoryId() == null ? "" : productOrderDetail.getProductCategoryId()))
                    .categoryName(categoryNameMap.get(categoryMap.get(productOrderDetail.getProductCategoryId()) == null ? "" : categoryMap.get(productOrderDetail.getProductCategoryId())))
                    .build());
        }
        productOrderDetailListResponses = productOrderDetailListResponses.stream()
                .sorted(Comparator.comparing(ProductOrderDetailListResponse::getCategoryName)
                        .thenComparing(ProductOrderDetailListResponse::getProductName))
                .collect(Collectors.toList());
        return ProductOrderResponse.builder()
                .productOrderId(productOrderModel.getProductOrderId())
                .userId(productOrderModel.getUserId())
                .fullName(productOrderModel.getFullName())
                .email(productOrderModel.getEmail())
                .phoneNumber(productOrderModel.getPhoneNumber())
                .totalAmount(productOrderModel.getTotalAmount())
                .shippingAddress(productOrderModel.getShippingAddress())
                .note(productOrderModel.getNote())
                .status(productOrderModel.getStatus())
                .orderDate(productOrderModel.getOrderDate())
                .isDelete(productOrderModel.getIsDelete())
                .productOrderDetailListResponses(productOrderDetailListResponses)
                .build();
    }

    public static String generateTrackingNumber() {
        StringBuilder trackingNumber = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < TRACKING_NUMBER_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            trackingNumber.append(CHARACTERS.charAt(index));
        }
        return trackingNumber.toString();
    }
}
