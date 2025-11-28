-- insert data into department
INSERT INTO `department` (`department_id`, `name`, `capacity`)
VALUES
    (1, 'Computer Science and Engineering', 100),
    (2, 'Information Technology', 80),
    (3, 'Electronics and Communication Engineering', 60);

INSERT INTO `department_seq` (`next_val`) VALUES (4);

-- insert data into employee
INSERT INTO `employee` (`id`, `email`, `employee_id`, `first_name`, `last_name`, `photograph_path`, `title`, `department_id`)
VALUES
    (1, 'john.doe1@example.com', 'EMP101', 'John', 'Doe', '1.jpeg', 'Software Engineer', 1),
    (2, 'jane.smith1@example.com', 'EMP102', 'Jane', 'Smith', '2.jpeg', 'Project Manager', 1),
    (3, 'michael.johnson1@example.com', 'EMP103', 'Michael', 'Johnson', '3.jpeg', 'Data Scientist', 1);

INSERT INTO `employee_seq` (`next_val`) VALUES (4);

-- insert data into employee_salary
INSERT INTO `employee_salary` (`id`, `amount`, `description`, `payment_date`, `employee_id`)
VALUES
    (1, 50000, 'Monthly Salary', '2023-11-28', 1),
    (2, 10000, 'Bonus', '2023-12-25', 1),
    (3, 500, 'Reimbursement', '2023-11-15', 1),
    (4, 60000, 'Monthly Salary', '2023-11-28', 2),
    (5, 12000, 'Bonus', '2023-12-25', 2),
    (6, 600, 'Reimbursement', '2023-11-15', 2),
    (7, 70000, 'Monthly Salary', '2023-11-28', 3),
    (8, 14000, 'Bonus', '2023-12-25', 3),
    (9, 700, 'Reimbursement', '2023-11-15', 3);

INSERT INTO `employee_salary_seq` (`next_val`) VALUES (10);
