package com.example.society.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class JwtRequest {
    @NotEmpty(message = "Username shouldn't be empty")
    private String username;
    @NotEmpty(message = "Password shouldn't be empty")
    private String password;
}
