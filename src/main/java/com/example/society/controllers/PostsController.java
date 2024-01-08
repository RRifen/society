package com.example.society.controllers;

import com.example.society.dtos.posts.SPostDto;
import com.example.society.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${api.prefix}/posts")
@Slf4j
public class PostsController {
    private final PostService postService;

    @GetMapping
    public ResponseEntity<?> readPosts(@RequestParam(value = "pn", defaultValue = "0") Integer pageNumber,
                                       @RequestParam(value = "ps", defaultValue = "5") Integer pageSize) {
        return postService.readPosts(pageNumber, pageSize);
    }

    @GetMapping("/private")
    public ResponseEntity<?> readPostsByUser() {
        return postService.readUserPosts();
    }

    @GetMapping("/following")
    public ResponseEntity<?> readPostsByFollow(@RequestParam(value = "pn", defaultValue = "0") Integer pageNumber,
                                               @RequestParam(value = "ps", defaultValue = "5") Integer pageSize) {
        return postService.readFollowUsersPosts(pageNumber, pageSize);
    }

    @GetMapping("/search")
    public ResponseEntity<?> readPostsByHeader(@RequestParam(value = "q", defaultValue = "") String header,
                                               @RequestParam(value = "pn", defaultValue = "0") Integer pageNumber,
                                               @RequestParam(value = "ps", defaultValue = "5") Integer pageSize) {
        return postService.readPostsByHeader(header, pageNumber, pageSize);
    }


    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createPost(@Valid @ModelAttribute SPostDto sPostDTO) {
        return postService.createPost(sPostDTO);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable("id") Long postId) {
        return postService.likePost(postId);
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<?> dislikePost(@PathVariable("id") Long postId) {
        return postService.dislikePost(postId);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) {
        return postService.deletePost(id);
    }
}
