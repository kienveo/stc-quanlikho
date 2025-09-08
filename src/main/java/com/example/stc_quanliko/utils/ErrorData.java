package com.example.stc_quanliko.utils;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorData {
    private String errorKey1;
    private String errorKey2; // optional
}

