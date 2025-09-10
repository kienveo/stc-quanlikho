package com.example.stc_quanliko.entity;


import com.example.stc_quanliko.repository.IProductCategoryRepository;
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
public class ProductCategoryModel {

    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String productCategoryId; // business id (UUID hoặc code)

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoryId", nullable = false, insertable = false, updatable = false)
    private CategoryModel category;

    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductOrderDetailModel> orderDetails;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}


