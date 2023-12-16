package com.example.society.repositories;

import com.example.society.models.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostFilesRepository extends JpaRepository<PostFile, Long> {

    @Query(value = "SELECT * FROM post_files WHERE post_id=?1", nativeQuery = true)
    List<PostFile> findFileByPostId(Long postId);
}
