package com.example.society.dtos.posts;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data
public class SPostDto {
    @NotEmpty(message = "Post header shouldn't be empty")
    private String header;
    @NotEmpty(message = "Post text shouldn't be empty")
    private String text;
    private MultipartFile image;
    private MultipartFile[] files;
}
