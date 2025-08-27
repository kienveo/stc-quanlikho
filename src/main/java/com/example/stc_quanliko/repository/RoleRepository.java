package com.example.stc_quanliko.repository;


import com.example.stc_quanliko.entity.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleModel, String> {
    String TABLE = "role";
}
