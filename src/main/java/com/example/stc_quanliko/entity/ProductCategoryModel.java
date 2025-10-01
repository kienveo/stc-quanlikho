package com.example.stc_quanliko.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "product_category")
@Table(name = "product_category")
public class ProductCategoryModel {

    // Khóa chính kỹ thuật (Technical Primary Key)
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Khóa Business ID (đảm bảo unique)
    @Column(unique = true, nullable = false)
    private String productCategoryId;

    // XÓA: private String productId;
    // XÓA: private String categoryId;

    // Ánh xạ mối quan hệ ManyToOne tới ProductModel
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false) // Tên cột FK
    private ProductModel product;

    // Ánh xạ mối quan hệ ManyToOne tới CategoryModel (Thiếu trong code cũ)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false) // Tên cột FK
    private CategoryModel category;

    private Integer quantity;
    private Integer minLimit;
    private Integer maxLimit;
    private Double price;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;

    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductOrderDetailModel> orderDetails;
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getProduct() {
        return null;
    }

    public void setCategoryId(String categoryId) {
    }

    public void setProductId(String productId) {
    }
}


