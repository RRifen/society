drop table if exists users_roles;
drop table if exists followers;
drop table if exists likes;
drop table if exists messages;
drop table if exists posts;
drop table if exists users;
drop table if exists roles;
drop table if exists chats;
drop index if exists idx_username;
drop index if exists idx_author_id;
drop index if exists idx_header;

create table users
(
    id                 bigserial,
    username           varchar(30) not null unique,
    password           varchar(80) not null,
    email              varchar(50) unique,
    description        varchar(300) default '',
    image_path         varchar(300) default '',
    creation_timestamp timestamp   not null,
    primary key (id)
);

create table roles
(
    id   serial,
    name varchar(50) not null,
    primary key (id)
);

CREATE TABLE users_roles
(
    user_id bigint not null,
    role_id int    not null,
    primary key (user_id, role_id),
    foreign key (user_id) references users (id),
    foreign key (role_id) references roles (id)
);

CREATE TABLE posts
(
    id                 bigserial,
    header             varchar(500)  not null,
    text               varchar(5000) not null,
    img_path           varchar(100),
    creation_timestamp timestamp     not null,
    author_id          bigint        not null,
    primary key (id),
    foreign key (author_id) references users (id)
);

-- CREATE TABLE chats
-- (
--     id                 bigserial,
--     user_sender_id     bigint    not null,
--     user_receiver_id   bigint    not null,
--     creation_timestamp timestamp not null,
--     primary key (id),
--     foreign key (user_sender_id) references users (id),
--     foreign key (user_receiver_id) references users (id),
--     unique (user_sender_id, user_receiver_id)
-- );

CREATE TABLE messages
(
    id                 bigserial,
    sender_id          bigint       not null,
    receiver_id        bigint       not null,
    text               varchar(500) not null,
    creation_timestamp timestamp    not null,
    primary key (id),
    foreign key (sender_id) references users (id) ON DELETE set null
);

CREATE INDEX idx_username
    ON users (username);

CREATE INDEX idx_author_id
    ON posts (author_id);

CREATE INDEX idx_header
    ON posts (header);

insert into roles (name)
values ('ROLE_USER'),
       ('ROLE_ADMIN');

insert into users (username, password, email, creation_timestamp)
values ('user', '$2a$04$Fx/SX9.BAvtPlMyIIqqFx.hLY2Xp8nnhpzvEEVINvVpwIPbA3v/.i', 'user@gmail.com', CURRENT_TIMESTAMP),
       ('admin', '$2a$04$Fx/SX9.BAvtPlMyIIqqFx.hLY2Xp8nnhpzvEEVINvVpwIPbA3v/.i', 'admin@gmail.com', CURRENT_TIMESTAMP);

insert into users_roles (user_id, role_id)
values (1, 1),
       (2, 2);