const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
(async () => {
    try {
        const [rows] = await connection.query('SELECT 1');
        console.log('Database connection successful');
    } catch (err) {
        console.error('Error connecting to the database: ', err.message);
    }
})();

module.exports = connection;
