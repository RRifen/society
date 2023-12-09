package com.example.society.exceptions;

import lombok.Data;

@Data
public class AppError {
    private int status;
    private String message;
    private String timestamp;

    public AppError(int status, String message, String timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }
}
