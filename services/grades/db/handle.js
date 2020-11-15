const mysql = require('mysql');

const connectDB = mysql.createConnection(
    {
        database: process.env.DB_NAME,
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password: process.env.DB_PASS,
    });

module.exports = connectDB