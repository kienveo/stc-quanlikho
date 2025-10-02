package com.example.stc_quanliko.entity;


import com.example.stc_quanliko.repository.ICategoryRepository;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = ICategoryRepository.TABLE)
public class CategoryModel {

    @Id
    @Column(nullable = false)
    private String categoryId;
    @Column(unique = true)
    private String categoryName;
    private String minQuantity;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductCategoryModel> productCategories;
}


