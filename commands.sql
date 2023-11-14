CREATE DATABASE notes_app;
use notes_app;

CREATE TABLE notes(
    id integer PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
