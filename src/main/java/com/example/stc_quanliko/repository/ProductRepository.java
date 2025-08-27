package com.example.stc_quanliko.repository;


import com.example.stc_quanliko.entity.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, String> {
    String TABLE = "product";

//    List<ProductModel>

    boolean existsByProductName(String productName);
    @Query("SELECT p FROM product p WHERE p.productName in :productNames")
    List<ProductModel> findByProductNameIn(List<String> productNames);

    @Query("SELECT p FROM product p WHERE p.productId in :ids")
    List<ProductModel> findByProductIdIn(List<String> ids);

}
