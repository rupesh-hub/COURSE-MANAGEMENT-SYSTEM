package com.alfarays.user.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationResponse {

    private String token;
    private String refresh_token;
    private String name;
    private String username;
    private String email;
    private Object roles;
    private Object authorities;
    private LocalDateTime initiate_at;
    private Date expire_at;

}