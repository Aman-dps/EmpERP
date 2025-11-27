package org.r3dacted42.emperp.repository;

import org.r3dacted42.emperp.entity.EmployeeSalary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeSalaryRepository extends JpaRepository<EmployeeSalary, Long> {
    List<EmployeeSalary> findByEmployee_EmployeeIdOrderByPaymentDateDesc(String employeeId);
}
