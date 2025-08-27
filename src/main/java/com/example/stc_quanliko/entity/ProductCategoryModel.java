package com.example.stc_quanliko.entity;


import com.example.stc_quanliko.repository.ProductCategoryRepository;
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
@Entity(name = ProductCategoryRepository.TABLE)
public class ProductCategoryModel {

    @Id
    @Column(nullable = false)
    private String productCategoryId;
    private String productId;
    private String categoryId;
    private Integer quantity;
    private Integer minLimit;
    private Integer maxLimit;
    private Double price;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    @ManyToOne
    @JoinColumn(name = "productId", nullable = false, insertable = false, updatable = false)
    private ProductModel product;
    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false, insertable = false, updatable = false)
    private CategoryModel category;
    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductOrderDetailModel> orderDetails;
}
