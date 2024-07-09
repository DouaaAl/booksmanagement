CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    contactNumber varchar(255),
    email text,
    password varchar(255),
    status varchar(255),
    role varchar(255),
)

-- @block

INSERT INTO users VALUES (
    "douaa",
    "0611211738",
    "douaa@gmail.com",
    "1234",
    "allowed",
    "admin"
)

-- @block
