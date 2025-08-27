package com.example.stc_quanliko.dto.response.authen;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {

    private String token;
    private String refreshToken;
    private String userId;
    private String roleId;
    private String username;
}
