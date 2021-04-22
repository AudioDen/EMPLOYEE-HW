INSERT INTO department(dep_name)
VALUES ("Manager"),
  ("Sales"),
  ("Cashier"),
  ("Stock");

INSERT INTO role(title, salary, department_id)
VALUES ("Manager", "20000", "1"),
  ("SalesPerson", "19000", "2"),
  ("Accounting", "17000", "3"),
  ("Inventory", "16000", "4");

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Adrian", "Newy", "1"),
  ("Lewis", "Hamilton", "3", "1"),
  ("Micheal", "Schumi", "4", "1"),
  ("Jim", "Clark", "2", "1"),
  ("Alain", "Prost", "2", "1"),
  ("Jackie", "Stewart", "2", "1"),
  ("Dan", "Gurney", "2", "1"),
  ("Nelson", "Piquet", "2", "1"),
  ("Graham", "Hill", "4", "1"),
  ("Damon", "Hill", "4", "1"),
  ("Emerson", "Fittipaldi", "4", "1"),
  ("Christian", "Fittipaldi", "4", "1");