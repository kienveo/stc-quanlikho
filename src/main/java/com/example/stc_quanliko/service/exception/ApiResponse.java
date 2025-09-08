package com.example.stc_quanliko.service.exception;

public class ApiResponse<T> {
    public void setOperationSuccess(T preemptStatus, T json) {}

    private String status;
    private String message;
    private T data;

    public void setOperationSuccess(String message, T data) {
        this.status = "SUCCESS";
        this.message = message;
        this.data = data;
    }

    public void setOperationError(String message, T data) {
        this.status = "ERROR";
        this.message = message;
        this.data = data;
    }
}
