-- this will have data stored for the tables to show.
INSERT INTO department (name)
VALUES
("Technical Support"),
("Customer Support"),
("Floor Team"),
("Human Resources"),
("Maintenence Team");

INSERT INTO role (roleN, salary, depId)
VALUES
("Technical Support Emplopyee", 88000, 1),
("Customer Support Employee", 77000, 2),
("Floor Team Employee", 82000, 3),
("Human Resources Employee", 68000, 4),
("Maintenence Team Employee", 65000, 5);

INSERT INTO employee (lastN, firstN, roleId, managerId)
VALUES
("Newhart", "Avery", 1, 5),
("Davis", "Alex", 2, 5),
("Man", "Fred", 3, 5),
("Boy", "Leo", 4, 5),
("Girl", "Rella", 5, NULL); -- NULL because they can't be their own manager