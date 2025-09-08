package com.example.stc_quanliko.service.impl;

import com.example.stc_quanliko.dto.request.users.UpdateUserRequest;
import com.example.stc_quanliko.dto.request.users.UserSearchRequest;
import com.example.stc_quanliko.dto.response.users.UserDetailResponse;
import com.example.stc_quanliko.entity.UsersModel;
import com.example.stc_quanliko.repository.IUsersRepository;
import com.example.stc_quanliko.service.UserService;
import com.example.stc_quanliko.service.exception.ApiResponse;
import com.example.stc_quanliko.service.exception.ServiceSecurityException;
import com.example.stc_quanliko.utils.ErrorCode;
import com.example.stc_quanliko.utils.ErrorData;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

import static com.example.stc_quanliko.utils.ErrorCode.EMAIL_EXIST;
import static com.example.stc_quanliko.utils.ErrorCode.USER_NOT_FOUND;
import static jdk.internal.vm.Continuation.PreemptStatus.SUCCESS;

@Service
@RequiredArgsConstructor
public abstract class UserServiceImpl implements UserService {

    private static final ErrorCode PHONE_NUMBER_EXIST = null;
    private final IUsersRepository IUsersRepository;
    private static final String DEFAULT_SORT_FIELD = "createDate";

    @Override
    public UserDetailsService userDetailsService() {
        return username -> IUsersRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public ApiResponse<Object> getAllUserDetail() {
        var userModelList = IUsersRepository.findAll();
        var userDetailList = userModelList.stream().map(userModel -> UserDetailResponse.builder()
                .userId(userModel.getUserId())
                .firstName(userModel.getFirstName())
                .lastName(userModel.getLastName())
                .email(userModel.getEmail())
                .phoneNumber(userModel.getPhoneNumber())
                .address(userModel.getAddress())
                .city(userModel.getCity())
                .state(userModel.getState())
                .zipCode(userModel.getZipCode())
                .roleId(userModel.getRoleId())
                .createDate(userModel.getCreateDate())
                .modifyDate(userModel.getModifyDate())
                .build()).toList();

        var json = new ObjectMapper().createObjectNode();
        json.putPOJO("userDetailList", userDetailList);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);
        return response;
    }

    @Override
    public ApiResponse<Object> getUserIdDetail(String userId) {
        var userModel = IUsersRepository.findById(userId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(USER_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(HttpStatus.OK, USER_NOT_FOUND, errorMapping);
        });

        UserDetailResponse userDetailResponse = UserDetailResponse.builder()
                .userId(userModel.getUserId())
                .firstName(userModel.getFirstName())
                .lastName(userModel.getLastName())
                .email(userModel.getEmail())
                .phoneNumber(userModel.getPhoneNumber())
                .address(userModel.getAddress())
                .city(userModel.getCity())
                .state(userModel.getState())
                .zipCode(userModel.getZipCode())
                .roleId(userModel.getRoleId())
                .createDate(userModel.getCreateDate())
                .modifyDate(userModel.getModifyDate())
                .build();
        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, userDetailResponse);
        return response;
    }

    @Override
    public ApiResponse<Object> updateUser(UpdateUserRequest request) {
        var userModel = IUsersRepository.findById(request.getUserId()).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(USER_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(HttpStatus.OK, USER_NOT_FOUND, errorMapping);
        });
        this.validateEmailAndPhoneNumber(request.getEmail(), request.getPhoneNumber(), userModel.getEmail(), userModel.getPhoneNumber());

        userModel.setFirstName(request.getFirstName());
        userModel.setLastName(request.getLastName());
        userModel.setEmail(request.getEmail());
        userModel.setPhoneNumber(request.getPhoneNumber());
        userModel.setAddress(request.getAddress());
        userModel.setCity(request.getCity());
        userModel.setState(request.getState());
        userModel.setZipCode(request.getZipCode());
        userModel.setRoleId(request.getRoleId());
        userModel.setModifyDate(LocalDateTime.now());
        IUsersRepository.save(userModel);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, null);
        return response;
    }

    @Override
    public ApiResponse<Object> deleteUserById(String userId) {
        var userModel = IUsersRepository.findById(userId).orElseThrow(() -> {
            var errorMapping = ErrorData.builder()
                    .errorKey1(USER_NOT_FOUND.getCode())
                    .build();
            return new ServiceSecurityException(HttpStatus.OK, USER_NOT_FOUND, errorMapping);
        });
        IUsersRepository.deleteById(userModel.getUserId());

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, null);
        return response;
    }

    @Override
    public ApiResponse<Object> getAllUserPage(UserSearchRequest request) {
        var mapper = new ObjectMapper();
        var json = mapper.createObjectNode();

        Pageable pageable;

        if (request.getSortBy() == null || request.getSortBy().isEmpty()) {
            request.setSortBy(DEFAULT_SORT_FIELD);
        }

        if (request.getSortDirection() == null || request.getSortDirection().isEmpty()) {
            request.setSortDirection("asc");
        }

        if (request.getSortDirection().equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(Integer.parseInt(request.getPageNumber()) - 1, Integer.parseInt(request.getPageSize()), Sort.by(request.getSortBy()).descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(request.getPageNumber()) - 1, Integer.parseInt(request.getPageSize()), Sort.by(request.getSortBy()).ascending());
        }

        Page<UsersModel> listUserPage = IUsersRepository.findByEmailAndUsername(request.getEmail(), request.getUserName(), pageable);

        var listUser = listUserPage.getContent();

        var listUserModel = listUser.stream().map(userModel ->
                UserDetailResponse.builder()
                        .userId(userModel.getUserId())
                        .firstName(userModel.getFirstName())
                        .lastName(userModel.getLastName())
                        .email(userModel.getEmail())
                        .phoneNumber(userModel.getPhoneNumber())
                        .address(userModel.getAddress())
                        .city(userModel.getCity())
                        .state(userModel.getState())
                        .zipCode(userModel.getZipCode())
                        .roleId(userModel.getRoleId())
                        .createDate(userModel.getCreateDate())
                        .modifyDate(userModel.getModifyDate())
                        .build());

        json.putPOJO("page_number", request.getPageNumber());
        json.putPOJO("total_records", listUserPage.getTotalElements());
        json.putPOJO("page_size", request.getPageSize());
        json.putPOJO("list_user", listUserModel);

        var response = new ApiResponse<>();
        response.setOperationSuccess(SUCCESS, json);

        return response;
    }

    private void validateEmailAndPhoneNumber(String email, String phoneNumber, String emailPresent, String phonePresent) {
        var existsEmail = IUsersRepository.existsByEmail(email);
        if (!Objects.equals(email, emailPresent) && existsEmail) {
            var errorMapping = ErrorData.builder()
                    .errorKey1(EMAIL_EXIST.getCode())
                    .build();
            throw new ServiceSecurityException(HttpStatus.OK, EMAIL_EXIST, errorMapping);
        }
        if (!StringUtils.isBlank(phoneNumber) && !Objects.equals(phoneNumber, phonePresent)) {
            var existsPhoneNumber = IUsersRepository.existsByPhoneNumber(phoneNumber);
            if (existsPhoneNumber) {
                var errorMapping = ErrorData.builder()
                        .errorKey1(PHONE_NUMBER_EXIST.getCode())
                        .build();
                throw new ServiceSecurityException(HttpStatus.OK, PHONE_NUMBER_EXIST, errorMapping);
            }
        }
    }
}
