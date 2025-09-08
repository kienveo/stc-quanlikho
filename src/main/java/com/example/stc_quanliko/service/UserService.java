package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.users.UpdateUserRequest;
import com.example.stc_quanliko.dto.request.users.UserSearchRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetailsService userDetailsService();

    ResponseEntity<Object> getAllUserDetail();

    ResponseEntity<Object> getUserIdDetail(String userId);

    ResponseEntity<Object> updateUser(UpdateUserRequest request);

    ResponseEntity<Object> deleteUserById(String userId);

    ResponseEntity<Object> getAllUserPage(UserSearchRequest request);
}
