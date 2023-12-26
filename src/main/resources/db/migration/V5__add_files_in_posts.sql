CREATE TABLE post_files (
    file_id bigserial,
    post_id bigint,
    file_path varchar(1000) not null,
    filename varchar(500) not null,
    primary key (file_id),
    foreign key (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
