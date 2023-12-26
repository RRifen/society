package com.example.society.utils;

import com.example.society.models.User;
import com.example.society.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContextUtils {

    private final UserService userService;

    public User retrieveUserFromContext() {
        String username = retrieveUsernameFromContext();
        return userService.findByUsername(username)
                .orElseThrow(RuntimeException::new);
    }

    public String retrieveUsernameFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal().toString();
    }

}
