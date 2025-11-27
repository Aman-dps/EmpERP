package org.r3dacted42.emperp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UnauthorizedController {

    @GetMapping("/unauthorized")
    public ResponseEntity<Map<String, String>> unauthorized() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("error", "Unauthorized User", "message",
                        "You are not authorized to access this application."));
    }
}
