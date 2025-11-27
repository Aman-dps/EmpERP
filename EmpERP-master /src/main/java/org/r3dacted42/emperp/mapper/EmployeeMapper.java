package org.r3dacted42.emperp.mapper;

import org.r3dacted42.emperp.dto.EmployeeRequest;
import org.r3dacted42.emperp.dto.EmployeeResponse;
import org.r3dacted42.emperp.entity.Employee;
import org.springframework.stereotype.Service;

@Service
public class EmployeeMapper {
    public Employee toEntity(final EmployeeRequest request) {
        return Employee.builder()
                .employeeId(request.employeeId())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .title(request.title())
                .build();
    }
    public EmployeeResponse toResponse(final Employee entity) {
        return new EmployeeResponse(
                entity.getId(),
                entity.getEmployeeId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail(),
                entity.getTitle(),
                entity.getDepartment().getDepartmentId(),
                entity.getDepartment().getName()
        );
    }
}
