CREATE TABLE Users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    contactNumber varchar(255),
    email varchar(255),
    password varchar(255),
    role varchar(255),
    status varchar(255)
);

-- @block
CREATE TABLE category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

-- @block
CREATE table product(
    id integer PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20)
)

-- @block

INSERT INTO Users VALUES 
("douaa", 0606921738, "douaa@gmail.com", "1234565", "admin", "allowed"),
( "aya", 0611211738, "aya@gmail.com", "1234", "user", "restricted")
-- @block

Select * FROM Users WHERE id =1

-- @block
UPDATE Users SET name = "newdouaa" WHERE id = 1

-- @block
DELETE FROM Users WHERE id = 1
-- @block
CREATE TABLE RefreshToken (
    id integer PRIMARY KEY AUTO_INCREMENT,
    refreshToken varchar(255)
);
-- @block
INSERT INTO RefreshToken(refreshToken) VALUES ("token")
-- @block
SELECT * FROM RefreshToken
-- @block

CREATE TABLE bill (
    id integer PRIMARY KEY AUTO_INCREMENT,
	uuid varchar(255),
	name varchar(255),
	email varchar(255) NOT NULL,
	contactNumber varchar(20) NOT NULL,
	paymentMethod varchar(50) NOT NULL,
	total int NOT NULL,
	productDetails JSON DEFAULT NULL,
	createdBy varchar(255) NOT NULL
)

-- @block


INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values("douaa", "635ffec0-33fe-11ef-b471-83926b767509", "douaa@info.com", 0611211738, "Cash", 502, '{"country": "United Kingdom", "cities": [{"city": "London"}]}', "douaa")

-- @block
DELETE FROM bill
-- @block
SELECT * FROM bill
-- @block
create table category (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL
)
-- @block
INSERT INTO category(name) values("history"), ("drama"), ("sci-fi")
-- @block
INSERT INTO category(name) values("education")
-- @block
SELECT * FROM category
-- @block
SELECT count(id) as categoryCount from category

-- @block
INSERT INTO product(
    name,
    categoryId,
    description,
    price,
    status
) values("beginner's python", 4, "intersting book", 52, "available"),
("beginner's javascript",  4, "intersting book", 520, "available"),
("beginner's java",  4, "intersting book", 528, "available")
-- @block
SELECT * FROM product

-- @block
SELECT * FROM product WHERE id=1

-- @block
DROP TABLE Users;

