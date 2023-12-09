package com.example.society.dtos;

import com.example.society.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    @JsonProperty("img_url")
    private String imgUrl;
    private String description;
    private String email;
    @JsonProperty("is_followed")
    private boolean isFollowed;
    @JsonProperty("post_count")
    private Long postCount;
    @JsonProperty("following_count")
    private Long followingCount;
    public UserDto(User user, Long postCount, Long followingCount, boolean isFollowed) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.imgUrl = user.getImagePath();
        this.email = user.getEmail();
        this.description = user.getDescription();
        this.postCount = postCount;
        this.followingCount = followingCount;
        this.isFollowed = isFollowed;
    }
}