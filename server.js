const mysql = require("mysql");
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3399,

    // Your username
    user: "root",

    // Your password
    password: "Happy1786!!",
    database: "playlist_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
});
