INSERT INTO rooms (street, owner_id) VALUES ('Highway 37',1),
('Highway 36',1),
('Highway 35',2)

-- @block
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
create table bill {
	id int NOT NULL AUTO_INCEREMENT,
	uuid varchar(200) NOT NULL,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	contactNumber varchar(20) NOT NULL,
	paymentMethod varchar(50) NOT NULL,
	total int NOT NULL,
	productDetails JSON DEFAULT NULL,
	createdBy varchar(255) NOT NULL
}
-- @block
ALTER TABLE rooms DROP FOREIGN KEY rooms_ibfk_1;
