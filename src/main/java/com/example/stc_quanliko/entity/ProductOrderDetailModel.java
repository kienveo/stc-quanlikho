package com.example.stc_quanliko.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products_order_detail") // Tên bảng trong DB
public class ProductOrderDetailModel {

    @Id
    @Column(name = "product_order_detail_id") // mapping cột DB
    private String productOrderDetailId;

    // ManyToOne tới ProductOrderModel
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "product_order_id",
            referencedColumnName = "productOrderId", // Tham chiếu đến Business ID (String) của ProductOrderModel
            nullable = false
    )
    private ProductOrderModel productOrder;

    // ManyToOne tới ProductCategoryModel
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "product_category_id",
            referencedColumnName = "productCategoryId", // Tham chiếu đến Business ID (String) của ProductCategoryModel
            nullable = false
    )
    private ProductCategoryModel productCategory;

    @Column(name = "product_name")
    private String productName;

    private Integer quantity;

    private Double price;

    private Double subtotal;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    public ProductCategoryModel getProductCategory() {
        return null;
    }

    public String getProductId() {
        return null;
    }

    public String getProductCategoryId() {
        return null;
    }

    public Object getProductOrderId() {
        return null;
    }

    public void setProductCategoryId(String productCategoryId) {
        
    }

    public void setProductOrderId(Object productOrderId) {
    }
}






