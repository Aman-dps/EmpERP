package org.r3dacted42.emperp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.dto.UserAccountRequest;
import org.r3dacted42.emperp.service.UserAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserAccountController {
    private final UserAccountService userAccountService;

    @GetMapping("/username-available")
    public ResponseEntity<Boolean> usernameExists(@RequestParam("username") String username) {
        return ResponseEntity.ok(!userAccountService.userAccountExists(username));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid UserAccountRequest request) {
        Object res = userAccountService.createUserAccount(request);
        if (res instanceof String) {
            return ResponseEntity.badRequest().body(res);
        }
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid UserAccountRequest request) {
        Object res = userAccountService.validateCredentials(request);
        if (res instanceof String) {
            return ResponseEntity.status(401).body(res);
        }
        return ResponseEntity.ok(res);
    }
}
