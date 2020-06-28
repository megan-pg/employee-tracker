const mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const db = require("./db/Database");

//const table = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3399
    port: 3399,

    // Your username
    user: "root",

    // Your password
    password: "Happy1786!!",
    database: "employee-db"
});

const start = () => {



    connection.connect(function start() {

        inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add employee",
                "Add role",
                "Add department",
                "Remove employee",
                "Remove department",
                "Update employee role",
                "Exit"

            ]
        }).then(answer => {

            switch (answer.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View all roles":
                    viewAllRole();
                    break;
                case "View all departments":
                    viewAllDepts();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "Add departmen":
                    addDept();
                    break;
                case "Remove employee":
                    removeEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "Exit":
                    process.exit(-1)
                    return;


            }
        })

    })

}

async function addDept() {

    const employees = await db.findAll("employee");
    console.table(`${employees.length} employees found: `, employees);

}
start();

function addDept() {
    inquirer
        .prompt({
            name: "action",
            type: "input",
            message: ("What is the name of the new department?"),
            validate: function trueName(name) {
                if (name === '') {
                    console.log("You must enter a valid department name!");
                    return false;
                }
                else {
                    return true;
                }
            }
        })
        .then(function (answer) {
            let query = "INSERT INTO department SET ?";
            connection.query(query,
                {
                    dept_name: answer.action
                },
                function (err, res) {
                    if (err) console.log(err);
                    console.log("\nDepartment added successfully!\n")
                    homeQuestions();
                })
        })
}
async function addRole() {
    const deptList = await doQuery("SELECT * FROM department");

    const deptListChoices = [];
    deptList.forEach(elem => {

        let currDept = {
            name: `${elem.dept_name}`,
            value: elem.id,
            short: elem.dept_name
        }

        deptListChoices.push(currDept);
    });

    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: ("What is the title of the new role?"),
                validate: function validateRoleName(name) {
                    if (name === '') {
                        console.log("You must enter a valid role title!");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                name: "salary",
                type: "input",
                message: ("Enter salary: "),
                validate: function (value) {
                    if (isNaN(parseInt(value)) === true) {
                        return new Error("Please delete your entry and enter a valid number!");
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                name: "dept",
                type: "list",
                message: ("Which department does this role belong in?"),
                choices: deptListChoices
            }
        ])
        .then(function (answer) {

            connection.query("INSERT INTO role SET ?",
                {
                    title: answer.name,
                    salary: answer.salary,
                    department_id: answer.dept

                },
                function (err, res) {
                    if (err) console.log(err);
                    console.log("\nRole added successfully!\n")
                    homeQuestions();
                }
            )

        })


}
async function addEmployee() {
    let query = "SELECT employee.emp_id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.id, role.title, role.salary, role.department_id, department.id, department.dept_name ";
    query += "FROM employee JOIN role ON (employee.role_id = role.id)";
    query += "JOIN department ON (role.department_id = department.id)";

    const aRole = await doQuery("SELECT * FROM role");

    const aEmp = await doQuery(query);

    const aEmpChoices = [];
    aEmp.forEach(elem => {

        let currEmp = {
            name: `${elem.first_name} ${elem.last_name}`,
            value: elem.emp_id,
            short: elem.first_name
        }

        aEmpChoices.push(currEmp);
    });


    const aRoleChoices = [];
    aRole.forEach(elem => {

        let currRole = {
            name: `${elem.title}`,
            value: elem.id,
            short: elem.title
        }

        aRoleChoices.push(currRole);
    });

    inquirer
        .prompt([
            {
                name: "first",
                type: "input",
                message: chalk.magenta("What is the first name of the new employee?"),
                validate: function (value) {
                    if (value === "") {
                        return new Error("You must enter a valid name!");
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "last",
                type: "input",
                message: ("What is the last name of the new employee?"),
                validate: function (value) {
                    if (value === "") {
                        return new Error("You must enter a valid name!");
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "titleID",
                type: "list",
                message: ("What is their position?"),
                choices: aRoleChoices
            },
            {
                name: "manager",
                type: "list",
                message: ("Who is their manager?"),
                choices: aEmpChoices
            }
        ])
        .then(function (answers) {

            connection.query(
                "INSERT INTO employee SET ? ",
                [
                    {
                        first_name: answers.first,
                        last_name: answers.last,
                        role_id: answers.titleID,
                        manager_id: answers.manager
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log(chalk.yellow("\nEmployee record sucessfully created!\n"));
                    homeQuestions();
                }
            );
        });


}