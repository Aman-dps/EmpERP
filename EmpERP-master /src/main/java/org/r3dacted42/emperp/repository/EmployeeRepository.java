package org.r3dacted42.emperp.repository;

import org.r3dacted42.emperp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByEmployeeId(@Param("id") String id);
    Optional<Employee> findByEmployeeId(@Param("id") String id);
}
