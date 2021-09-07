INSERT INTO department(dname)
VALUES("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles(title, salary, department_id)
VALUES("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Accountant", 125000, 3), ("Lawyer", 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 12), ('Alex', 'Smith', 2, 34), ('Laura', 'Jones', 3, 26), ('Larry', 'Law', 4, null);
