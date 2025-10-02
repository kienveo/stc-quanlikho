package com.example.stc_quanliko.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
// Corrected ProductOrderDetailModel.java (Remove redundant ID fields)
@Entity(name = "ProductOrderDetailModel")
@Table(name = "products_order_detail")
public class ProductOrderDetailModel {

    @Id
    @Column(nullable = false)
    private String productOrderDetailId;

    // REMOVE: private String productOrderId;
    // REMOVE: private String productCategoryId;
    // REMOVE: private String productId;
    // REMOVE: private String categoryId;
    // REMOVE: private String productName;

    private Integer quantity;
    private Double price;
    private Double subtotal;
    private LocalDateTime createDate;

    @ManyToOne
    @JoinColumn(name = "product_order_id", nullable = false) // Use snake_case for consistency
    private ProductOrderModel productOrder;

    @ManyToOne
    @JoinColumn(name = "product_category_id", nullable = false) // Use snake_case for consistency
    private ProductCategoryModel productCategory;

    // REMOVE all dummy getters/setters for IDs, e.g., getProductCategory(), getProductId(), etc.

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

    public String getProductName() {
        return null;
    }

    public void setProductName(String productName) {
    }
}






