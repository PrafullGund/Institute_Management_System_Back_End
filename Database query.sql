Create Database institute_management_system;
use institute_management_system;

create table userType(
	id int auto_increment primary key,
    userTypeName VARCHAR(10),
    userTypeDescription text
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    dob TIMESTAMP NOT NULL,
    userTypeId INTEGER,
    FOREIGN KEY (userTypeId) REFERENCES UserType(Id) ON DELETE CASCADE
);






CREATE TABLE roles(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE userRoleMapper(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER,
    roleId INTEGER,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE features(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE FeatureRoleMapping(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    featureId INTEGER,
    roleId INTEGER,
    FOREIGN KEY (featureId) REFERENCES features(id) ON DELETE CASCADE,
	FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE userAdresses(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER,
    addressLineOne VARCHAR (100) NOT NULL,
    addressLineTwo VARCHAR(100) NOT NULL,
    country VARCHAR (20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    city VARCHAR(50) NOT NULL,
    postalCode INTEGER,
    FOREIGN KEY (userId) REFERENCES users(Id) ON DELETE CASCADE
);
