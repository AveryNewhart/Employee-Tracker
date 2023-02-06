// requiring
const inquirer = require('inquirer'); // requiring inquier
const mysql = require('mysql2'); // mysql2 download/install


require('console.table'); // installing console table, better format in console log. npm install console.table --save

// refering to the class files. functions in these files for when you add any of the three. 
const NewDepartment = require('./newDepartment'); // new department class file
const NewEmployee = require('./newEmployee'); // new employee class file
const NewRole = require('./newRole'); // new role class file

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

const runApp = () => {
    return inquirer.prompt

    ([
        {
            type: 'list',
            name: 'choice',
            message: 'Please choose one of the following.',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'update an employee manager']
        }
    ])
    .then(function(data) {
        if(data.choice === 'view all departments') { // if user chooses this
            db.query('SELECT * FROM department', function(err, results) { // query the department table.
                if(err) {
                    console.log(err);
                    return runApp();
                    } else {
                        console.table(results);
                        return runApp(); //returns to beginning question.
                    }  
        })
        } else if(data.choice === 'view all roles') { // if user chooses this
            db.query('SELECT * FROM role', function(err, results) { // query the role table
                if(err) {
                    console.log(err);
                    return runApp();
                    } else {
                        console.table(results);
                        return runApp(); //returns to beginning question.
                    }
            })
        } else if(data.choice === 'view all employees') { // if user chooses this
            db.query('SELECT * FROM employee', function(err, results) { // query the employee table
                if(err) {
                    console.log(err);
                    return runApp();
                    } else {
                        console.table(results);
                        return runApp(); //returns to beginning question.
                    }
            })
        } else if(data.choice === 'add a department') { // if user chooses this
            addDepartmentQ(); // this is running the function to add a department name to the database
        } else if(data.choice === 'add a role') { // if user chooses this
            addRoleQ(); // this is running the function to add a name, salary, and department for a role and that role is sent to the database.
        } else if(data.choice === 'add an employee') { // if user chooses this
            addEmployeeQ(); // this is running the function to add an employees last name, first name, role, and their manager. Then the employee is sent to the database.
        } else if(data.choice === 'update an employee role') { // if user chooses this
            updateRoleQ(); // this is running the function to select an employee(id?) and you will be able to update their role and that is sent back to the database.
        } else if(data.choice === 'update an employee manager') {
            updateManId(); // this is running the function to update an employees manager
        }
    })
}

// function that is ran when user selects 'add a department'
const addDepartmentQ = () => {
    return inquirer.prompt

    ([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the NAME of the DEPARTMENT:',
            validate: (value) => {
                if(value) {
                    return true;
                } else {
                    console.log('input department name to continue.')
                }
            }
        }
    ])
    .then(function(department) {
        const newD = new NewDepartment (department.departmentName) // NewDepartment is what was referenced at the top of the file(referencing the class file)

        const name = newD.name //deconstructing / breaking down the object that was created to query.

        db.query('INSERT INTO department (name) VALUES(?)', name, (err, results) => { // saying insert into depsrtment table, and what row.
            if (err) { //error and returns to the first question
                console.log(err)
                return runApp();
            } else { // successful and returns to first question
                console.log('Department has been added.') 
                return runApp();
            }
        })
    })
}

// function that is ran when user slects 'add a role'
const addRoleQ = () => {
    return inquirer.prompt

    ([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter the NAME of the ROLE:',
            validate: (value) => {
                if(value) {
                    return true;
                } else {
                    console.log('input the name of the role to continue')
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the SALARY for the ROLE:',
            validate: (value) => {
                if(value) {
                    return true;
                } else {
                    console.log('input the salary to continue')
                }
            }
        }
    ])
    .then(function(roleData) { // selecting a department from the table to add the role data into
        // deconstructing previous data to use in promise/query
        let roleN = roleData.roleName
        let roleS = roleData.salary

        db.promise().query('SELECT id AS name FROM department') // getting the ids and names of deparemnts from the department table.
            .then(([row, fields]) => {
                return inquirer.prompt ({
                    type: 'list',
                    name: 'departmentRole',
                    message: 'Select which DEPARTMENT to add the ROLE too:',
                    choices: row.filter(r => !!r.name).map(r => r.name), // mapping to and displaying the names of the departments
                    validate: (value) => {
                        if(value) {
                            return true;
                        } else {
                            console.log('select a department to continue')
                        }
                    }
                })
            })
            .then(function(roleDep) {
                // deconstructing
                let depId = roleDep.departmentRole // departmentRole is the name from the previous prompt asking the user to select a department to add the role to.
                console.log(roleN) // roleN was set previously when deconstructing the data. referencing the name: 'roleName'.
                console.log(roleS) // roleS was set previously when deconstructing the data. referencing the name: 'salary'.
                console.log(depId) // depId was just deconstructed and it is referencing the selected department from the list in the prompt.
                // setting the reference to be used in the query.
                let val = [ 
                    [roleN, roleS, depId]
                ]
                // inserting the name of the role, the roles salary, and which department it is into the role table.
                db.query('INSERT INTO role (roleN, roleS, depId) VALUES (?)', val, (err, results) => {
                    if(err) { // if error, and error will display and you will be returned to the first question
                        console.log(err);
                        return runApp(); 
                    } else { // if successful, the following message will display and you will be returned to the first question
                        console.log('Role has been created and added!');
                        return runApp();
                    }
                })
            })
    })
}

// function that is ran when user selects 'add an employee'.
const addEmployeeQ = () => {
    return inquirer.prompt

    ([
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter your LAST name:',
            validate: (value) => {
                if(value) {
                    return true;
                } else {
                    console.log('Enter your LAST name to continue')
                }
            }
        },
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter you FIRST name:',
            validate: (value) => {
                if(value) {
                    return true;
                } else {
                    console.log('Enter your FIRST name to continue')
                }
            }
        },
    ])
    .then(function(empData) { // deconstructing data
        let lastN = empData.lastName // referencing name: 'lastName'.
        let firstN = empData.firstName // referencing name: 'firstName'.

        db.promise().query('SELECT roleId AS roleN FROM employee') // getting the id and names of the roles from the roles table.
        .then(([row, fields]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'whichRole',
                messgae: 'Select which ROLE to add the EMPLOYEE to:',
                choices: row.filter(a => !!a.roleN).map(a => a.roleN), // displaying the roles from the roles table.
                validate: (value) => {
                    if(value) {
                        return true;
                    } else {
                        console.log('Select a ROLE to continue.')
                    }
                }
            })
        })
        .then(function(empRoleData) {
            let roleId = empRoleData.whichRole

            db.promise().query('SELECT managerId FROM employee')
            .then(([row, fields]) => {
                return inquirer.prompt({
                    type: 'list',
                    name: 'theManager',
                    message: 'Select the MANAGER of the employee:',
                    choices: row.filter(m => !!m.managerId).map(m => m.managerId),
                    validate: (value) => {
                        if(value) {
                            return true;
                        } else {
                            console.log('Select a MANAGER to continue.')
                        }
                    }
                })
            })
            .then(function(empManData) {
                let managerId = empManData.theManager
                let empVal = [
                    [lastN, firstN, managerId, roleId]
                ]

                db.query('INSERT INTO employee (lastN, firstN, managerId, roleId) VALUES (?)', empVal, (err, results) => {
                    if(err) {
                        console.log(err);
                        return runApp();
                    } else {
                        console.log('Employee and all data has been logged succesfully!');
                        return runApp();
                    }
                })
            })
        })
    })
}

