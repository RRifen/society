package com.example.society.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${paths.posts}")
    private String basePostsPath;
    @Value("${paths.users}")
    private String baseUsersPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/posts/**")
                .addResourceLocations("file:" + basePostsPath);
        registry.addResourceHandler("/users/**")
                .addResourceLocations("file:" + baseUsersPath);
    }

}
