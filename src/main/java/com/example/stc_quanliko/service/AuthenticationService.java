package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.authen.ChangePasswordRequest;
import com.example.stc_quanliko.dto.request.authen.RefreshTokenRequest;
import com.example.stc_quanliko.dto.request.authen.SignInRequest;
import com.example.stc_quanliko.dto.request.authen.SignUpUserRequest;
import com.example.stc_quanliko.service.impl.ResponseBody;
import com.example.stc_quanliko.service.impl.ServiceSecurityException;

public interface AuthenticationService {

    ResponseBody<Object> registerUser(SignUpUserRequest signUpUserRequest) throws ServiceSecurityException;

    ResponseBody<Object> signIn(SignInRequest signInRequest) throws ServiceSecurityException;

    ResponseBody<Object> changePassword(ChangePasswordRequest changePasswordRequest) throws ServiceSecurityException;

    ResponseBody<Object> refreshToken(RefreshTokenRequest refreshTokenRequest) throws ServiceSecurityException;

}
