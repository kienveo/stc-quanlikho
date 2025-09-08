package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.authen.ChangePasswordRequest;
import com.example.stc_quanliko.dto.request.authen.RefreshTokenRequest;
import com.example.stc_quanliko.dto.request.authen.SignInRequest;
import com.example.stc_quanliko.dto.request.authen.SignUpUserRequest;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;

public interface AuthenticationService {

    ApiResponse<Object> registerUser(SignUpUserRequest signUpUserRequest) throws ServiceSecurityException;

    ApiResponse<Object> signIn(SignInRequest signInRequest) throws ServiceSecurityException;

    ApiResponse<Object> changePassword(ChangePasswordRequest changePasswordRequest) throws ServiceSecurityException;

    ApiResponse<Object> refreshToken(RefreshTokenRequest refreshTokenRequest) throws ServiceSecurityException;

}
