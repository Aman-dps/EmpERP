package org.r3dacted42.emperp.service;

import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.dto.EmployeeSalaryRequest;
import org.r3dacted42.emperp.dto.EmployeeSalaryResponse;
import org.r3dacted42.emperp.entity.Employee;
import org.r3dacted42.emperp.entity.EmployeeSalary;
import org.r3dacted42.emperp.mapper.EmployeeSalaryMapper;
import org.r3dacted42.emperp.repository.EmployeeRepository;
import org.r3dacted42.emperp.repository.EmployeeSalaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeSalaryService {
    private final EmployeeSalaryRepository employeeSalaryRepository;
    private final EmployeeSalaryMapper employeeSalaryMapper;
    private final EmployeeRepository employeeRepository;

    public Object createEmployeeSalary(EmployeeSalaryRequest request) {
        EmployeeSalary employeeSalary = employeeSalaryMapper.toEntity(request);
        Employee employee = employeeRepository.findByEmployeeId(request.employeeId()).orElse(null);
        if (employee == null) {
            return "employee not found";
        }
        employeeSalary.setEmployee(employee);
        return employeeSalaryMapper.toResponse(employeeSalaryRepository.save(employeeSalary));
    }

    public List<EmployeeSalaryResponse> getAllEmployeeSalaries(String employee_id) {
        if (employee_id != null) {
            if (!employeeRepository.existsByEmployeeId(employee_id)) {
                return null;
            }
            return employeeSalaryRepository.findByEmployee_EmployeeIdOrderByPaymentDateDesc(employee_id).stream()
                    .map(employeeSalaryMapper::toResponse).toList();
        }
        return employeeSalaryRepository.findAll().stream().map(employeeSalaryMapper::toResponse).toList();
    }

    public EmployeeSalaryResponse getEmployeeSalary(Long id) {
        return employeeSalaryRepository.findById(id).map(employeeSalaryMapper::toResponse).orElse(null);
    }

    public EmployeeSalaryResponse updateEmployeeSalary(Long id, EmployeeSalaryRequest request) {
        if (!employeeSalaryRepository.existsById(id)) {
            return null;
        }
        EmployeeSalary updatedSalary = employeeSalaryMapper.toEntity(request);
        updatedSalary.setId(id);
        return employeeSalaryMapper.toResponse(employeeSalaryRepository.save(updatedSalary));
    }

    public String deleteEmployeeSalary(Long id) {
        if (!employeeSalaryRepository.existsById(id)) {
            return null;
        }
        employeeSalaryRepository.deleteById(id);
        return "employee salary deleted";
    }
}
