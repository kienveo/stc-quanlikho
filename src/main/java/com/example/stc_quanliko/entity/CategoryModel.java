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
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(unique = true, nullable = false)
        private String categoryName;

        @Column(name = "category_code") // business id (UUID or code) - avoid name 'category_id'
        private String categoryCode;

        private String minQuantity;
        private LocalDateTime createDate;
        private LocalDateTime modifyDate;

        @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<ProductCategoryModel> productCategories;

        public void setId(Long id) {
            this.id = id;
        }

        public String getCategoryId() {
            return categoryCode;
        }
    }

