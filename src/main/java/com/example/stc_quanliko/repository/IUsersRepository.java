package com.example.stc_quanliko.repository;


import com.example.stc_quanliko.entity.UsersModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUsersRepository extends JpaRepository<UsersModel, String> {
    String TABLE = "users";

    Optional<UsersModel> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    @Query(value = "SELECT * FROM " + TABLE +
            " WHERE email LIKE %:email% AND CONCAT(firstName,lastName) LIKE %:username% ", nativeQuery = true)
    Page<UsersModel> findByEmailAndUsername(@Param("email") String email, @Param("username") String username, Pageable pageable);
}
