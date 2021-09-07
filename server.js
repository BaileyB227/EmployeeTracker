const mysql = require('mysql2');
const inquirer = require ('inquirer');
const PORT = process.env.PORT || 3001;
const express = require ('express')
const app = express();
require("console.table");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_DB'
    },
    console.log(`Connected to employees_db`)
);

db.connect(function (err) {
    if (err) throw err;
    mainMenu();
});

function mainMenu() {
    inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Department",
        "Add Employee",
        "Add Role",
        "Update Employee Role",
        "Quit"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployees();
          break;

        case "View Departments":
          viewDepts();
          break;
      
        case "View Roles":
          viewRoles();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;
        
        case "Update Employee Role":
          updateRole();
          break;

        case "Quit":
          console.log("Bye!")
          db.end();
          break;
      }
    });
}

function viewEmployees() {
  console.log("Viewing employees");

  const sql = `SELECT employee.id, first_name, last_name, title, dname AS department, salary, manager_id
  FROM employee
  INNER JOIN roles
  ON employee.role_id = roles.id
  INNER JOIN department
  ON roles.department_id = department.id`
    
  db.query(sql, (error, res) => {
    if (error) throw error;
    console.table(res);
    mainMenu();
    });
}

function viewDepts() {
  console.log("Viewing Departments");

  const sql = `SELECT id, dname AS department FROM department`

  db.query(sql, (error, res) => {
    if (error) throw error;
    console.table(res);
    mainMenu();
  });
}

function viewRoles() {
  console.log("Viewing Roles");

  const sql  = `SELECT roles.id, title, dname AS department, salary
  FROM department
  JOIN roles ON department.id = roles.department_id`

  db.query(sql, (error, res) => {
    if (error) throw error;
    console.table(res);
    mainMenu();
  });
}

function addDept() {
  inquirer
    .prompt([
      {
      type: "input",
      name: "department",
      message: "Department name?"
      }
    ])
  .then(function (answer) {
		const sql = "INSERT INTO department (dname) VALUES ( ? )";

		db.query(sql, answer.department, function (err, res) {
			if (err) throw err;
    })
    mainMenu();
	});
};


function addEmployee(){
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Employee first name?"
      },
      {
        type: "input", 
        name: "lastName",
        message: "Employee last name?"
      },
      {
        type: "input",
        name: "roleId",
        message: "What is their role id?"
      },
      {
        type: "input",
        name: "managerId",
        message: "What is their manager id?"
      }
    ])
  .then(function (answer) {
    const sql = "INSERT INTO employee SET ?";
  
    db.query(sql, 
     {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: answer.roleId,
      manager_id: answer.managerId
    }, 
      function (err, res) {
       if (err) throw err;
     })
     mainMenu();
  })
}

function addRole(){
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title?"
      },
      {
        type: "input", 
        name: "salary",
        message: "What is the salary?"
      },
      {
        type: "input",
        name: "departmentId",
        message: "What is the department id?"
      }
    ])
  .then(function (answer) {
    const sql = "INSERT INTO roles SET ?";
  
    db.query(sql, 
     {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentId
    }, 
      function (err, res) {
       if (err) throw err;
     })
     mainMenu();
  })
 
}

function updateRole(){
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the id of the employee you want to update:"
      },
      {
        type: "input",
        name: "updatedRole",
        message: "What is the ID of the role you want to give them?"
      }
    ])
    .then(function (answer) {
      const sql = `UPDATE employee SET role_id = ${answer.updatedRole} WHERE id = ${answer.employeeId}`

      db.query(sql, function (err, res) {
        if (err) throw err;
      })
      mainMenu();
    })
}

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});