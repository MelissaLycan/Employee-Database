const mysql2 = require("mysql2");
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

function startPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "routes",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update Employee Role",
        "End",
      ],
    })
    .then(function ({ routes }) {
      switch (routes) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add a department":
          addNewDepartment();
          break;
        case "Add a role":
          addNewRole();
          break;
        case "Add an employee":
          newEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        default:
          connection.end();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

console.log("Welcome to the Team Database");
startPrompt();

const viewAllDepartments = () => {
  connection.query("SELECT * FROM department", function (err, res, fields) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};

const viewAllRoles = () => {
  connection.query("SELECT * FROM roles", function (err, res, fields) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};

const viewAllEmployees = () => {
  connection.query(
    "SELECT * FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id",
    function (err, res, fields) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
};

const addNewDepartment = () => {
  let questions = [
    {
      type: "input",
      name: "department_name",
      message: "What is the new department name?",
    },
  ];

  inquirer
    .prompt(questions)
    .then((response) => {
      const query = `INSERT INTO department (department_name) VALUES (?)`;
      connection.query(query, [response.department_name], (err, res) => {
        if (err) throw err;
        console.log(
          `Successfully inserted ${response.department_name} department at id ${res.insertId}`
        );
        startPrompt();
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const addNewRole = () => {
  let questions = [
    {
      type: "input",
      name: "job_title",
      message: "What is the new Job Role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the Salary for this Role?",
    },
    {
      type: "input",
      name: "department_id",
      message: "What is the department name this role belongs to?",
      choices: [1, 2, 3, 4, 5],
    },
  ];
  inquirer
    .prompt(questions)
    .then((response) => {
      const query = `INSERT INTO roles (job_title, salary, department_id) VALUES(?)`;
      connection.query(
        query,
        [[response.job_title, response.salary, response.department_id]],
        (err, res) => {
          if (err) throw err;
          console.log(
            `Successfully inserted ${response.title} role at id ${res.insertId}`
          );
          startPrompt();
        }
      );
    })
    .catch((err) => {
      console.error(err);
    });
};

const newEmployee = () => {
  let questions = [
    {
      type: "input",
      message: "What is the new employees first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the new employees last name?",
      name: "last_name",
    },
    {
      type: "list",
      message: "What is their role in the department",
      choices: [1, 2, 3],
      name: "job_title",
    },
    {
      type: "list",
      message: "What is their managers id?",
      choices: [1, 2, 3, 4, 5, "NULL"],
      name: "manager_id",
    },
    {
      type: "list",
      message: "What is their job_title",
      choices: ["Manager", "Engineer", "Intern", "Sales Person"],
      name: "job_title",
    },
    {
      type: "list",
      message: "What is the Salary of the new employee?",
      choices: [60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000],
      name: "salary",
    },
    {
      type: "list",
      message: "What is their department name?",
      choices: ["Marketing", "Development", "Finance", "Operations", "Sales"],
      name: "department_name",
    },
  ];

  inquirer
    .prompt(questions)
    .then((response) => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
      const query2 = `INSERT INTO roles (job_title, salary) VALUES (?)`;
      const query3 = `INSERT INTO department(department_name) VALUES (?)`;

      connection.query(
        query,
        [
          [
            response.first_name,
            response.last_name,
            response.role_id,
            response.manager_id,
          ],
        ],
        (err, res) => {
          if (err) throw err;
          console.table(res);
        }
      ),
        connection.query(
          query2,
          [[response.job_title, response.salary]],
          (err, res) => {
            if (err) throw err;
            console.table(res);
          }
        ),
        connection.query(
          query3,
          [[response.department_name]],
          (err, res) => {
            if (err) throw err;
            console.log(res);
          },

          startPrompt()
        );
    })
    .catch((err) => {
      console.error(err);
    });

  const updateRole = () => {
    connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
      if (err) throw err;
      const employeeChoice = [];
      emplRes.forEach(({ first_name, last_name, id }) => {
        employeeChoice.push({
          name: first_name + " " + last_name,
          value: id,
        });
      });
    });

    //get all the role list to make choice of employee's role
    connection.query("SELECT * FROM ROLE", (err, res) => {
      if (err) throw err;
      const roleChoice = [];
      rolRes.forEach(({ job_title, id }) => {
        roleChoice.push({
          name: job_title,
          value: id,
        });
      });

      let questions = [
        {
          type: "list",
          name: "id",
          choices: employeeChoice,
          message: "Whose role do you want to update?",
        },
        {
          type: "list",
          name: "role_id",
          choices: roleChoice,
          message: "What is the employee's new role?",
        },
      ];

      inquirer
        .prompt(questions)
        .then((response) => {
          const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
          connection.query(
            query,
            [{ role_id: response.role_id }, "id", response.id],
            (err, res) => {
              if (err) throw err;

              console.log("successfully updated!");
              startPrompt();
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };
};
