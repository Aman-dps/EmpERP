package org.r3dacted42.emperp.repository;

import org.r3dacted42.emperp.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    @Query("SELECT COUNT(e) FROM Department d, Employee e WHERE d.departmentId = e.department.departmentId AND d.departmentId = :id")
    Long getEmployeeCount(@Param("id") Long departmentId);
}
