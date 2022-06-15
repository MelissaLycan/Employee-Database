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
          newDepartment();
          break;
        case "Add a role":
          newRole();
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

const newDepartment = () => {
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

const newRole = () => {
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
          console.log(`Successfully inserted ${res} role at id ${res.id}`);
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
  ];

  inquirer
    .prompt(questions)
    .then((response) => {
      const query = `INSERT INTO employee (first_name, last_name) VALUES (?)`;
      connection.query(
        query,
        [[response.first_name, response.last_name]],
        (err, res) => {
          if (err) throw err;
          console.log(
            `Successfully inserted ${response.first_name} at id ${res.id}`
          );
          startPrompt();
        }
      );
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateRole = () => {
  const empChoice = [];
  const roleChoice = [];
  let questions = [
    {
      type: "list",
      name: "id",
      choices: empChoice,
      message: "Whose role do you want to update?",
    },
    {
      type: "list",
      name: "role_id",
      choices: roleChoice,
      message: "What is the employee's new role?",
    },
  ];
  const query = `SELECT * FROM EMPLOYEE`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ first_name, last_name, id }) => {
      empChoice.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });

    connection.query(`SELECT * FROM ROLES`, (err, res) => {
      if (err) throw err;
      res.forEach(({ job_title, id }) => {
        roleChoice.push({
          name: job_title,
          value: id,
        });
      });

      inquirer
        .prompt(questions)
        .then((response) => {
          connection.query(
            `UPDATE employee SET employee.role_id = ? WHERE id = ?`,
            [response.role_id, response.id],
            (err, res) => {
              if (err) throw err;
              startPrompt();
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
};
