package com.example.stc_quanliko.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "product_category") // You can use @Table(name = "product_category") instead
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product_category") // specify the table name in the database
public class ProductCategoryModel {

    @Id
    @Column(nullable = false)
    private String productCategoryId;// The ONLY Primary Key
    private String id ;// Not a Primary Key

    private Integer quantity;
    private Integer minLimit;
    private Integer maxLimit;
    private Double price;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;

    // Use productId for the column name in the database
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false) // use snake_case for column names
    private ProductModel product;

    // Use categoryId for the column name in the database
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false) // use snake_case for column names
    private CategoryModel category;

    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductOrderDetailModel> orderDetails;
    public String getProductId() {
     return product != null ? product.getProductId() : null;
    }

    public void setCategoryId(String categoryId) {
    }

    public void setProductId(String productId) {
     }

    public void setKeywords(List<?> objects) {
    }

    public void setGenericName(List<?> objects) {

    }
}


