package com.example.stc_quanliko.service.impl;

import com.example.stc_quanliko.dto.request.ProductCategoryRequest;
import com.example.stc_quanliko.dto.request.productcategory.ProductCategoryImportRequest;
import com.example.stc_quanliko.dto.response.ProductCategoryResponse;
import com.example.stc_quanliko.dto.response.productcategory.ProductCategoryImportDataResponse;
import com.example.stc_quanliko.dto.response.productcategory.VerifyProductCategoryImportResponse;
import com.example.stc_quanliko.dto.response.productcategory.VerifyProductDto;
import com.example.stc_quanliko.entity.CategoryModel;
import com.example.stc_quanliko.entity.ProductCategoryModel;
import com.example.stc_quanliko.entity.ProductModel;
import com.example.stc_quanliko.repository.ICategoryRepository;
import com.example.stc_quanliko.repository.IProductCategoryRepository;
import com.example.stc_quanliko.repository.IProductRepository;
import com.example.stc_quanliko.service.ProductCategoryService;
import com.example.stc_quanliko.service.exception.sheet;
import com.example.stc_quanliko.service.exception.CSVReader;
import com.example.stc_quanliko.service.exception.CsvValidationException;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.Cell;
import com.example.stc_quanliko.service.exception.Row;
import com.example.stc_quanliko.service.exception.Workbook;
import com.example.stc_quanliko.service.exception.XSSFWorkbook;
import com.example.stc_quanliko.utils.ErrorCode;
import com.example.stc_quanliko.utils.ErrorData;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


