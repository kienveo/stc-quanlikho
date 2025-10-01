package com.example.stc_quanliko.repository;


import com.example.stc_quanliko.entity.ProductOrderDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductOrderDetailRepository extends JpaRepository<ProductOrderDetailModel, String> {

    // Truy vấn tất cả detail theo id của productOrder
    List<ProductOrderDetailModel> findAllByProductOrderId(String productOrderId);

    // Truy vấn nhiều productOrderIds
    @Query("SELECT pod FROM ProductOrderDetailModel pod WHERE pod.productOrder.id IN :productOrderIds")
    List<ProductOrderDetailModel> findAllByProductOrderIdIn(@Param("productOrderIds") List<String> productOrderIds);

    // Truy vấn nhiều productOrderIds và filter theo category
    @Query("SELECT pod FROM ProductOrderDetailModel pod " +
            "WHERE pod.productOrder.id IN :productOrderIds " +
            "AND pod.productCategory.id = :categoryId")
    List<ProductOrderDetailModel> findAllByProductOrderIdInAndCategoryId(
            @Param("productOrderIds") List<String> productOrderIds,
            @Param("categoryId") String categoryId
    );
}

