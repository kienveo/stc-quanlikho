package com.example.stc_quanliko.entity;

import com.example.stc_quanliko.repository.IRoleRepository;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = IRoleRepository.TABLE)
public class RoleModel {
    @Id
    @Column(nullable = false)
    private String roleId;
    private String roles;
}