import static com.example.stc_quanliko.utils.DateTimeUtils.convertToGMTPlus7;
import static jdk.internal.vm.Continuation.PreemptStatus.SUCCESS;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
    private static final ErrorCode CATEGORY_NAME_EXIST = null;
    private static final ErrorCode PRODUCT_CATEGORY_NOT_FOUND = null;
    private static final ErrorCode CATEGORY_NOT_FOUND = null;
    private final IProductCategoryRepository IProductCategoryRepository;
    private final IProductRepository IProductRepository;
    private final ICategoryRepository ICategoryRepository;

    public ProductCategoryServiceImpl(IProductCategoryRepository IProductCategoryRepository, IProductRepository IProductRepository,
                                      ICategoryRepository ICategoryRepository) {
        this.IProductCategoryRepository = IProductCategoryRepository;
        this.IProductRepository = IProductRepository;
        this.ICategoryRepository = ICategoryRepository;
    }

    @Override
    public ApiResponse<Object> getAllProductCategory() {
        List<ProductCategoryResponse> responses = IProductCategoryRepository.findAllIncludeProductName();
        responses.forEach(response -> {
            response.setCreateDate(convertToGMTPlus7(response.getCreateDate()));
            response.setModifyDate(convertToGMTPlus7(response.getModifyDate()));
        });
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, responses);
        return response;
    }

    @Override
    public ApiResponse<Object> createProductCategory(ProductCategoryRequest request) {
        var productCategory = IProductCategoryRepository.existsByProductIdAndCategoryId(request.getProductId(), request.getCategoryId());
        if (productCategory) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NAME_EXIST.getCode())
                    .build();
            throw new ServiceSecurityException(CATEGORY_NAME_EXIST);
        }

        String id = UUID.randomUUID().toString().replaceAll("-", "");
        var newProductCategory = ProductCategoryModel.builder()
                .productCategoryId(id)
                .categoryId(request.getCategoryId())
                .productId(request.getProductId())
                .maxLimit(request.getMaxLimit())
                .minLimit(request.getMinLimit())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .createDate(LocalDateTime.now())
                .build();
        IProductCategoryRepository.save(newProductCategory);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productCategoryId", newProductCategory);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> updateProductCategory(ProductCategoryRequest request) {
        var pcModel = IProductCategoryRepository.findById(request.getProductCategoryId()).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(PRODUCT_CATEGORY_NOT_FOUND);
        });

        pcModel.setQuantity(request.getQuantity());
        pcModel.setMinLimit(request.getMinLimit());
        pcModel.setMaxLimit(request.getMaxLimit());
        pcModel.setModifyDate(LocalDateTime.now());
        IProductCategoryRepository.save(pcModel);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productCategoryId", request.getCategoryId());
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> deleteProductCategoryById(String id) {
        var pcModel = IProductCategoryRepository.findById(id).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(PRODUCT_CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(PRODUCT_CATEGORY_NOT_FOUND);
        });
        IProductCategoryRepository.delete(pcModel);

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("productCategoryId", id);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> getAllProductCategoryByCategoryId(String categoryId, String type) {
        var categoriesModel = ICategoryRepository.findById(categoryId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(CATEGORY_NOT_FOUND);
        });
        List<ProductCategoryResponse> responses = IProductCategoryRepository.findAllIncludeProductNameByCategoryId(categoryId);
        List<String> productIds = responses.stream().map(ProductCategoryResponse::getProductId).toList();
        List<ProductModel> products = IProductRepository.findByProductIdIn(productIds);
        Map<String, List<String>> keywordMap = new HashMap<>();
        Map<String, List<String>> genericNameMap = new HashMap<>();
        products.forEach(product -> {
            List<String> keywords = new ArrayList<>();
            if(product.getKeyword() != null && !product.getKeyword().isEmpty()) {
                for (String item : product.getKeyword().split("\n")) {
                    keywords.add(item.trim());
                }
                keywordMap.put(product.getProductId(), keywords);
            }
            List<String> genericName = new ArrayList<>();
            if(product.getGenericName() != null && !product.getGenericName().isEmpty()) {
                for (String item : product.getGenericName().split("\n")) {
                    genericName.add(item.trim());
                }
                genericNameMap.put(product.getProductId(), genericName);
            }
        });
        responses.forEach(response -> {
            response.setCreateDate(convertToGMTPlus7(response.getCreateDate()));
            response.setModifyDate(convertToGMTPlus7(response.getModifyDate()));
            response.setKeywords(keywordMap.get(response.getProductId()) == null ? new ArrayList<>() : keywordMap.get(response.getProductId()));
            response.setGenericName(genericNameMap.get(response.getProductId()) == null ? new ArrayList<>() : genericNameMap.get(response.getProductId()));
        });
        responses = responses.stream()
                .sorted(Comparator.comparing(ProductCategoryResponse::getProductName))
                .collect(Collectors.toList());
        if (!type.equalsIgnoreCase("admin")) {
            responses = responses.stream().filter(product -> product.getQuantity() > product.getMinLimit())
                    .collect(Collectors.toList());
        }
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, responses);
        return response;
    }

    @Override
    public ApiResponse<Object> importExcel(ProductCategoryImportRequest request) {
        String categoryId = request.getCategoryId();
        ICategoryRepository.findById(categoryId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(CATEGORY_NOT_FOUND);
        });
        Map<String, String> resultMap = new HashMap<>();
        for (ProductCategoryImportDataResponse data : request.getImportData()) {
            resultMap.put(data.getSystemName(), String.valueOf(data.getQuantity()));
        }
        List<String> productNames = new ArrayList<>(resultMap.keySet());
        List<ProductModel> existProducts = IProductRepository.findByProductNameIn(productNames);

        List<String> existProductIds = existProducts.stream().map(ProductModel::getProductId).toList();
        List<ProductCategoryModel> productCategories = IProductCategoryRepository.findByProductIdIn(existProductIds, categoryId);
        Map<String, ProductCategoryModel> productCategoryMap = productCategories.stream()
                .collect(Collectors.toMap(ProductCategoryModel::getProductId, e -> e));

        List<ProductCategoryModel> productCategoryList = new ArrayList<>();
        for (ProductModel product : existProducts) {
            if (resultMap.containsKey(product.getProductName())) {
                ProductCategoryModel pc = new ProductCategoryModel();
                if (productCategoryMap.containsKey(product.getProductId())) {
                    pc = productCategoryMap.get(product.getProductId());
                    double quantity = Double.parseDouble(resultMap.get(product.getProductName()));
                    pc.setQuantity(pc.getQuantity() + (int) quantity);
                } else {
                    pc.setProductCategoryId(UUID.randomUUID().toString().replaceAll("-", ""));
                    pc.setCategoryId(categoryId);
                    pc.setProductId(product.getProductId());
                    double quantity = Double.parseDouble(resultMap.get(product.getProductName()));
                    pc.setQuantity((int) quantity);
                    pc.setMaxLimit(0);
                    pc.setMinLimit(0);
                    pc.setPrice(0.0);
                    pc.setCreateDate(LocalDateTime.now());
                    pc.setModifyDate(LocalDateTime.now());
                }
                productCategoryList.add(pc);
            }
        }
        IProductCategoryRepository.saveAll(productCategoryList);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, "Import Successfully!");
        return response;
    }

    @Override
    public ApiResponse<Object> verifyImportProducts(String categoryId, MultipartFile file) throws CsvValidationException, Exception {
        CategoryModel category = ICategoryRepository.findById(categoryId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(CATEGORY_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(CATEGORY_NOT_FOUND);
        });

        Map<String, String> resultMap = getImportFileData(file);
        List<ProductModel> products = IProductRepository.findAll();
        Map<String, VerifyProductDto> productVerifyMap = new HashMap<>();
        for (ProductModel product : products) {
            List<String> keywords = new ArrayList<>();
            for (String item : product.getKeyword().split("\n")) {
                keywords.add(item.trim());
            }
            keywords.add(product.getProductName());
            productVerifyMap.put(product.getProductName(), VerifyProductDto.builder()
                    .productId(product.getProductId())
                    .productName(product.getProductName())
                    .keyword(keywords)
                    .build());
        }
        List<ProductCategoryImportDataResponse> importDataResponses = new ArrayList<>();
        List<String> productNames = new ArrayList<>(resultMap.keySet());
        List<VerifyProductDto> verifyProductList = new ArrayList<>(productVerifyMap.values());

        for (String productName : productNames) {
            ProductCategoryImportDataResponse importDataResponse = new ProductCategoryImportDataResponse();
            importDataResponse.setImportName(productName);
            double quantity = Double.parseDouble(resultMap.get(productName));
            importDataResponse.setQuantity((int) quantity);

            if (productVerifyMap.containsKey(productName)) {
                VerifyProductDto verifyProduct = productVerifyMap.get(productName);
                importDataResponse.setSystemName(verifyProduct.getProductName());
            } else {
                Optional<VerifyProductDto> matchedProduct = verifyProductList.parallelStream()
                        .filter(verifyProduct -> verifyProduct.getKeyword().contains(productName))
                        .findFirst();
                if (matchedProduct.isPresent()) {
                    importDataResponse.setSystemName(matchedProduct.get().getProductName());
                } else {
                    importDataResponse.setSystemName("");
                }
            }
            importDataResponses.add(importDataResponse);
        }
        importDataResponses = importDataResponses.stream()
                .sorted(Comparator.comparing(ProductCategoryImportDataResponse::getImportName))
                .collect(Collectors.toList());
        VerifyProductCategoryImportResponse verifyProductCategoryImportResponse = VerifyProductCategoryImportResponse.builder()
                .categoryId(categoryId)
                .categoryName(category.getCategoryName())
                .importData(importDataResponses)
                .build();

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, verifyProductCategoryImportResponse);
        return response;
    }

    private Map<String, String> getImportFileData(MultipartFile file) throws RuntimeException, CsvValidationException, Exception {
        Map<String, String> resultMap = new HashMap<>();
        String fileExtension = getFileExtension(file.getOriginalFilename());
        try (InputStream inputStream = file.getInputStream()) {
            if (fileExtension.equalsIgnoreCase("csv")) {
                try (CSVReader csvReader = new CSVReader(new InputStreamReader(inputStream))) {
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
            } else if (fileExtension.equalsIgnoreCase("xlsx") || fileExtension.equalsIgnoreCase("xls")) {
                try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
                    sheet sheet = workbook.getSheetAt(0);
                    for (Row row : sheet) {
                        Cell keyCell = row.getCell(0);
                        Cell valueCell = row.getCell(1);
                        if (keyCell != null && valueCell != null) {
                            String key = keyCell.getStringCellValue();
                            String value = String.valueOf(valueCell.getNumericCellValue()).trim();
                            resultMap.put(key, value);
                        }
                    }
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            } else {
                throw new IllegalArgumentException("Không hỗ trợ định dạng file này: " + fileExtension);
            }
        }
        return resultMap;
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}
