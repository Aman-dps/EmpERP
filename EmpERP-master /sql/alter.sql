-- add primary key to department
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

-- add primary key, unique keys and key to employee
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_unique_email` (`email`),
  ADD UNIQUE KEY `employee_unique_employee_id` (`employee_id`),
  ADD KEY `employee_key_department_id` (`department_id`);

-- add primary key, key to employee_salary
ALTER TABLE `employee_salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_salary_key_employee_id` (`employee_id`);

-- add primary key, unique key to user_account
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_account_unique_username` (`username`);

-- add foreign key for employee -> department
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_foreign_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`);

-- add foreign key for employee_salary -> employee
ALTER TABLE `employee_salary`
  ADD CONSTRAINT `employee_salary_foreign_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);
COMMIT;
