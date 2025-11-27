package org.r3dacted42.emperp.mapper;

import org.r3dacted42.emperp.dto.EmployeeSalaryRequest;
import org.r3dacted42.emperp.dto.EmployeeSalaryResponse;
import org.r3dacted42.emperp.entity.EmployeeSalary;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSalaryMapper {
    public EmployeeSalary toEntity(final EmployeeSalaryRequest request) {
        return EmployeeSalary.builder()
                .paymentDate(request.paymentDate())
                .amount(request.amount())
                .description(request.description())
                .build();
    }

    public EmployeeSalaryResponse toResponse(final EmployeeSalary entity) {
        return new EmployeeSalaryResponse(
                entity.getId(),
                entity.getEmployee().getEmployeeId(),
                entity.getPaymentDate(),
                entity.getAmount(),
                entity.getDescription());
    }
}
