DROP TABLE Users;
-- @block
CREATE TABLE Users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    contactNumber varchar(255),
    email varchar(255),
    password varchar(255),
    role varchar(255),
    status varchar(255)
);
