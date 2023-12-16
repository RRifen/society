package com.example.society.dtos;

import com.example.society.models.Post;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class RPostDto {
    private Long id;
    private String header;
    private String text;
    @JsonProperty("image_url")
    private String imageUrl;
    private Timestamp creationTimestamp;
    private boolean isLiked;
    private Long authorId;
    @JsonProperty("json_pic")
    private String userPic;
    private String username;
    private List<FileDTO> files;

    public RPostDto(Post post, boolean isLiked, List<FileDTO> files) {
        this.id = post.getId();
        this.header = post.getHeader();
        this.text = post.getText();
        this.imageUrl = post.getImagePath();
        this.creationTimestamp = post.getCreationTimestamp();
        this.authorId = post.getUser()
                .getId();
        this.isLiked = isLiked;
        this.userPic = post.getUser().getImagePath();
        this.username = post.getUser().getUsername();
        this.files = files;
    }
}
