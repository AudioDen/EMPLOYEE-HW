const mysql = require("mysql");
const inquire = require("inquirer");
const { start } = require("node:repl");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Riley/277",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  start();
});


const start = () => {
  inquire.prompt({
    name: "choices",
    type: "list",
    message: "Welcome to the Employee Tracker. What would like to do?",
    choices: ["Add", "View,", "Update"],

  })
    .then((answer) => {
      if (answer.choices === "ADD") {
        add();
      }
      else if (answer.choices === "VIEW") {
        view();
      }
      else if (answer.choices === "UPDATE") {
        update();
      }
      else if (answer.choices === "EXIT") {
        console.log("Goodbye, Thankyou ")
      }
    });
  connection.end();
}
//adding to the tables
const add = () => {
  inquirer.prompt({
    name: "add",
    type: "list",
    message: "what would you like to add",
    choices: ["Department", "Role", "Employee", "Exit",],
  })
    .then((answer) => {
      if (answer.choices === "Department") {
        addDeparment();
      }
      else if (answer.choices === "Role") {
        addRole();
      }
      else if (answer.choices === "Employee") {
        addEmployee();
      }
      else if (answer.choices === "EXIT") {
        console.log("Goodbye, Thankyou ")
      }
    });
  connection.end();

}

addDepartment = () => {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    }
  ]).then(function (answer) {
    console.log("1 new department added: " + answer.department);
    //send to the table

  })
}

addEmployee = () => {
  inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is this employees first name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is this employees last name?"
    },
    {
      name: "role-id",
      type: "list",
      message: "What is this employees role?",
      choices: ["Manager", "Sales", "Cashier", "Stock"],
    },
    
  ]).then(function (answer) {
    console.log("1 new department added: " + answer.department);
    //send to the table

  })
}

addrole = () => {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What role would you like to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this position?"
    },
    {
      name: "departmet_id",
      type: "list",
      message: "Which deparment will be for this position?",
      choices: ["Manager", "Sales", "Cashier", "Stock"]
    },
  ]).then(function (answer) {
    console.log("1 new role added: " + answer.title, answer.salary, answer.department_id);
    //send to the table

  })
}
