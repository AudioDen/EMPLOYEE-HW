const mysql = require("mysql");
const inquire = require("inquirer");
//const { start } = require("node:repl");
const inquirer = require("inquirer");
//const { forEach } = require("lodash");
let departmentArr = [];
let employeeArr = [];
let roleArr = [];
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
  loadDept();
  start();
});


const start = () => {
  inquire.prompt({
    name: "choices",
    type: "list",
    message: "Welcome to the Employee Tracker. What would like to do?",
    choices: ["Add", "View", "Update", "Exit"],

  })
    .then((answer) => {
      if (answer.choices === "Add") {
        add();
      }
      else if (answer.choices === "View") {
        view();
      }
      else if (answer.choices === "Update") {
        update();
      }
      else if (answer.choices === "Exit") {
        console.log("Goodbye, Thankyou ")
        connection.end();
      }
    });
  
}
////////////////////////////////////////////////////////////
// Loading Data into arrays

const loadDept = () => {
  connection.query("SELECT * FROM department", (err, data) => {
    for(i=0; i<data.length; i++){
      departmentArr.push(data[i].dep_name)
    }
  })
}
////////////////////////////////////////////////////////////
//adding to the tables

const add = () => {
  inquirer.prompt({
    name: "add",
    type: "list",
    message: "what would you like to add",
    choices: ["Department", "Role", "Employee", "Exit",],
  })
    .then((answer) => {
      if (answer.add === "Department") {
        addDepartment();
      }
      else if (answer.add === "Role") {
        addRole();
      }
      else if (answer.add === "Employee") {
        addEmployee();
      }
      else if (answer.add === "Exit") {
        console.log("Goodbye, Thankyou ")
        connection.end();
      }
    });
  

}

const addDepartment = () => {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    }
  ]).then(function (answer) {
    connection.query("INSERT INTO department(dep_name) VALUES (?)", [answer.department], (err, res) => {
      if (err) throw err;
      console.log("1 new department added: " + answer.department);
      loadDept()
      start()
    }) 
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
      choices: roleArr,
    },

  ]).then(function (answer) {
    console.log("1 new department added: " + answer.department);
    //send to the table

  })
}

addRole = () => {
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
      name: "department_id",
      type: "list",
      message: "Which deparment will be for this position?",
      choices: departmentArr
    },
  ]).then(function (answer) {
    //send to the table
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [answer.title, answer.salary, departmentArr.indexOf(answer.department_id) + 1], (err, data) => {
      if(err) throw err;
      console.log("1 new role added: " + answer.title, answer.salary, departmentArr.indexOf(answer.department_id) + 1);
      start()
    })
  })
}


///////////////////////////////////////
///Veiw


view = () => {
  inquirer.prompt([
    {
      name: "viewChoice",
      type: "list",
      message: "What would you like to view?",
      choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES", "EXIT"]
    }
  ]).then(answer => {
    if (answer.viewChoice === "DEPARTMENTS") {
      viewDepartments();
    }
    else if (answer.viewChoice === "ROLES") {
      viewRoles();
    }
    else if (answer.viewChoice === "EMPLOYEES") {
      viewEmployees();
    }
    else if (answer.viewChoice === "EXIT") {


      connection.end();
    } else {
      connection.end();
    }
  })
};

viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res)
    start();
  });


};
viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res)
    start()
  });


};

viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res)
    start()
  });


};



////////////////////////////////////
///Update
update = () => {
  inquirer.prompt([
    {
      name: "update",
      type: "list",
      message: "Select update employee role to update.",
      choices: ["Update Employee role", "EXIT"]
    }
  ]).then(answer => {
    if (answer.update === "Update employee role") {
      updateEmployeeRole();
    }

    else if (answer.update === "EXIT") {
      console.log("Goodbye, Thankyou ")
    }
  })
}


// updateEmployeeRole = () => {
//   //loopover employees and create array
// for(i = 0; i < employee table length; i++)
// i shoulequal employees list?
// }
// inquirer.prompt([ { 
//   name: "updateRole",
//   type: "list",
//   message: "Which employee's role would you like to update?",
//   choices: /// CHOICE OF  EMPLOYEES
// }
// ])
