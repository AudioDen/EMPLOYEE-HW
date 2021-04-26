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
  loadEmployee();
  loadDept();
  loadRole();
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
    for (i = 0; i < data.length; i++) {
      departmentArr.push(data[i].dep_name)
    }
  })
}

const loadRole = () => {
  connection.query("SELECT id, title FROM role", (err, data) => {
    for (i = 0; i < data.length; i++)
      roleArr.push(data[i].title)
  })
}

const  loadEmployee = () => { 
  connection.query ("SELECT CONCAT_WS(' ' ,first_name, last_name, role_id) AS newEmployee FROM employee", (err, data) => {
    for(i = 0; i < data.length; i++)
    employeeArr.push.data[i];
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
      loadDept()
      console.log("1 new department added: " + answer.department);
      viewDepartments();
      start()
    })
    //send to the table

  })
}

const addEmployee = () => {
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
      name: "role_id",
      type: "list",
      message: "What is this employees role?",
      choices: roleArr,
    },

  ]).then(function (answer) {
    console.log("1 new employee added: " + answer.first_name, answer.last_name, answer.role_id);
    //send to the table
connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES(?,?,?)", [answer.first_name, answer.last_name, roleArr.indexOf(answer.role_id) + 1]);


  })
}

const addRole = () => {
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
      if (err) throw err;
      console.log("1 new role added: " + answer.title, answer.salary, departmentArr.indexOf(answer.department_id) + 1);
      start()
    })
  })
}


///////////////////////////////////////
///Veiw


const view = () => {
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

const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res)
    start();
  });


};
const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res)
    start()
  });


};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res)
    start()
  });


};



////////////////////////////////////
///Update
const update = () => {
  inquirer.prompt([
    {
      name: "update",
      type: "list",
      message: "Select update employee role to update.",
      choices: ["Update employee role", "EXIT"]
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


const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      name: "employee_choice",
      type: "list",
      message: "which employee's role would you like to",
      choices: employeeArr
    }
  ])
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
// function getChoices (){
//   var exampleChoices = [
//        {name: "Manager1", value: 1},
//        {name: "Manager2", value: 2}, 
//        {name: "Manager3", value: 3}, 
//      ]
//   return exampleChoices
// } inquirer.prompt({
//   name: "managerSelect",
//   type: "list",
//   message: "Who is this new Employee's manager?",
//   choices: getChoices(), //this function should return an array of employees that looks like the example array below
// })

// getChoices should return something that looks like this:
//    [
//      {name: "Manager1", value: 1},
// //user sees Manager1. Selecting this choice makes answer.managerSelect have the value 1.
//      {name: "Manager2", value: 2}, 
//      {name: "Manager3", value: 3}, 
//    ]
//    inquirer.prompt({
//     name: "managerSelect",
//     type: "list",
//     message: "Who is this new Employee's manager?",
//     choices: [
//        {name: "Manager1", value: 1},
// //user sees Manager1. Selecting this choice makes answer.managerSelect have the value 1.
//        {name: "Manager2", value: 2}, 
//        {name: "Manager3", value: 3}, 
//      ],

//   })