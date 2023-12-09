package com.example.society.repositories;

import com.example.society.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Page<User> findAllByUsernameContaining(Pageable pageable, String username);
    @Query(value = "UPDATE users SET image_path=?1, description=?2 WHERE id=?3 RETURNING *", nativeQuery = true)
    User updateImagePathAndDescription(String imgPath, String description, Long id);
    @Query(value = "UPDATE users SET description=?1 WHERE id=?2 RETURNING *", nativeQuery = true)
    User updateDescription(String description, Long id);
    @Query(value = "SELECT last_value FROM posts_id_seq;", nativeQuery = true)
    Long lastId();
    @Query(value = "SELECT EXISTS (SELECT 1 FROM followers WHERE follower_id=?1 AND following_id=?2)", nativeQuery = true)
    boolean checkUserByFollowing(Long followerId, Long followingId);
    @Modifying
    @Query(value = "INSERT INTO followers(follower_id, following_id) VALUES (?1, ?2)", nativeQuery = true)
    void follow(Long followerId, Long followingId);
    @Modifying
    @Query(value = "DELETE FROM followers WHERE follower_id=?1 AND following_id=?2", nativeQuery = true)
    void unfollow(Long followerId, Long followingId);
}
