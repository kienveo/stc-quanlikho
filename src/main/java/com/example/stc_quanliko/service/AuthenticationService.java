package com.example.stc_quanliko.service;


import com.example.stc_quanliko.dto.request.authen.ChangePasswordRequest;
import com.example.stc_quanliko.dto.request.authen.RefreshTokenRequest;
import com.example.stc_quanliko.dto.request.authen.SignInRequest;
import com.example.stc_quanliko.dto.request.authen.SignUpUserRequest;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {

    ResponseEntity<Object> registerUser(SignUpUserRequest signUpUserRequest);

    ResponseEntity<Object> signIn(SignInRequest signInRequest);

    ResponseEntity<Object> changePassword(ChangePasswordRequest changePasswordRequest);

    ResponseEntity<Object> refreshToken(RefreshTokenRequest refreshTokenRequest);
}
