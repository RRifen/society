CREATE TABLE likes
(
    post_id bigint,
    user_id bigint,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) references posts (id),
    FOREIGN KEY (user_id) references users (id)
);

CREATE TABLE followers
(
    follower_id  bigint,
    following_id bigint,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) references users (id),
    FOREIGN KEY (following_id) references users (id)
)