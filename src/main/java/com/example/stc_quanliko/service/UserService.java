package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.users.UpdateUserRequest;
import com.example.stc_quanliko.dto.request.users.UserSearchRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.ResponseBody;

public interface UserService {

    UserDetailsService userDetailsService();

    ResponseBody<Object> getAllUserDetail();

    ResponseBody<Object> getUserIdDetail(String userId);

    ResponseBody<Object> updateUser(UpdateUserRequest request);

    ResponseBody<Object> deleteUserById(String userId);

    ResponseBody<Object> getAllUserPage(UserSearchRequest request);
}
