package com.example.stc_quanliko.entity;


import com.example.stc_quanliko.repository.ICategoryRepository;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = ICategoryRepository.TABLE)
@Table(name = "categories") // đặt tên bảng rõ ràng
public class CategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "category_id", updatable = false, nullable = false)
    private String categoryId;

    @Column(unique = true, nullable = false)
    private String categoryName;

    @Column(name = "category_code", unique = true, nullable = false)
    private String categoryCode;

    private String minQuantity;

    private LocalDateTime createDate;

    private LocalDateTime modifyDate;

    public String getCategoryId() {
        return categoryCode;
    }
}


