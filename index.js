const mysql = require("mysql2");
const inquier = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_DB",
});

function startPrompt() {
  const firstQuestion = inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update Employee Role",
      ],
      name: "routes",
    },
  ]);

  inquier
    .prompt(startQuestion)
    .then((response) => {
      switch (response.action) {
        case "View all employee":
          viewAll("employee");
          break;
        case "View all roles":
          viewAll("roles");
          break;
        case "View all departments":
          viewAll("departments");
          break;
        case "Add a department":
          addNewDepartment();
          break;
        case "Add a role":
          addNewRole();
          break;
        case "Add an employee":
          addNewEmployee();
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

const viewAll = (table) => {
  let query;
  if (table === "department") {
    query = `SELECT * FROM ${departments}`;
  } else if (table === "role") {
    query = `SELECT * FROM ${roles}`;
  } else {
    query = `SELECT * FROM ${employee} ;`;
  }
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    startPrompt();
  });
};

const addNewDepartment = () => {
  let questions = [
    {
      type: "input",
      name: "department_name",
      message: "what is the new department name?",
    },
  ];

  inquier
    .prompt(questions)
    .then((response) => {
      const query = `INSERT INTO department (name) VALUES (?)`;
      connection.query(query, [response.name], (err, res) => {
        if (err) throw err;
        console.log(
          `Successfully inserted ${response.name} department at id ${res.insertId}`
        );
        startPrompt();
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const addNewRole = () => {
  //get all department
  const departments = [];
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;

    res.forEach((dep) => {
      let newDepartment = {
        name: dep.name,
        value: dep.id,
      };
      departments.push(newDepartment);
    });

    //questions for roles
    let questions = [
      {
        type: "input",
        name: "title",
        message: "what is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "what is the salary of the new role?",
      },
      {
        type: "list",
        name: "department",
        choices: departments,
        message: "which department is this role in?",
      },
    ];

    inquier
      .prompt(questions)
      .then((response) => {
        const query = `INSERT INTO ROLE (title, salary, department_id) VALUES`;
        connection.query(
          query,
          [[response.title, response.salary, response.department]],
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
  });
};

const newEmployee = () => {
  //get all employees
  connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
    if (err) throw err;
    const employeeChoice = [
      {
        name: "None",
        value: 0,
      },
    ]; //an employee could have no manager
    emplRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });

    //get all the role list to make choice of employee's role
    connection.query("SELECT * FROM ROLE", (err, rolRes) => {
      if (err) throw err;
      const roleChoice = [];
      rolRes.forEach(({ title, id }) => {
        roleChoice.push({
          name: title,
          value: id,
        });
      });

      let questions = [
        {
          type: "input",
          message: "What is the employee id?",
          name: "id",
        },
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
          message: "What is their department?",
          choices: ["Marketing", "Finance", "Development", "Operations"],
          name: "department",
        },
        {
          type: "input",
          message: "What is their role in the department",
          choices: ["Manager", "Engineer", "Intern"],
          name: "job_title",
        },
      ];

      inquirer
        .prompt(questions)
        .then((response) => {
          const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
          let manager_id =
            response.manager_id !== 0 ? response.manager_id : null;
          connection.query(
            query,
            [
              [
                response.first_name,
                response.last_name,
                response.role_id,
                manager_id,
              ],
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `successfully inserted employee ${response.first_name} ${response.last_name} with id ${res.insertId}`
              );
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

function app() {
  function newEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee id?",
          name: "id",
        },
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
          message: "What is their department?",
          choices: ["Marketing", "Finance", "Development", "Operations"],
          name: "department",
        },
        {
          type: "input",
          message: "What is their role in the department",
          choices: ["Manager", "Engineer", "Intern"],
          name: "job_title",
        },
      ])
      .then((response) => {
        const employee = new Employee(
          response.id,
          response.first_name,
          response.last_name,
          response.role_id
        );
        teamMembers.push(manager);
        idArray.push(response.id);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What type of team member would you like to add?",
          choices: ["engineer", "intern", "No One else to add"],
          name: "role",
        },
      ])
      .then((response) => {
        switch (response.role) {
          case "engineer":
            addEngineer();
            break;

          case "intern":
            addIntern();
            break;

          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your team engineers name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the engineers id?",
          name: "id",
        },
        {
          type: "input",
          message: "What is their email?",
          name: "email",
        },
        {
          type: "input",
          message: "What is their github username?",
          name: "github",
        },
      ])
      .then((response) => {
        const engineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );

        teamMembers.push(engineer);
        idArray.push(response.id);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your interns name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the interns id?",
          name: "id",
        },
        {
          type: "input",
          message: "What is their email?",
          name: "email",
        },
        {
          type: "input",
          message: "What is school did they attend?",
          name: "school",
        },
      ])
      .then((response) => {
        const intern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        teamMembers.push(intern);
        idArray.push(response.id);
        createTeam();
      });
  }

  const updateRole = () => {
    //get all the employee list
    connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
      if (err) throw err;
      const employeeChoice = [];
      emplRes.forEach(({ first_name, last_name, id }) => {
        employeeChoice.push({
          name: first_name + " " + last_name,
          value: id,
        });
      });

      //get all the role list to make choice of employee's role
      connection.query("SELECT * FROM ROLE", (err, rolRes) => {
        if (err) throw err;
        const roleChoice = [];
        rolRes.forEach(({ title, id }) => {
          roleChoice.push({
            name: title,
            value: id,
          });
        });

        let questions = [
          {
            type: "list",
            name: "id",
            choices: employeeChoice,
            message: "whose role do you want to update?",
          },
          {
            type: "list",
            name: "role_id",
            choices: roleChoice,
            message: "what is the employee's new role?",
          },
        ];

        inquier
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
    });
  };
}
