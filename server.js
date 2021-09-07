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

  const sql  = `SELECT title, roles.id, dname AS department, salary
  FROM department
  JOIN roles ON department.id = roles.department_id`

  db.query(sql, (error, res) => {
    if (error) throw error;
    console.table(res);
    mainMenu();
  });
}

function addDept() {


}

function updateRole(){


}

function addRole(){


}



app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});