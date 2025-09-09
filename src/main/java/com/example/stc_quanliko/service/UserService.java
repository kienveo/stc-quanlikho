package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.users.UpdateUserRequest;
import com.example.stc_quanliko.dto.request.users.UserSearchRequest;
import com.example.stc_quanliko.service.exception.ApiResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetails loadUserByUsername(String username);

    UserDetailsService userDetailsService();

    ApiResponse<Object> getAllUserDetail();

    ApiResponse<Object> getUserIdDetail(String userId);

    ApiResponse<Object> updateUser(UpdateUserRequest request);

    ApiResponse<Object> deleteUserById(String userId);

    ApiResponse<Object> getAllUserPage(UserSearchRequest request);
}
