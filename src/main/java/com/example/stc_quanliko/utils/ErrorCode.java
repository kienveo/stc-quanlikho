package com.example.stc_quanliko.utils;

public enum ErrorCode {
    EMAIL_EXIST("ERR001"),
    INVALID_CREDENTIALS("ERR002"),
    INVALID_REQUEST_PARAMETER("ERR003"),
    USER_NOT_FOUND("ERR004");

    private final String code;

    ErrorCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}

