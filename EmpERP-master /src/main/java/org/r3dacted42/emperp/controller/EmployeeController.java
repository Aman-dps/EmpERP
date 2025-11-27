package org.r3dacted42.emperp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;
import org.r3dacted42.emperp.dto.EmployeeRequest;
import org.r3dacted42.emperp.dto.EmployeeResponse;
import org.r3dacted42.emperp.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees(
            @RequestParam(value = "department_id", required = false) Long department_id
    ) {
        return ResponseEntity.ok(employeeService.getAllEmployees(department_id));
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable String employeeId) {
        EmployeeResponse res = employeeService.getEmployeeByEmployeeId(employeeId.trim());
        if (res == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/id-available")
    public ResponseEntity<Boolean> checkIfEmployeeIdAvailable(@RequestParam(value = "id") String employeeId) {
        return ResponseEntity.ok(employeeService.checkIfEmployeeIdAvailable(employeeId.trim()));
    }

    @GetMapping("/{employeeId}/photo")
    public ResponseEntity<byte[]> getEmployeePhoto(@PathVariable String employeeId) throws IOException {
        Path path = employeeService.getEmployeePhotoPath(employeeId.trim());
        if (path == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Files.readAllBytes(path));
    }

    @PostMapping
    public ResponseEntity<Object> createEmployee(@RequestBody @Valid EmployeeRequest employeeRequest) {
        Object res = employeeService.createEmployee(employeeRequest);
        // department not found or employee id already taken
        if (res instanceof String) return ResponseEntity.badRequest().body(res);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{employeeId}")
                .buildAndExpand(((EmployeeResponse) res).employeeId())
                .toUri();
        return ResponseEntity.created(location).body(res);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable Long id, @RequestBody @Valid EmployeeRequest employeeRequest) {
        Object res = employeeService.updateEmployee(id, employeeRequest);
        if (res == null) return ResponseEntity.notFound().build();
        // department not found or employee id already taken
        if (res instanceof String) return ResponseEntity.badRequest().body(res);
        return ResponseEntity.ok(res);
    }

    @PatchMapping("/{id}/photo")
    public ResponseEntity<String> updateEmployeePhoto(@PathVariable Long id, @RequestBody MultipartFile photo) throws IOException {
        Pair<String, Boolean> res = employeeService.updateEmployeePhoto(id, photo);
        if (!res.b) return ResponseEntity.badRequest().body(res.a);
        return ResponseEntity.ok(res.a);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) throws IOException {
        String res = employeeService.deleteEmployee(id);
        if (res == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }
}
