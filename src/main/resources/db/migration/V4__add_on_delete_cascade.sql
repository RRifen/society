ALTER TABLE public.likes
    DROP CONSTRAINT likes_post_id_fkey,
    ADD CONSTRAINT likes_post_id_fkey
        FOREIGN KEY (post_id)
            REFERENCES posts (id)
            ON DELETE CASCADE;

ALTER TABLE public.likes
    DROP CONSTRAINT likes_user_id_fkey,
    ADD CONSTRAINT likes_user_id_fkey
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE;

ALTER TABLE public.followers
    DROP CONSTRAINT followers_follower_id_fkey,
    ADD CONSTRAINT followers_follower_id_fkey
        FOREIGN KEY (follower_id)
            REFERENCES users (id)
            ON DELETE CASCADE;

ALTER TABLE public.followers
    DROP CONSTRAINT followers_following_id_fkey,
    ADD CONSTRAINT followers_following_id_fkey
        FOREIGN KEY (following_id)
            REFERENCES users (id)
            ON DELETE CASCADE;
