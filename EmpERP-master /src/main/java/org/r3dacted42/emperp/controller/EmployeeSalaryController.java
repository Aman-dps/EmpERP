package org.r3dacted42.emperp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.dto.EmployeeSalaryRequest;
import org.r3dacted42.emperp.dto.EmployeeSalaryResponse;
import org.r3dacted42.emperp.service.EmployeeSalaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/salaries")
@RequiredArgsConstructor
public class EmployeeSalaryController {
    private final EmployeeSalaryService employeeSalaryService;

    @GetMapping
    public ResponseEntity<List<EmployeeSalaryResponse>> getAllEmployeeSalaries(
            @RequestParam(value = "employee_id", required = false) String employee_id) {
        return ResponseEntity.ok(employeeSalaryService.getAllEmployeeSalaries(employee_id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeSalaryResponse> getEmployeeSalaryById(@PathVariable("id") Long id) {
        EmployeeSalaryResponse res = employeeSalaryService.getEmployeeSalary(id);
        if (res == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employeeSalaryService.getEmployeeSalary(id));
    }

    @PostMapping
    public ResponseEntity<Object> createEmployeeSalary(@RequestBody @Valid EmployeeSalaryRequest departmentRequest) {
        Object res = employeeSalaryService.createEmployeeSalary(departmentRequest);
        // employee not found
        if (res instanceof String)
            return ResponseEntity.badRequest().body(res);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(((EmployeeSalaryResponse) res).id())
                .toUri();
        return ResponseEntity.created(location).body(res);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EmployeeSalaryResponse> updateEmployeeSalary(
            @PathVariable("id") Long id,
            @RequestBody @Valid EmployeeSalaryRequest departmentRequest) {
        EmployeeSalaryResponse res = employeeSalaryService.updateEmployeeSalary(id, departmentRequest);
        if (res == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployeeSalary(@PathVariable("id") Long id) {
        String res = employeeSalaryService.deleteEmployeeSalary(id);
        if (res == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }
}
