package com.example.stc_quanliko.repository;

import com.example.stc_quanliko.dto.response.ProductCategoryResponse;
import com.example.stc_quanliko.entity.ProductCategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProductCategoryRepository extends JpaRepository<ProductCategoryModel, Long> { // <ProductCategoryModel, Long> vì PK chính là Long id

    String TABLE = "product_category";

    // Truy vấn DTO - Đã đúng
    @Query("SELECT new com.example.stc_quanliko.dto.response.ProductCategoryResponse(pc.productCategoryId, pc.product.productId, p.productName, c.categoryName, pc.category.categoryId, pc.quantity, pc.minLimit, pc.maxLimit, pc.price, pc.createDate, pc.modifyDate, c.minQuantity) " +
            "FROM product_category pc JOIN pc.product p JOIN pc.category c")
    List<ProductCategoryResponse> findAllIncludeProductName();

    // Truy vấn DTO theo CategoryId - Đã đúng cú pháp JPQL
    @Query("SELECT new com.example.stc_quanliko.dto.response.ProductCategoryResponse(pc.productCategoryId, pc.product.productId, p.productName, c.categoryName, pc.category.categoryId, pc.quantity, pc.minLimit, pc.maxLimit, pc.price, pc.createDate, pc.modifyDate, c.minQuantity) " +
            "FROM product_category pc JOIN pc.product p JOIN pc.category c " +
            "WHERE pc.category.categoryId = :categoryId")
    List<ProductCategoryModel> findAllIncludeProductNameByCategoryId(String categoryId);


    // JPQL - Sửa các tham chiếu: pc.product.productId và pc.category.categoryId
    @Query("SELECT pc FROM product_category pc WHERE pc.product.productId in :productIds AND pc.category.categoryId = :categoryId")
    List<ProductCategoryModel> findByProductIdIn(List<String> productIds, String categoryId);

    // JPQL - Sửa các tham chiếu: pc.product.productId và pc.category.categoryId
    @Query("SELECT pc FROM product_category pc WHERE pc.product.productId in :productIds AND pc.category.categoryId IN :categoryIds")
    List<ProductCategoryModel> findByProductIdInAndCategoryIdIn(List<String> productIds, List<String> categoryIds);

    // JPQL - Đã đúng
    @Query("SELECT pc FROM product_category pc WHERE pc.productCategoryId IN :ids")
    List<ProductCategoryModel> findAllByProductCategoryIdIn(List<String> ids);

    // JPQL - Đã đúng
    @Query("SELECT pc FROM product_category pc WHERE pc.category.categoryId = :categoryId")
    List<ProductCategoryModel> findByCategoryId(String categoryId);

    // Query By Method Name - Đã đúng vì productCategoryId là thuộc tính trực tiếp
    Optional<ProductCategoryModel> findByProductCategoryId(String productCategoryId);

    // SỬA: deleteAllByProduct_ProductId
    void deleteAllByProduct_ProductId(String productId);

    // SỬA: deleteAllByCategory_CategoryId
    void deleteAllByCategory_CategoryId(String categoryId);

    // SỬA: existsByProduct_ProductIdAndCategory_CategoryId
    boolean existsByProduct_ProductIdAndCategory_CategoryId(String productId, String categoryId);
}