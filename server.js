const mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const db = require("./db");

const table = require("console.table");

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

async function viewAllEmployees() {

    const employees = await db.findAll("employee");
    console.table(`${employees.length} employees found: `, employees);
    start();
}