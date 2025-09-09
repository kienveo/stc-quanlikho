package com.example.stc_quanliko.service.impl;


import com.example.stc_quanliko.dto.request.authen.ChangePasswordRequest;
import com.example.stc_quanliko.dto.request.authen.RefreshTokenRequest;
import com.example.stc_quanliko.dto.request.authen.SignInRequest;
import com.example.stc_quanliko.dto.request.authen.SignUpUserRequest;
import com.example.stc_quanliko.dto.response.authen.JwtAuthenticationResponse;
import com.example.stc_quanliko.entity.UsersModel;
import com.example.stc_quanliko.repository.IUsersRepository;
import com.example.stc_quanliko.service.AuthenticationService;
import com.example.stc_quanliko.service.JWTService;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import com.example.stc_quanliko.utils.ErrorData;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

import static com.example.stc_quanliko.utils.ErrorCode.*;
import static jdk.internal.vm.Continuation.PreemptStatus.SUCCESS;

@Service
@RequiredArgsConstructor
public abstract class AuthenticationServiceImpl implements AuthenticationService {

    private final IUsersRepository IUsersRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;

    public ApiResponse<Object> registerUser(SignUpUserRequest signUpUserRequest) throws ServiceSecurityException {
        UsersModel usersModel = new UsersModel();
        var existsEmail = IUsersRepository.existsByEmail(signUpUserRequest.getEmail());

        if (existsEmail) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(EMAIL_EXIST.getCode())
                    .build();
            throw new ServiceSecurityException(EMAIL_EXIST);
        }

        usersModel.setUserId(UUID.randomUUID().toString().replaceAll("-", ""));
        usersModel.setEmail(signUpUserRequest.getEmail());
        usersModel.setFirstName(signUpUserRequest.getFirstName());
        usersModel.setLastName(signUpUserRequest.getLastName());
        usersModel.setRoleId(signUpUserRequest.getRoleId());
        usersModel.setPassword(passwordEncoder.encode(signUpUserRequest.getPassword()));
        usersModel.setCreateDate(LocalDateTime.now());
        IUsersRepository.save(usersModel);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, usersModel);
        return response;
    }

    public ApiResponse<Object> signIn(SignInRequest signInRequest) throws ServiceSecurityException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            var errorMapping = ErrorData.builder()
                    .errorKey2(INVALID_CREDENTIALS.getCode())
                    .build();
            throw new ServiceSecurityException(INVALID_CREDENTIALS);
        }
        var user = IUsersRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey2(INVALID_REQUEST_PARAMETER.getCode())
                    .build();
            return new ServiceSecurityException(INVALID_REQUEST_PARAMETER);
        });
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        jwtAuthenticationResponse.setUserId(user.getUserId());
        jwtAuthenticationResponse.setRoleId(user.getRoleId());
        jwtAuthenticationResponse.setUsername(user.getUsername());

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, jwtAuthenticationResponse);
        return response;
    }

    @Override
    public ApiResponse<Object> changePassword(ChangePasswordRequest request) throws ServiceSecurityException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getOldPassword())
            );
        } catch (AuthenticationException e) {
            var errorMapping = ErrorData.builder()
                    .errorKey2(INVALID_CREDENTIALS.getCode())
                    .build();
            throw new ServiceSecurityException(INVALID_CREDENTIALS);
        }
        var user = IUsersRepository.findByEmail(request.getEmail()).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey2(USER_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(USER_NOT_FOUND);
        });

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setCreateDate(LocalDateTime.now());
        IUsersRepository.save(user);
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, user);
        return response;
    }

    public ApiResponse<Object> refreshToken(RefreshTokenRequest refreshTokenRequest) throws ServiceSecurityException {
        String userEmail = jwtService.extractUsername(refreshTokenRequest.getToken());
        UsersModel usersModel = IUsersRepository.findByEmail(userEmail).orElseThrow();

        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), usersModel)) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(INVALID_REQUEST_PARAMETER.getCode())
                    .build();
            throw new ServiceSecurityException(INVALID_REQUEST_PARAMETER);
        }
        var jwt = jwtService.generateToken(usersModel);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
        jwtAuthenticationResponse.setUserId(usersModel.getUserId());

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, jwtAuthenticationResponse);
        return response;
    }
}
