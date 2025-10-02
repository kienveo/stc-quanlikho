package com.example.stc_quanliko.repository;


import com.example.stc_quanliko.entity.ProductOrderDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductOrderDetailRepository extends JpaRepository<ProductOrderDetailModel, String> {
    @Query("SELECT pod FROM ProductOrderDetailModel pod WHERE pod.productOrder.productOrderId in :productOrderIds")
    List<ProductOrderDetailModel> findAllByProductOrder_ProductOrderIdIn(@Param("productOrderIds") List<String> productOrderIds);

    @Query("SELECT pod FROM ProductOrderDetailModel pod WHERE pod.productOrder.productOrderId in :productOrderIds AND pod.productCategory.category.categoryId = :categoryId")
    List<ProductOrderDetailModel> findAllByProductOrder_ProductOrderIdInAndCategory_CategoryId(
            @Param("productOrderIds") List<String> productOrderIds,
            @Param("categoryId") String categoryId
    );

    List<ProductOrderDetailModel> findAllByProductOrder_ProductOrderId(String productOrderId);

}
