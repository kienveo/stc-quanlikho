package com.example.stc_quanliko.entity;


import com.example.stc_quanliko.repository.IProductOrderDetailRepository;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductOrderDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true)
    private String productOrderDetailId; // business id (không phải PK)

    private String productId;         // business key
    private String categoryId;        // business key
    private String productCategoryId; // business key
    private String productOrderId;     // business key
    private String productName;

    private Integer quantity;
    private Double price;
    private Double subtotal;
    private LocalDateTime createDate;

    @ManyToOne
    @JoinColumn(name = "productOrderId", nullable = false, insertable = false, updatable = false)
    private ProductOrderModel productOrder;


    @ManyToOne
    @JoinColumn(name = "productCategoryId", nullable = false, insertable = false, updatable = false)
    private ProductCategoryModel productCategory;

    public String getProductName() {
        return null;
    }
}



