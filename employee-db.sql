DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE department
(
  id INT NOT NULL
  AUTO_INCREMENT,
  dept_name VARCHAR
  (30) NOT NULL,
  PRIMARY KEY
  (id)
);

  CREATE TABLE role
  (
    id INT NOT NULL
    AUTO_INCREMENT,
  title VARCHAR
    (30) NOT NULL,
  salary DECIMAL
    (9,2) NOT NULL,
  department_id INT,
  PRIMARY KEY
    (id),
  FOREIGN KEY
    (department_id) 
  	REFERENCES department
    (id)
    ON
    UPDATE CASCADE ON DELETE SET NULL
    );

    CREATE TABLE employee
    (
      emp_id INT NOT NULL
      AUTO_INCREMENT,
  first_name VARCHAR
      (30) NOT NULL,
  last_name VARCHAR
      (30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY
      (emp_id),
  FOREIGN KEY
      (role_id) 
  	REFERENCES role
      (id)
    ON
      UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY
      (manager_id) 
  	REFERENCES employee
      (emp_id)
);
      INSERT INTO department
        (dept_name)
      VALUES
        ("CEO");
      INSERT INTO department
        (dept_name)
      VALUES
        ("Executive");
      INSERT INTO department
        (dept_name)
      VALUES
        ("Manager");
      INSERT INTO department
        (dept_name)
      VALUES
        ("Support");

      INSERT INTO role
        (title, salary, department_id)
      VALUES
        ("CEO", "3000000", "1");
      INSERT INTO role
        (title, salary, department_id)
      VALUES
        ("Executive", "250000", "2");
      INSERT INTO role
        (title, salary, department_id)
      VALUES
        ("Manager", "75000", "3");
      INSERT INTO role
        (title, salary, department_id)
      VALUES
        ("Support Specialist", "45000", "4");
      INSERT INTO role
        (title, salary, department_id)
      VALUES
        ("Support Opperations", "45000", "4");

      INSERT INTO role
        (title, salary, department_id)
      VALUES
        ("Receptionist", "35000", "5");

      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Megan', 'Pardy', '1', NULL);
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Bob', 'Dole', '2', '1');
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Diana', 'Spencer', '2', '1');
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Bart', 'Simpson', '3', '2');
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Kate', 'Winslet', '3', '2');
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('June', 'Clever', '4', '3');
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('George', 'Costanza', '4', '3');
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Gene', 'Wilder', '4', '3');
      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ('Mel', 'Brooks', '4', '3');

      SELECT *
      FROM department;
      SELECT *
      FROM role;
      SELECT *
      FROM employee;