// update role function
const updateRoleQ = () => {
    db.promise().query('SELECT firstN FROM employee') //selecting first name from employee table
    .then(([rows, fields]) => {
        return inquirer.prompt({
            type: 'list',
            name: 'updateN',
            message: 'Select an emplployee to update:',
            choices: rows.filter(u => !!u.firstN ).map(u => u.firstN),
            validate: (value) => {
                if(value) {
                    return true;
                } else {
                    console.log('Select a employee to continue.')
                }
            }
        })
    })
        .then(function(empNewRole) {
            let nameToUpd = empNewRole.updateN

            db.promise().query('SELECT roleId FROM employee') // selecting the role id from the employee table
            .then(([rows, fields]) => {
                return inquirer.prompt({
                    type: 'list',
                    name: 'updateR',
                    message: 'Select the employees new role',
                    choices: rows.filter(z => !!z.roleId).map(z => z.roleId),
                    validate: (value) => {
                        if(value) {
                            return true;
                        } else {
                            console.log('Select a role to continue.')
                        }
                    }
                })
            })
            .then(function(updatedContent) {
                let newCont = updatedContent.updateR
                //have to have it formatted like this since two sperate spots being referenced
                let newVal = [
                    [newCont],
                    [nameToUpd]
                ] 

                db.query('UPDATE employee SET roleId = ? WHERE firstN = ?', newVal, (err, result) => {
                    if(err) {
                        console.log(err)
                        console.log(newVal)
                    } else {
                    console.log(result.affectedRows + " record(s) updated");
                    return runApp();
                    }
            })
        })
    })
}   

// BONUS

// Start of viewing employees by department
// ('SELECT firstN, depId FROM employee WHERE depId = slectedDepartmentToDisplay', valueNameThatWeConst, (err, result))

// Start of viewing employess by manager
// ('SELECT firstN, managerId FROM employee WHERE managerId = selectedManagerToDisplay', valueNameThatWeConst, (err, result))

// Start of updating an employees manager
// Look at how I updated an emplopyees role. Remember to look at the 'let newVal' to see how to have multiple arrays in one array.
// ('UPDATE employee SET managerId = ? WHERE firstN = ?', valueNameThatWeConst, (err, result))
const updateManId = () => {
    db.promise().query('SELECT firstN FROM employee') //selecting first name from employee table
    .then(([rows, fields]) => {
        return inquirer.prompt({
            type: 'list',
            name: 'updEmp',
            message: 'Select an emplployee to update:',
            choices: rows.filter(p => !!p.firstN ).map(p => p.firstN),
            validate: (value) => {
                if(value) {
                    return true;
                } else {
                    console.log('Select a employee to continue.')
                }
            }
        })
    })
        .then(function(empNewMan) {
            let empToUpd = empNewMan.updEmp

            db.promise().query('SELECT managerId FROM employee') // selecting the role id from the employee table
            .then(([rows, fields]) => {
                return inquirer.prompt({
                    type: 'list',
                    name: 'updateM',
                    message: 'Select the employees new manager',
                    choices: rows.filter(y => !!y.managerId).map(y => y.managerId),
                    validate: (value) => {
                        if(value) {
                            return true;
                        } else {
                            console.log('Select a manager to continue.')
                        }
                    }
                })
            })
            .then(function(updatedManager) {
                let updMan = updatedManager.updateM
                //have to have it formatted like this since two sperate spots being referenced
                let newEmpM = [
                    [updMan],
                    [empToUpd]
                ] 

                db.query('UPDATE employee SET managerId = ? WHERE firstN = ?', newEmpM, (err, result) => {
                    if(err) {
                        console.log(err)
                    } else {
                    console.log(result.affectedRows + " record(s) updated");
                    console.log(newEmpM)
                    return runApp();
                    }
            })
        })
    })
}   

runApp(); // running app

module.exports = db // exporting 
