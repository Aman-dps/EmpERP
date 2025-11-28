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

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;
    private final org.r3dacted42.emperp.repository.EmployeeRepository employeeRepository;

    public DepartmentResponse createDepartment(DepartmentRequest request) {
        Department department = departmentMapper.toEntity(request);
        department.setDepartmentId(generateNextDepartmentId());
        return departmentMapper.toResponse(departmentRepository.save(department), 0L);
    }

    private Long generateNextDepartmentId() {
        List<Long> ids = departmentRepository.findAllDepartmentIds();
        long nextId = 1;
        for (Long id : ids) {
            if (id == nextId) {
                nextId++;
            } else if (id > nextId) {
                return nextId;
            }
        }
        return nextId;
    }

    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map((e) -> departmentMapper.toResponse(e, departmentRepository.getEmployeeCount(e.getDepartmentId())))
                .toList();
    }

    public DepartmentResponse getDepartment(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .map((e) -> departmentMapper.toResponse(e, departmentRepository.getEmployeeCount(e.getDepartmentId())))
                .orElse(null);
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

    @org.springframework.transaction.annotation.Transactional
    public String deleteDepartment(Long departmentId) throws IOException {
        if (!departmentRepository.existsById(departmentId)) {
            return null;
        }

        Department departmentToDelete = departmentRepository.findById(departmentId).orElseThrow();

        if (departmentRepository.getEmployeeCount(departmentId) > 0) {
            // Find or create "Not Assigned" department
            Department notAssignedDept = departmentRepository.findByName("Not Assigned")
                    .orElseGet(() -> {
                        Department newDept = Department.builder()
                                .name("Not Assigned")
                                .capacity(999999L)
                                .build();
                        newDept.setDepartmentId(generateNextDepartmentId());
                        return departmentRepository.save(newDept);
                    });

            // Reassign employees
            List<Employee> employees = departmentToDelete.getEmployees();
            for (Employee employee : employees) {
                employee.setDepartment(notAssignedDept);
                employeeRepository.save(employee);
            }
        }

        departmentRepository.deleteById(departmentId);
        return "department deleted";
    }
}
