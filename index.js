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

  