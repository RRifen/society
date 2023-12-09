package com.example.society.service;

import com.example.society.dtos.PageUsersDto;
import com.example.society.dtos.RegistrationUserDto;
import com.example.society.dtos.UpdateUserDto;
import com.example.society.dtos.UserDto;
import com.example.society.exceptions.AppError;
import com.example.society.models.Role;
import com.example.society.models.User;
import com.example.society.repositories.PostRepository;
import com.example.society.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final SimpleDateFormat timestampDateFormat;

    @Value("${users.path}")
    private String BASE_PATH;

    @Autowired
    public UserService(UserRepository userRepository, PostRepository postRepository, RoleService roleService, PasswordEncoder passwordEncoder, SimpleDateFormat timestampDateFormat) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.timestampDateFormat = timestampDateFormat;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                String.format("Пользователь '%s' не найден", username)
        ));
        log.trace(user.getRoles().stream().map(Role::getName).collect(Collectors.joining(" ")));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList())
        );
    }

    @Transactional
    public User createNewUser(RegistrationUserDto registrationUserDto) {
        User user = new User();
        user.setUsername(registrationUserDto.getUsername());
        user.setEmail(registrationUserDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationUserDto.getPassword()));
        user.setRoles(List.of(roleService.getUserRole()));
        user.setCreationTimestamp(new Timestamp(System.currentTimeMillis()));
        user.setImagePath("/users/defaultProfilePic.png");
        user.setDescription("");
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> readUsersByUsername(String username, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Long followerId = retrieveUserFromContext().getId();

        Page<User> users = userRepository.findAllByUsernameContaining(pageable, username);
        Page<UserDto> usersDto = users.map((user) -> {
            Long postsCount = postRepository.countPostsByUser(user);
            Long followersCount = postRepository.countFollowersByUser(user.getId());
            boolean isFollowed =  userRepository.checkUserByFollowing(followerId, user.getId());
            return new UserDto(user, postsCount, followersCount, isFollowed);
        });
        return ResponseEntity.ok(new PageUsersDto(usersDto));
    }

    @Transactional
    public ResponseEntity<?> updateUser(UpdateUserDto updateUserDto) {
        MultipartFile image = updateUserDto.getImage();
        Long id = userRepository.findByUsername(retrieveUsernameFromContext())
                .map(User::getId)
                .orElseThrow(RuntimeException::new);
        if (image == null) {
            User user = userRepository.updateDescription(updateUserDto.getDescription(), id);
            Long postsCount = postRepository.countPostsByUser(user);
            Long followersCount = postRepository.countFollowersByUser(user.getId());
            return ResponseEntity.ok(new UserDto(user, postsCount, followersCount, false));
        }
        String path;
        try {
            path = createImage(image, id);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new AppError(
                            HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Error occurred during saving image",
                            timestampDateFormat.format(new Date())
                    )
            );
        }
        User user = userRepository.updateImagePathAndDescription(path,
                updateUserDto.getDescription(), id);
        Long postsCount = postRepository.countPostsByUser(user);
        Long followersCount = postRepository.countFollowersByUser(user.getId());
        return ResponseEntity.ok(new UserDto(user, postsCount, followersCount, false));
    }

    @Transactional
    public ResponseEntity<?> followUser(Long followingId) {
        User user = retrieveUserFromContext();
        if (!user.getId().equals(followingId)) {
            userRepository.follow(user.getId(), followingId);
        }
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<?> unfollowUser(Long followingId) {
        User user = retrieveUserFromContext();
        if (!user.getId().equals(followingId)) {
            userRepository.unfollow(user.getId(), followingId);
        }
        return ResponseEntity.ok().build();
    }

    private String createImage(MultipartFile image, Long userId) throws Exception {
        String[] fileParts = Objects.requireNonNull(image.getOriginalFilename()).split("\\.");
        FileOutputStream fos;
        String fileName = userId + "." + fileParts[fileParts.length - 1];
        try {
            fos = new FileOutputStream(BASE_PATH + fileName);
            fos.write(image.getBytes());
            fos.close();
        } catch (IOException e) {
            throw new Exception(e);
        }
        return "/users/" + fileName;
    }

    private String retrieveUsernameFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal().toString();
    }


    public ResponseEntity<?> readUser() {
        User user = userRepository.findByUsername(retrieveUsernameFromContext()).orElseThrow();
        Long postsCount = postRepository.countPostsByUser(user);
        Long followersCount = postRepository.countFollowersByUser(user.getId());
        return ResponseEntity.ok(new UserDto(user, postsCount, followersCount, false));
    }

    private User retrieveUserFromContext() {
        String username = retrieveUsernameFromContext();
        User user = findByUsername(username)
                .orElseThrow(RuntimeException::new);
        return user;
    }
}
