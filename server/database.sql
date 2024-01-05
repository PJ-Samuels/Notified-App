CREATE DATABASE Notified;

CREATE TABLE "Users"(
    id SERIAL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE "Subscribed_Artists"(
    user_id int NOT NULL,
    artist_name varchar(100) NOT NULL,
    artist_id varchar(100) NOT NULL,
    artist_img varchar(255) NOT NULL,
    latest_release varchar(100) NOT NULL,
    PRIMARY KEY (user_id, artist_name, artist_id, artist_img, latest_release),
    FOREIGN KEY (user_id) REFERENCES "Users"(id)
);


CREATE TABLE "Notifications"(
    user_id int NOT NULL,
    artist_name varchar(100) NOT NULL,
    artist_id varchar(100) NOT NULL,
    release_img varchar(255) NOT NULL,
    latest_release varchar(100) NOT NULL,
    notification_day DATE,
    PRIMARY KEY (user_id, artist_name,latest_release),
    FOREIGN KEY (user_id) REFERENCES "Users"(id)
);
CREATE TABLE "Artist_Preferences"(
    user_id int NOT NULL,
    artist_name varchar(100) NOT NULL,
    albums BOOLEAN NOT NULL,
    singles BOOLEAN NOT NULL,
    features BOOLEAN NOT NULL,
    texts BOOLEAN NOT NULL,
    email BOOLEAN NOT NULL,
    banners BOOLEAN NOT NULL,
    concerts BOOLEAN NOT NULL,
    merch BOOLEAN NOT NULL,
    PRIMARY KEY (user_id, artist_name),
    FOREIGN KEY (user_id) REFERENCES "Users"(id)
);

CREATE TABLE "unique_identifiers" (
    user_state varchar(255) NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (user_state, user_id),
    FOREIGN KEY (user_id) REFERENCES "Users"(id)
);