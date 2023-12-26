package com.example.society.controllers;

import com.example.society.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-wa")
@RequiredArgsConstructor
public class WithoutAuthorizationController {

    private final PostService postService;

    @GetMapping("/posts")
    public ResponseEntity<?> readPosts(@RequestParam(value = "pn", defaultValue = "0") Integer pageNumber,
                                       @RequestParam(value = "ps", defaultValue = "5") Integer pageSize) {
        return postService.readPostsWithoutUser(pageNumber, pageSize);
    }

}
