package org.r3dacted42.emperp.service;

import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.r3dacted42.emperp.dto.EmployeeRequest;
import org.r3dacted42.emperp.dto.EmployeeResponse;
import org.r3dacted42.emperp.entity.Department;
import org.r3dacted42.emperp.entity.Employee;
import org.r3dacted42.emperp.mapper.EmployeeMapper;
import org.r3dacted42.emperp.repository.DepartmentRepository;
import org.r3dacted42.emperp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final DepartmentRepository departmentRepository;

    @Value("${images.storage.path}/emp_photos/")
    public String imageStoragePath;

    public boolean checkIfEmployeeIdAvailable(String employeeId) {
        return !employeeRepository.existsByEmployeeId(employeeId);
    }

    public Object createEmployee(EmployeeRequest request) {
        if (employeeRepository.existsByEmployeeId(request.employeeId())) {
            return "employee id taken";
        }
        Department department = departmentRepository.findById(request.departmentId()).orElse(null);
        if (department == null) {
            return "department not found";
        }
        if (departmentRepository.getEmployeeCount(request.departmentId()) >= department.getCapacity()) {
            return "department capacity full";
        }
        Employee employee = employeeMapper.toEntity(request);
        employee.setDepartment(department);
        employee.setPhotographPath(null);
        return employeeMapper.toResponse(employeeRepository.save(employee));
    }

    public List<EmployeeResponse> getAllEmployees(Long department_id) {
        if (department_id != null) {
            if (!departmentRepository.existsById(department_id)) {
                return null;
            }
            return Objects.requireNonNull(departmentRepository.findById(department_id).orElse(null))
                    .getEmployees().stream().map(employeeMapper::toResponse).toList();
        }
        return employeeRepository.findAll().stream().map(employeeMapper::toResponse).toList();
    }

    public EmployeeResponse getEmployeeByEmployeeId(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId).map(employeeMapper::toResponse).orElse(null);
    }

    public Path getEmployeePhotoPath(String employeeId) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId).orElse(null);
        if (employee == null || employee.getPhotographPath() == null) return null;
        Path filePath = Paths.get(imageStoragePath, employee.getPhotographPath());
        if (!Files.exists(filePath)) return null;
        return filePath;
    }

    public Object updateEmployee(Long id, EmployeeRequest request) {
        if (!employeeRepository.existsById(id)) {
            return null;
        }
        Employee employee = employeeRepository.findById(id).orElse(null);
        if (employee != null && !Objects.equals(employee.getEmployeeId(), request.employeeId())
                && employeeRepository.existsByEmployeeId(request.employeeId())) {
            return "employee id taken";
        }
        Department department = departmentRepository.findById(request.departmentId()).orElse(null);
        if (department == null) {
            return "department not found";
        }
        if (!Objects.equals(Objects.requireNonNull(employee).getDepartment().getDepartmentId(), department.getDepartmentId())
                && department.getCapacity() <= departmentRepository.getEmployeeCount(request.departmentId())) {
            return "department capacity full";
        }
        Employee updatedEmployee = employeeMapper.toEntity(request);
        updatedEmployee.setId(id);
        updatedEmployee.setDepartment(department);
        updatedEmployee.setPhotographPath(Objects.requireNonNull(employee).getPhotographPath());
        return employeeMapper.toResponse(employeeRepository.save(updatedEmployee));
    }

    private String savePhotoToDisk(MultipartFile photo) throws IOException {
        String extension = Objects.requireNonNull(photo.getOriginalFilename())
                .substring(photo.getOriginalFilename().lastIndexOf("."));
        String fileName = UUID.randomUUID() + "_" + System.currentTimeMillis() + extension;
        Path filePath = Paths.get(imageStoragePath, fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, photo.getBytes());
        return fileName;
    }

    public Pair<String, Boolean> updateEmployeePhoto(Long id, MultipartFile photo) throws IOException {
        if (!employeeRepository.existsById(id)) {
            return new Pair<>("employee not found", false);
        }
        Employee employee = employeeRepository.findById(id).orElse(null);
        String currentFileName = Objects.requireNonNull(employee).getPhotographPath();
        if (currentFileName != null) {
            Path filePath = Paths.get(imageStoragePath, currentFileName);
            if (Files.exists(filePath)) Files.delete(filePath);
        }
        Pair<String, Boolean> res;
        System.out.println(photo);
        if (photo == null || photo.getOriginalFilename() == null) {
            employee.setPhotographPath(null);
            res = new Pair<>("photo deleted", true);
        } else {
            employee.setPhotographPath(savePhotoToDisk(photo));
            res = new Pair<>("photo updated", true);
        }
        employeeRepository.save(employee);
        return res;
    }

    public String deleteEmployee(long employeeId) throws IOException {
        if (!employeeRepository.existsById(employeeId)) {
            return null;
        }
        Employee employee = Objects.requireNonNull(employeeRepository.findById(employeeId).orElse(null));
        if (employee.getPhotographPath() != null) {
            Path filePath = Paths.get(imageStoragePath, employee.getPhotographPath());
            if (Files.exists(filePath)) Files.delete(filePath);
        }
        employeeRepository.deleteById(employeeId);
        return "employee deleted";
    }
}
