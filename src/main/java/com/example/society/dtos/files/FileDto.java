package com.example.society.dtos.files;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileDto {
    @JsonProperty("file_path")
    private String filePath;
    private String filename;
}
