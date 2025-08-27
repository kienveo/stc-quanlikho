package com.example.stc_quanliko.dto.request.authen;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpUserRequest {

    @NotBlank(message = "First name is not blank")
    @JsonProperty("first_name")
    private String firstName;

    @NotBlank(message = "Last name is not blank")
    @JsonProperty("last_name")
    private String lastName;

    @NotBlank(message = "Password is not blank")
    private String password;

    @NotBlank(message = "Email is not blank")
    private String email;

    @NotBlank(message = "Role is not blank")
    @JsonProperty("role_id")
    private String roleId;
}
