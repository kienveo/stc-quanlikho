package com.example.stc_quanliko.entity;


import com.example.stc_quanliko.repository.IProductOrderDetailRepository;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = IProductOrderDetailRepository.TABLE)
public class ProductOrderDetailModel {

    @Id
    @Column(nullable = false)
    private String productOrderDetailId;
    private String productOrderId;
    private String productCategoryId;
    private String categoryId;
    private String productId;
    private String productName;
    private Integer quantity;
    private Double price;
    private Double subtotal;
    private LocalDateTime createDate;
    @ManyToOne
    @JoinColumn(name = "productOrderId", nullable = false, insertable = false, updatable = false)
    private ProductOrderModel productOrder;

    @ManyToOne()
    @JoinColumn(name = "productCategoryId", nullable = false, insertable = false, updatable = false)
    private ProductCategoryModel productCategory;

}
