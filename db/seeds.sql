INSERT INTO department (id, department_name, manager_id)
VALUES (1, "Marketing", 1234),
       (2, "Development", 2345),
       (3, "Finance", 3456),
       (4, "Operations", 4567);

SELECT * FROM department;

INSERT INTO employee (id, first_name, last_name, department)
VALUES (1234, "Michael", "Meyers", 1),
       (2345, "Jason", "Vorhees", 2),
       (3456, "Freddy", "Kruger", 3),
       (4567, "Donald", "Trump", 4),
       (9876, "Melissa", "Lycan", 1),
       (8765, "Cliff", "Riechert", 1),
       (7654, "Ben","Matchock", 2),
       (6543, "Christine", "Green", 3),
       (5432, "Joel", "Rodgers", 3),
       (4321, "Jason", "Zimmer", 4);
       
SELECT * FROM employee;

INSERT INTO roles (employee_id, job_title, role_id, )
VALUES (1234, "Manager", 1),
       (2345, "Manager", 1),  
       (3456, "Manager", 1),
       (4567, "Manager", 1), 
       (9876, "Engineer", 2),
       (7654, "Engineer", 2),
       (6543, "Engineer", 2),
       (4321, "Engineer", 2),
       (8765, "Intern", 3),
       (5432, "Intern", 4);
       
SELECT * FROM roles;