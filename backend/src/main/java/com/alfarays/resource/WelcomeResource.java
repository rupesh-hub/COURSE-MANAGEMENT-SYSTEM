package com.alfarays.resource;

import com.alfarays.model.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class WelcomeResource {

    private final String message;

    {
        message = "Welcome to Spring Boot Application with CI/CD using GitHub Actions !";
    }

    @GetMapping("/message")
    public ResponseEntity<Map<String, String>> welcome() {

        return ResponseEntity.ok(
               Map.of("message",this.message)
        );
    }

}
