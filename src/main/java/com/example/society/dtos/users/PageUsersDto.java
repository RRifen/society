package com.example.society.dtos.users;

import com.example.society.dtos.users.UserDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
public class PageUsersDto {
    private List<UserDto> users;
    @JsonProperty("has_next")
    private boolean hasNext;
    @JsonProperty("next_page")
    private int nextPage;
    @JsonProperty("page_size")
    private int pageSize;
    @JsonProperty("total_count")
    private long totalCount;

    public PageUsersDto(Page<UserDto> page) {
        this.users = page.getContent();
        this.hasNext = page.hasNext();
        this.nextPage = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.totalCount = page.getTotalElements();
    }
}
