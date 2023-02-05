// new employee class
function Employee(lastName, firstName, role, manager) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.role = role;
    this.manager = manager;
}

module.exports = Employee