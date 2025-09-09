package com.example.stc_quanliko.service.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ServiceSecurityException extends RuntimeException {

    private HttpStatus httpStatus;
    private final Object errorCode;   // dùng Object để linh hoạt: Enum hoặc String
    private Object errorData;   // chứa thông tin chi tiết (ErrorData)

    public ServiceSecurityException(Object errorCode) {
        super(errorCode != null ? errorCode.toString() : "Service security exception");
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.errorData = errorData;
    }
}
