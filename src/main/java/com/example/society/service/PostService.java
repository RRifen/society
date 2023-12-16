package com.example.society.service;

import com.example.society.dtos.FileDTO;
import com.example.society.dtos.PagePostsDto;
import com.example.society.dtos.RPostDto;
import com.example.society.dtos.SPostDto;
import com.example.society.exceptions.AppError;
import com.example.society.models.Post;
import com.example.society.models.PostFile;
import com.example.society.models.User;
import com.example.society.repositories.PostFilesRepository;
import com.example.society.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PostService {

    private final UserService userService;
    private final PostRepository postRepository;
    private final PostFilesRepository postFilesRepository;
    private final SimpleDateFormat timestampDateFormat;

    @Value("${posts.path}")
    private String POSTS_PATH;

    @Value("${files.path}")
    private String FILES_PATH;

    @Autowired
    public PostService(UserService userService, PostRepository postRepository, PostFilesRepository postFilesRepository, SimpleDateFormat timestampDateFormat) {
        this.userService = userService;
        this.postRepository = postRepository;
        this.postFilesRepository = postFilesRepository;
        this.timestampDateFormat = timestampDateFormat;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> readPosts(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Post> posts = postRepository.findAllByOrderByCreationTimestampDesc(pageable);
        Page<RPostDto> rPosts = retrievePageOfRPostsDto(posts);
        return ResponseEntity.ok(new PagePostsDto(rPosts));
    }

    private RPostDto convert(User user, Post post, List<PostFile> files) {
        boolean isLiked = postRepository.checkPostByLike(user.getId(), post.getId());
        return new RPostDto(post, isLiked, convert(files));
    }

    private List<FileDTO> convert(List<PostFile> files) {
        return files.stream().map((file) -> new FileDTO(file.getFilePath(), file.getFilename())).toList();
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> readUserPosts() {
        User author = retrieveUserFromContext();

        List<Post> posts = postRepository.findAllByUserOrderByCreationTimestampDesc(author);
        List<RPostDto> rPosts = posts.stream().map((post) -> {
            List<PostFile> files = postFilesRepository.findFileByPostId(post.getId());
            return convert(author, post, files);
        }).toList();
        return ResponseEntity.ok(rPosts);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> readPostsByHeader(String header, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Post> posts = postRepository.findAllByHeaderContainingOrderByCreationTimestampDesc(header, pageable);
        Page<RPostDto> rPosts = retrievePageOfRPostsDto(posts);
        return ResponseEntity.ok(new PagePostsDto(rPosts));
    }

    private Page<RPostDto> retrievePageOfRPostsDto(Page<Post> posts) {
        User user = retrieveUserFromContext();
        return posts.map((post) -> {
            List<PostFile> files = postFilesRepository.findFileByPostId(post.getId());
            return convert(user, post, files);
        });
    }

    private User retrieveUserFromContext() {
        String username = retrieveUsernameFromContext();
        return userService.findByUsername(username)
                .orElseThrow(RuntimeException::new);
    }

    @Transactional
    public ResponseEntity<?> createPost(SPostDto sPostDTO) {
        Post post;
        List<PostFile> files = Collections.emptyList();
        try {
            post = createNewPost(sPostDTO);
            post = postRepository.save(post);
            files = saveFiles(sPostDTO, post);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new AppError(
                            HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Error occurred during saving image",
                            timestampDateFormat.format(new Date())
                    )
            );
        }
        return ResponseEntity.created(createURI(post.getId()))
                .body(new RPostDto(post, false, convert(files)));
    }

    private Post createNewPost(SPostDto sPostDTO) throws Exception {
        User author = retrieveUserFromContext();
        Post post = new Post();
        Date date = new Date();

        post.setUser(author);
        post.setHeader(sPostDTO.getHeader());
        post.setText(sPostDTO.getText());
        post.setCreationTimestamp(new Timestamp(date.getTime()));
        if (sPostDTO.getImage() != null) {
            post.setImagePath(createImage(sPostDTO.getImage()));
        }
        return post;
    }

    private List<PostFile> saveFiles(SPostDto sPostDTO, Post post) throws Exception {
        List<PostFile> files = new ArrayList<>();
        for (MultipartFile multipartFile : sPostDTO.getFiles()) {
            if (multipartFile != null) {
                PostFile postFile = new PostFile();
                String filePath = createFile(multipartFile, post.getId());
                postFile.setFilePath(filePath);
                postFile.setFilename(multipartFile.getOriginalFilename());

                postFile.setPost(post);
                files.add(postFilesRepository.save(postFile));
            }
        }
        return files;
    }

    private String createFile(MultipartFile file, Long postId) throws Exception {
        String[] fileParts = Objects.requireNonNull(file.getOriginalFilename()).split("\\.");
        FileOutputStream fos;
        UUID uuid = UUID.randomUUID();
        String fileName = postId + "_" + uuid + "." + fileParts[fileParts.length - 1];
        try {
            fos = new FileOutputStream(FILES_PATH + fileName);
            fos.write(file.getBytes());
            fos.close();
        } catch (IOException e) {
            throw new Exception(e);
        }
        return fileName;
    }

    private String createImage(MultipartFile image) throws Exception {
        String[] fileParts = Objects.requireNonNull(image.getOriginalFilename()).split("\\.");
        FileOutputStream fos;
        Long postId = postRepository.lastId() + 1;
        String fileName = postId + "." + fileParts[fileParts.length - 1];
        try {
            fos = new FileOutputStream(POSTS_PATH + fileName);
            fos.write(image.getBytes());
            fos.close();
        } catch (IOException e) {
            throw new Exception(e);
        }
        return "/posts/" + fileName;
    }

    private URI createURI(Long id) {
        String postsEndpoint = "/api/posts/" + id;
        try {
            return new URI(postsEndpoint);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public ResponseEntity<?> deletePost(Long id) {
        String username = retrieveUsernameFromContext();

        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isEmpty()) {
            return new ResponseEntity<>(
                    new AppError(
                            HttpStatus.BAD_REQUEST.value(),
                            "Post doesn't exist",
                            timestampDateFormat.format(new Date())
                    ),
                    HttpStatus.BAD_REQUEST
            );
        }

        Post post = postOptional.get();
        if (!Objects.equals(post.getUser().getUsername(), username)) {
            return new ResponseEntity<>(
                    new AppError(
                            HttpStatus.FORBIDDEN.value(),
                            "Forbidden action",
                            timestampDateFormat.format(new Date())
                    ),
                    HttpStatus.FORBIDDEN
            );
        }

        postRepository.delete(post);
        return ResponseEntity.ok()
                .build();
    }

    private String retrieveUsernameFromContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal().toString();
    }

    @Transactional
    public ResponseEntity<?> likePost(Long postId) {
        try {
            postRepository.likePost(retrieveUserFromContext().getId(), postId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AppError(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage(),
                    timestampDateFormat.format(new Date())
            ));
        }
    }

    @Transactional
    public ResponseEntity<?> dislikePost(Long postId) {
        try {
            postRepository.dislikePost(retrieveUserFromContext().getId(), postId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AppError(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage(),
                    timestampDateFormat.format(new Date())
            ));
        }
    }

    @Transactional
    public ResponseEntity<?> readFollowUsersPosts(Integer pageNumber, Integer pageSize) {
        User user = retrieveUserFromContext();
        Long followerId = user.getId();
        Long offset = (long) pageNumber * pageSize;

        List<Post> posts = postRepository.findPostsByFollowing(followerId, offset, pageSize + 1);
        boolean hasNext = false;
        if (posts.size() == pageSize + 1) {
            hasNext = true;
            posts.remove((int) pageSize);
        }

        List<RPostDto> rPosts = posts.stream()
                .map((post) -> {
                    List<PostFile> files = postFilesRepository.findFileByPostId(post.getId());
                    return convert(user, post, files);
                })
                .toList();
        PagePostsDto page = new PagePostsDto(rPosts, hasNext, pageNumber, pageSize, -1);
        return ResponseEntity.ok(page);
    }

    public Long getPostCount(User user) {
        return postRepository.countPostsByUser(user);
    }

    public Long getFollowersCount(User user) {
        return postRepository.countFollowersByUser(user.getId());
    }
}
