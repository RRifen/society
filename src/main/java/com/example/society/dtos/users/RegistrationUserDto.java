package com.example.society.dtos.users;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RegistrationUserDto {
    @NotEmpty(message = "Username shouldn't be empty")
    private String username;
    @NotEmpty(message = "Password shouldn't be empty")
    private String password;

    @JsonProperty("confirm_password")
    private String confirmPassword;
    @Email(message = "Email isn't valid")
    private String email;
}
