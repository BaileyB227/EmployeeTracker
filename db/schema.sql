DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    dname VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT,
    manager_id INT
);