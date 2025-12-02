package com.alfarays.configuration.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    private static final String SECRET_KEY = "pX8B3yXHkRkW1q9RwZ1gXw0O2yf6OeJx0QjUjXqJZyA=";

    public String extractUsername(final String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(final String token, final Function<Claims, T> claimResolver) {
        return claimResolver.apply(extractAllClaims(token));
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 300_000)) // 5 min
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY))) // NO ALGORITHM NEEDED
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 24))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY)))
                .compact();
    }

    public boolean isTokenValid(final String token, final UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public Object extractRoles(String token) {
        return extractAllClaims(token).get("roles");
    }

    public Object extractAuthorities(String token) {
        return extractAllClaims(token).get("authorities");
    }

    private boolean isTokenExpired(final String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(final String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(final String token) {

        return Jwts.parser()
                .verifyWith(
                        Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY))
                )
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}
