package org.r3dacted42.emperp.controller;

import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.service.UserAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserAccountService userAccountService;

    @PostMapping("/approve")
    public ResponseEntity<String> approveUser(@RequestParam("username") String username) {
        return ResponseEntity.ok(userAccountService.approveUser(username));
    }

    @GetMapping("/pending")
    public ResponseEntity<Object> getPendingUsers() {
        return ResponseEntity.ok(userAccountService.getPendingUsers());
    }
}
