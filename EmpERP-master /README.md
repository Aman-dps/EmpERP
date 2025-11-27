# EmpERP Backend 
ESD "Micro Mini" Project

Frontend: [/tree/frontend](https://github.com/r3dacted42/EmpERP/tree/frontend)

# Endpoints
- User Account `/api/v1/auth` *[does not require token]*
    - `/username-available?username={username}` GET -> check whether given username is available
    - `/register` POST -> create new user account
    - `/login` POST -> login to existing account
- Employee `/api/v1/employees`
    - `?department_id={department_id}/` GET -> get all employees (optional param: in the specified department)
    - `/{employee_id}` GET -> get employee with given employee_id
    - `/{employee_id}/photo` GET -> get photo of given employee *[does not require token]*
    - `/id-available?id={employee_id}` GET -> check whether given employee_id is available
    - `/` POST -> create employee
    - `/{id}` PATCH -> update employee with given id
    - `/{id}/photo` PATCH -> update employee's photo
    - `/{id}` DELETE -> delete employee with given id
- Department `/api/v1/departments`
    - `/` GET -> get all departments
    - `/{department_id}` GET -> get department with given id
    - `/` POST -> create department
    - `/{department_id}` PATCH -> update department with given id
    - `/{department_id}` DELETE -> delete department with given id
- Employee Salary `/api/v1/salaries`
    - `?employee_id={employee_id}/` GET -> get all salaries (optional param: of given employee)
    - `/{id}` GET -> get salary with given id
    - `/` POST -> create salary
    - `/{id}` PATCH -> update salary with given id
    - `/{id}` DELETE -> delete salary with given id

# Instructions to run
- open terminal in current folder and make sure MySQL is running
- run `.\mvnw spring-boot:run` (windows) or `./mvnw spring-boot:run` (linux)
- [optional] run the ~~`create.sql`, `alter.sql`, and~~ `insert.sql` script
