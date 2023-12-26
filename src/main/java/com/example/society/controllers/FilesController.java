package com.example.society.controllers;

import com.example.society.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FilesController {

    private final FileService fileService;

    @GetMapping("/download")
    public ResponseEntity<?> download(@RequestParam(value = "filename") String filename) {
        return fileService.downloadFile(filename);
    }

}
