DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
  FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

CREATE TABLE roles (
  id INT NOT NULL KEY,
  job_title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE department (
  id INT NOT NULL KEY,
  department_name VARCHAR(30),
  manager_id INT,
  FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);

SELECT DATABASE()