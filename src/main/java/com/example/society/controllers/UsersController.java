package com.example.society.controllers;

import com.example.society.dtos.users.UpdateUserDto;
import com.example.society.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${api.prefix}/users")
public class UsersController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> readUsers(@RequestParam(value = "q", defaultValue = "") String username,
                                       @RequestParam(value = "pn", defaultValue = "0") Integer pageNumber,
                                       @RequestParam(value = "ps", defaultValue = "5") Integer pageSize) {
        return userService.readUsersByUsername(username, pageNumber, pageSize);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> readUser() {
        return userService.readUser();
    }

    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateUser(@ModelAttribute UpdateUserDto updateUserDto) {
        return userService.updateUser(updateUserDto);
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<?> followUser(@PathVariable("id") Long userId) {
        return userService.followUser(userId);
    }

    @PostMapping("/{id}/unfollow")
    public ResponseEntity<?> unfollowUser(@PathVariable("id") Long userId) {
        return userService.unfollowUser(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long userId) {
        return userService.deleteUser(userId);
    }

}
