CREATE DATABASE Notified;

CREATE TABLE "Users"(
    id SERIAL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
-- create table "Artists"(
-- 	artist_id VARCHAR(225) NOT NULL,
-- 	artist_name VARCHAR(225) NOT NULL,
-- 	artist_image VARCHAR(225) NOT NULL,
-- 	primary key (artist_id)
-- );
CREATE TABLE "Subscribed_Artists"
(
    user_id int NOT NULL,
    artist_name varchar(100) NOT NULL,
    artist_id varchar(100) NOT NULL,
    artist_img varchar(255) NOT NULL,
    latest_release varchar(100) NOT NULL,
    PRIMARY KEY (user_id, artist_name, artist_id, artist_img, artist_latest_album),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
