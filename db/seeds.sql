INSERT INTO department (department_name)
VALUES ("Marketing"),
       ("Development"),
       ("Finance"),
       ("Operations");

SELECT * FROM department;

INSERT INTO roles (job_title, salary, department_id)
VALUES ("Manager", 100000, 1),
       ("Manager", 100000, 2),  
       ("Manager", 100000, 3),
       ("Manager", 100000, 4), 
       ("Engineer", 80000, 1),
       ("Engineer", 80000, 2),
       ("Engineer", 80000, 3),
       ("Engineer", 80000, 4),
       ("Intern", 65000, 1),
       ("Intern", 65000, 3);
       
SELECT * FROM roles;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Meyers", 1, NULL),
       ("Jason", "Vorhees", 2, NULL),
       ("Freddy", "Kruger", 3, NULL),
       ("Donald", "Trump", 4, NULL),
       ("Melissa", "Lycan", 5, 1),
       ("Cliff", "Riechert", 6, 2),
       ("Ben","Matchock", 7, 3),
       ("Christine", "Green", 8, 4),
       ("Joel", "Rodgers", 9, 1),
       ("Jason", "Zimmer", 10, 3);
       
SELECT * FROM employee;

