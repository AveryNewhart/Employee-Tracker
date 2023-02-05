-- create three tables
    -- data for the tables/columns in the mod chal guideline

-- creating database
CREATE DATABASE employer_db;

-- using the database created
USE employer_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- auto increment the primary key
    name VARCHAR(30) -- hold department name
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- auto increment the primary key,
    roleN VARCHAR(30),
    roleS INT,
    depId INT, -- hold reference to department the role belongs to
    FOREIGN KEY (depId) -- getting the primary key from department table and making it a foreign key.
    REFERENCES department(id) -- tells it to refer to the department table to get the id. 
    ON DELETE SET NULL -- sets everything to NULL if content from parent table is deleted.
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lastN VARCHAR(30) NOT NULL,
    firstN VARCHAR(30) NOT NULL,
    roleId INT, -- hold reference for employee roll
    managerId INT, -- hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
    FOREIGN KEY (roleId) -- after employee!! so this will refer to the key in the role table. 
    REFERENCES role(id) -- refering to the role table and the id inside(the foregin key that was go by gettin gthe primary key earlier.)
    ON DELETE SET NULL -- sets everything to NULL if content from parent table is deleted.
);
