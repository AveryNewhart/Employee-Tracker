// requiring
const inquirer = require('inquirer'); // requiring inquier
const mysql = require('mysql2'); // mysql2 download/install


require('console.table'); // installing console table, better format in console log. npm install console.table --save

// refering to the class files. functions in these files for when you add any of the three. 
const newDepartment = require('./newDepartment'); // new department class file
const newEmployee = require('./newEmployee'); // new employee class file
const newRole = require('./newRole'); // new role class file

// connecting to the database
const db = mysql.createConnection( // mysql is requiring mysql2 (line3). It is then creating a connection to the employer database in my schema.sql file.
    {
        host: 'localhost', // setting the host for me to host locally
        user: 'root', // my mysql username 
        password: '', // blank since no password
        database: 'employer_db' //the database created in schema.sql
    },
    console.log('You are officially conncted to the Employer Database.') // message that will log in terminal if successful.
);