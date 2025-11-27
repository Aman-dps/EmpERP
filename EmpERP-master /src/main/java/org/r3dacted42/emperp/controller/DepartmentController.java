package org.r3dacted42.emperp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.dto.DepartmentRequest;
import org.r3dacted42.emperp.dto.DepartmentResponse;

import org.r3dacted42.emperp.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<DepartmentResponse>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(@PathVariable("departmentId") Long departmentId) {
        DepartmentResponse res = departmentService.getDepartment(departmentId);
        if (res == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @PostMapping
    public ResponseEntity<DepartmentResponse> createDepartment(
            @RequestBody @Valid DepartmentRequest departmentRequest) {
        DepartmentResponse res = departmentService.createDepartment(departmentRequest);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(res.departmentId())
                .toUri();
        return ResponseEntity.created(location).body(res);
    }

    @PatchMapping("/{departmentId}")
    public ResponseEntity<DepartmentResponse> updateDepartment(
            @PathVariable("departmentId") Long departmentId,
            @RequestBody @Valid DepartmentRequest departmentRequest) {
        DepartmentResponse res = departmentService.updateDepartment(departmentId, departmentRequest);
        if (res == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{departmentId}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("departmentId") Long departmentId) throws IOException {
        String res = departmentService.deleteDepartment(departmentId);
        if (res == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }
}
