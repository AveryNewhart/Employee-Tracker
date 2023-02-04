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

// look back to how i started a node appilcation, use team gen for ref.
// a lot of code i can maybe use will be in the team gen too.
// const ?? = () => {
    //return inquier.prompt
// }

const runApp = () => {
    return inquirer.prompt

    ([
        {
            type: 'list',
            name: 'choice',
            message: 'Please choose one of the following.',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ])
    .then(function(data) {
        if(data.choice === 'view all departments') { // if user chooses this
            db.query('SELECT * FROM department', function(err, results) { // query the department table.
                console.table(results);
                return runApp(); //returns to beginning question.
            })
        } else if(data.choice === 'view all roles') { // if user chooses this
            db.query('SELECT * FROM role', function(err, results) { // query the role table
                console.table(results);
                return runApp(); // returns to beginning question
            })
        } else if(data.choice === 'view all employees') { // if user chooses this
            db.query('SELECT * FROM employee', function(err, results) { // query the employee table
                console.table(results);
                return runApp(); // returns to beggining question
            })
        } else if(data.choice === 'add a department') { // if user chooses this
            addDepartmentQ(); // this is running the function to add a department name to the database
        } else if(data.choice === 'add a role') { // if user chooses this
            addRoleQ(); // this is running the function to add a name, salary, and department for a role and that role is sent to the database.
        } else if(data.choice === 'add an employee') { // if user chooses this
            addEmployeeQ(); // this is running the function to add an employees last name, first name, role, and their manager. Then the employee is sent to the database.
        } else if(data.choice === 'update an employee role') { // if user chooses this
            updateRoleQ(); // this is running the function to select an employee(id?) and you will be able to update their role and that is sent back to the database.
        }
    })
}

const addDepartmentQ = () => {
    return inquirer.prompt
}



// db.query, look at notes from 12.11!!!! 

// https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html
// Aggregate Function Descriptions if needed !!!!!!
