package com.example.society.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileDTO {
    @JsonProperty("file_path")
    private String filePath;
    private String filename;
}
