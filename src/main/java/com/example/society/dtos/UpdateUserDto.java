package com.example.society.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateUserDto {
    private String description;
    private MultipartFile image;
}
