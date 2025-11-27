package org.r3dacted42.emperp.service;

import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.dto.DepartmentRequest;
import org.r3dacted42.emperp.dto.DepartmentResponse;
import org.r3dacted42.emperp.entity.Department;
import org.r3dacted42.emperp.entity.Employee;
import org.r3dacted42.emperp.mapper.DepartmentMapper;
import org.r3dacted42.emperp.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;
    private final EmployeeService employeeService;

    public DepartmentResponse createDepartment(DepartmentRequest request) {
        Department department = departmentMapper.toEntity(request);
        return departmentMapper.toResponse(departmentRepository.save(department), 0L);
    }

    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll().stream().map((e) ->
            departmentMapper.toResponse(e, departmentRepository.getEmployeeCount(e.getDepartmentId()))
        ).toList();
    }

    public DepartmentResponse getDepartment(Long departmentId) {
        return departmentRepository.findById(departmentId).map((e) ->
                departmentMapper.toResponse(e, departmentRepository.getEmployeeCount(e.getDepartmentId()))
        ).orElse(null);
    }

    public DepartmentResponse updateDepartment(Long departmentId, DepartmentRequest request) {
        if (!departmentRepository.existsById(departmentId)) {
            return null;
        }
        Department updatedDepartment = departmentMapper.toEntity(request);
        updatedDepartment.setDepartmentId(departmentId);
        return departmentMapper.toResponse(departmentRepository.save(updatedDepartment),
                departmentRepository.getEmployeeCount(updatedDepartment.getDepartmentId()));
    }

    public String deleteDepartment(Long departmentId) throws IOException {
        if (!departmentRepository.existsById(departmentId)) {
            return null;
        }
        if (departmentRepository.getEmployeeCount(departmentId) > 0) {
            Department department = Objects.requireNonNull(departmentRepository.findById(departmentId).orElse(null));
            List<Long> empIds = department.getEmployees().stream().map(Employee::getId).toList();
            for (Long empId : empIds) {
                employeeService.deleteEmployee(empId);
            }
        }
        departmentRepository.deleteById(departmentId);
        return "department deleted";
    }
}
