package com.example.stc_quanliko.service.impl;

import com.example.stc_quanliko.dto.request.products.ProductCreateRequest;
import com.example.stc_quanliko.dto.request.products.ProductUpdateRequest;
import com.example.stc_quanliko.dto.response.product.ProductDetailListResponse;
import com.example.stc_quanliko.entity.ProductModel;
import com.example.stc_quanliko.repository.ICategoryRepository;
import com.example.stc_quanliko.repository.IProductCategoryRepository;
import com.example.stc_quanliko.repository.IProductRepository;
import com.example.stc_quanliko.service.ProductService;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.CSVReader;
import com.example.stc_quanliko.service.exception.CsvValidationException;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import com.example.stc_quanliko.utils.ErrorCode;
import com.example.stc_quanliko.utils.ErrorData;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.*;

import static com.example.stc_quanliko.utils.DateTimeUtils.convertToGMTPlus7;
import static jdk.internal.vm.Continuation.PreemptStatus.SUCCESS;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private static final ErrorCode PRODUCT_NAME_EXIST = null;
    private static final ErrorCode PRODUCT_NOT_FOUND = null;
    private final IProductRepository IProductRepository;
    private final ICategoryRepository ICategoryRepository;
    private final IProductCategoryRepository IProductCategoryRepository;
    private static final String DEFAULT_SORT_FIELD = "createDate";


    @Override
    public ApiResponse<Object> getAllProductDetail() {
        var productsModels = IProductRepository.findAll();
        var productDetailListResponse = new ArrayList<ProductDetailListResponse>();
        productsModels.forEach(product -> {
            List<String> keywords = new ArrayList<>();
        for (String item : product.getKeyword().split("\n")) {
            keywords.add(item.trim());
        }
            productDetailListResponse.add(ProductDetailListResponse.builder()
                    .productId(product.getProductId())
                    .productName(product.getProductName())
                    .createDate(convertToGMTPlus7(product.getCreateDate()))
                    .modifyDate(convertToGMTPlus7(product.getModifyDate()))
                    .keywords(keywords)
                    .build());
        });


        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, productDetailListResponse);
        return response;
    }

    @Transactional
    @Override
    public ApiResponse<Object> createProduct(ProductCreateRequest request) {
        var existsProductName = IProductRepository.existsByProductName(request.getProductName());

        if (existsProductName) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_NAME_EXIST.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_NAME_EXIST);
        }

        String productId = UUID.randomUUID().toString().replaceAll("-", "");

        var productsModel = ProductModel.builder()
                .productId(productId)
                .productName(request.getProductName())
                .keyword(request.getKeywords() != null ? String.join("\n", request.getKeywords()) : "")
                .genericName(request.getGenericName() != null ? String.join("\n", request.getGenericName()) : "")
                .createDate(LocalDateTime.now())
                .build();

        IProductRepository.save(productsModel);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productId", productId);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Transactional
    @Override
    public ApiResponse<Object> updateProduct(ProductUpdateRequest request) {
        var productsModel = IProductRepository.findById(request.getProductId()).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(PRODUCT_NOT_FOUND);
        });

        if (Objects.nonNull(request.getProductName())) {
            this.validateProductName(request.getProductName(), productsModel.getProductName());
        }

        String keyword = request.getKeywords() != null ? String.join("\n", request.getKeywords()) : "";
        String genericName = request.getGenericName() != null ? String.join("\n", request.getGenericName()) : "";
        productsModel.setProductName(request.getProductName());
        productsModel.setModifyDate(LocalDateTime.now());
        productsModel.setKeyword(keyword);
        productsModel.setGenericName(genericName);
        IProductRepository.save(productsModel);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productId", productsModel.getProductId());

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Transactional
    @Override
    public ApiResponse<Object> deleteProductById(String productId) {
        IProductRepository.findById(productId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(PRODUCT_NOT_FOUND);
        });
        IProductCategoryRepository.deleteAllByProduct_ProductId((productId));
        IProductRepository.deleteById(productId);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productId", productId);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> importExcel(MultipartFile file) throws IOException, CsvValidationException {

        Map<String, String> resultMap = new HashMap<>();

        try (CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] nextLine;
            while ((nextLine = csvReader.readNext()) != null) {
                if (nextLine.length >= 2) {
                    String key = nextLine[0];
                    String value = nextLine[1].trim();

                    resultMap.put(key, value);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        List<ProductModel> products = new ArrayList<>();
        for (String key : resultMap.keySet()) {
            ProductModel product = ProductModel.builder()
                    .productId(UUID.randomUUID().toString().replaceAll("-", ""))
                    .productName(key).keyword(resultMap.get(key))
                    .createDate(LocalDateTime.now())
                    .modifyDate(LocalDateTime.now())
                    .build();
            products.add(product);
        }

        IProductRepository.saveAll(products);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, "Import thành công!");
        return response;

    }
//    @Override
//    public ResponseBody<Object> importExcel1(MultipartFile file) {
//        Map<String, List<String>> resultMap = new HashMap<>();
//
//        try (CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
//            String[] nextLine;
//            while ((nextLine = csvReader.readNext()) != null) {
//                if (nextLine.length >= 2) {
//                    String key = nextLine[0];
//                    String value = nextLine[1];
//
//                    List<String> valuesList = new ArrayList<>();
//                    for (String item : value.split("\n")) {
//                        valuesList.add(item.trim());
//                    }
//
//                    resultMap.put(key, valuesList);
//                }
//            }
//
//
//    } catch (IOException | CsvValidationException e) {
//            throw new RuntimeException(e);
//        }
//        System.out.println(resultMap);
//        var response = new ResponseBody<>();
//        response.setOperationSuccess(SUCCESS, resultMap);
//        return response;
//
//    }

    private void validateProductName(String productName, String productNamePresent) {
        var existsProductName = IProductRepository.existsByProductName(productName);
        if (!Objects.equals(productName, productNamePresent) && existsProductName) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_NAME_EXIST.getCode())
                    .build();
            throw new ServiceSecurityException(PRODUCT_NAME_EXIST);
        }
    }
}
