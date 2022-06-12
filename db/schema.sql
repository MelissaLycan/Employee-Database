DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
  FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);

CREATE TABLE roles (
  id INT NOT NULL,
  job_title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE departments (
  id INT NOT NULL KEY,
  department_name VARCHAR(30),

  
);

SELECT DATABASE()