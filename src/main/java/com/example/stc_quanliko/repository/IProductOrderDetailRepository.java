package com.example.stc_quanliko.repository;


import com.example.stc_quanliko.entity.ProductOrderDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductOrderDetailRepository extends JpaRepository<ProductOrderDetailModel, String> {
    String TABLE = "products_order_detail";

    List<ProductOrderDetailModel> findAllByProductOrderId(String productOrderId);
    @Query("SELECT pod FROM products_order_detail pod WHERE pod.productOrderId in :productOrderIds")
    List<ProductOrderDetailModel> findAllByProductOrderIdIn(List<String> productOrderIds);
    @Query("SELECT pod FROM products_order_detail pod WHERE pod.productOrderId in :productOrderIds AND pod.categoryId = :categoryId")
    List<ProductOrderDetailModel> findAllByProductOrderIdInAndCategoryId(List<String> productOrderIds, String categoryId);
}
