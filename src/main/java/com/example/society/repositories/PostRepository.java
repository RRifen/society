package com.example.society.repositories;

import com.example.society.models.Post;
import com.example.society.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByOrderByCreationTimestampDesc(Pageable pageable);

    List<Post> findAllByUserOrderByCreationTimestampDesc(User user);

    Page<Post> findAllByHeaderContainingOrderByCreationTimestampDesc(String header, Pageable pageable);

    @Query(value = "SELECT last_value FROM posts_id_seq;", nativeQuery = true)
    Long lastId();

    @Query(value = "SELECT EXISTS (SELECT 1 FROM likes WHERE user_id=?1 AND POST_ID=?2)", nativeQuery = true)
    boolean checkPostByLike(Long userID, Long postId);

    @Modifying
    @Query(value = "INSERT INTO likes(user_id, post_id) VALUES (?1, ?2)", nativeQuery = true)
    void likePost(Long userId, Long postId);

    @Modifying
    @Query(value = "DELETE FROM likes WHERE user_id=?1 AND post_id=?2", nativeQuery = true)
    void dislikePost(Long userId, Long postId);

    @Query(value = "SELECT id, header, text, img_path, creation_timestamp, author_id from posts p " +
                   "JOIN (SELECT * FROM followers WHERE follower_id=?1) f ON (p.author_id = f.following_id) " +
                   "ORDER BY creation_timestamp DESC OFFSET ?2 LIMIT ?3", nativeQuery = true)
    List<Post> findPostsByFollowing(Long userId, Long offset, Integer pageSize);

    Long countPostsByUser(User user);

    @Query(value = "SELECT COUNT(*) FROM followers WHERE following_id=?1", nativeQuery = true)
    Long countFollowersByUser(Long userId);
}
