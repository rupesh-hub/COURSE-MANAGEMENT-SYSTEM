package com.alfarays.user.service;

import com.alfarays.configuration.service.JwtUtil;
import com.alfarays.user.entity.User;
import com.alfarays.user.model.AuthenticationRequest;
import com.alfarays.user.model.AuthenticationResponse;
import com.alfarays.user.repository.UserRepository;
import com.alfarays.util.Utility;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(final AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("no user present."));

        final String token = token(user);
        final String refreshToken = refreshToken(user);

        return AuthenticationResponse
                .builder()
                .token(token)
                .refresh_token(refreshToken)
                .name(String.format("%s %s", Utility.capitalize(user.getFirstname()), Utility.capitalize(user.getLastname())))
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(jwtUtil.extractRoles(token(user)))
                .authorities(jwtUtil.extractAuthorities(token(user)))
                .initiate_at(LocalDateTime.now())
                .expire_at(jwtUtil.extractExpiration(token))
                .build();
    }

    private String token(final User user) {

        return jwtUtil.generateToken(new HashMap() {{
            put("username", user.getUsername());
            put("roles", user
                    .getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet()));
            put("enabled", user.isEnabled());
        }}, user);
    }

    private String refreshToken(final User user) {
        return jwtUtil.generateRefreshToken(user);
    }

}