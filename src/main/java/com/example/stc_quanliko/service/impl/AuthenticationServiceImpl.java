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
public class AuthenticationServiceImpl implements AuthenticationService {

    private final IUsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public ApiResponse<Object> signUp(SignUpUserRequest signUpUserRequest) throws ServiceSecurityException {
        if (usersRepository.existsByEmail(signUpUserRequest.getEmail())) {
            throw new ServiceSecurityException(EMAIL_EXIST);
        }

        UsersModel usersModel = new UsersModel();
        usersModel.setUserId(UUID.randomUUID().toString().replaceAll("-", ""));
        usersModel.setEmail(signUpUserRequest.getEmail());
        usersModel.setFirstName(signUpUserRequest.getFirstName());
        usersModel.setLastName(signUpUserRequest.getLastName());
        usersModel.setRoleId(signUpUserRequest.getRoleId());
        usersModel.setPassword(passwordEncoder.encode(signUpUserRequest.getPassword()));
        usersModel.setCreateDate(LocalDateTime.now());
        usersRepository.save(usersModel);

        ApiResponse<Object> response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, usersModel);
        return response;
    }

    @Override
    public ApiResponse<Object> registerUser(SignUpUserRequest signUpUserRequest) throws ServiceSecurityException {
        return null;
    }

    @Override
    public ApiResponse<Object> signIn(SignInRequest signInRequest) throws ServiceSecurityException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new ServiceSecurityException(INVALID_CREDENTIALS);
        }

        UsersModel user = usersRepository.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new ServiceSecurityException(INVALID_REQUEST_PARAMETER));

        String jwt = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        jwtAuthenticationResponse.setUserId(user.getUserId());
        jwtAuthenticationResponse.setRoleId(user.getRoleId());
        jwtAuthenticationResponse.setUsername(user.getUsername());

        ApiResponse<Object> response = new ApiResponse<>();
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
            throw new ServiceSecurityException(INVALID_CREDENTIALS);
        }

        UsersModel user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ServiceSecurityException(USER_NOT_FOUND));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setCreateDate(LocalDateTime.now());
        usersRepository.save(user);

        ApiResponse<Object> response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, user);
        return response;
    }

    @Override
    public ApiResponse<Object> refreshToken(RefreshTokenRequest refreshTokenRequest) throws ServiceSecurityException {
        String userEmail = jwtService.extractUsername(refreshTokenRequest.getToken());
        UsersModel usersModel = usersRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ServiceSecurityException(USER_NOT_FOUND));

        if (!jwtService.isTokenValid(refreshTokenRequest.getToken(), usersModel)) {
            throw new ServiceSecurityException(INVALID_REQUEST_PARAMETER);
        }

        String jwt = jwtService.generateToken(usersModel);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
        jwtAuthenticationResponse.setUserId(usersModel.getUserId());

        ApiResponse<Object> response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, jwtAuthenticationResponse);
        return response;
    }
}
