package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.authen.ChangePasswordRequest;
import com.example.stc_quanliko.dto.request.authen.RefreshTokenRequest;
import com.example.stc_quanliko.dto.request.authen.SignInRequest;
import com.example.stc_quanliko.dto.request.authen.SignUpUserRequest;

public interface AuthenticationService {

    ResponseBody<Object> registerUser(SignUpUserRequest signUpUserRequest);

    ResponseBody<Object> signIn(SignInRequest signInRequest);

    ResponseBody<Object> changePassword(ChangePasswordRequest changePasswordRequest);

    ResponseBody<Object> refreshToken(RefreshTokenRequest refreshTokenRequest);
}
