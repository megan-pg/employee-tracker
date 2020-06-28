const connection = require("../server");


class DB {
    constructor(connection) {
        this.connection = connection;

    }
    createEmployee(employee) {
        return this.connection.query('INSERT INTO employee SET ?', employee);
    }
    creatRole(role) { }


    createDept(department) { }

    findAll(input) {
        return this.connection.query(
            `SELECT * FROM ${input}`

        );


    }
}

module.exports