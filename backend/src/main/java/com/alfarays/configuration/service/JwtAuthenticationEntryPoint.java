package com.alfarays.configuration.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        final PrintWriter writer = response.getWriter();
        final Map<String, Object> errors = new HashMap<>();
        errors.put("message", authException.getMessage());
        errors.put("timestamp", LocalDateTime.now().toString());
        errors.put("code", HttpServletResponse.SC_UNAUTHORIZED);
        errors.put("type", "authentication");

        final ObjectMapper objectMapper = new ObjectMapper();
        final String jsonErrors = objectMapper.writeValueAsString(errors);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        writer.println(jsonErrors);

    }
}