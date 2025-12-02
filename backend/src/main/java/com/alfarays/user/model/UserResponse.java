package com.alfarays.user.model;

import com.alfarays.image.model.ImageResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(
        name = "UserResponse",
        description = "Schema to hold user response information"
)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    @Schema(description = "User id", example = "1")
    private Long id;

    @Schema(description = "Username", example = "johndoe")
    private String username;

    @Schema(description = "User email", example = "john@example.com")
    private String email;

    @Schema(description = "User first name", example = "John")
    private String firstname;

    @Schema(description = "User last name", example = "Doe")
    private String lastname;

    @Schema(description = "User phone number", example = "+1234567890")
    private String phone;

    @Schema(description = "User bio", example = "I am a software developer")
    private String bio;

    @Schema(description = "Is user active", example = "true")
    private Boolean isActive;

    @Schema(description = "User role", example = "USER")
    private RoleResponse role;

    @Schema(description = "Created on", example = "2024-01-01T10:00:00")
    private LocalDateTime createdOn;

    @Schema(description = "Created by", example = "admin")
    private String createdBy;

    @Schema(description = "Updated on", example = "2024-01-01T10:00:00")
    private LocalDateTime modifiedOn;

    @Schema(description = "Updated by", example = "admin")
    private String modifiedBy;

    private ImageResponse profile;
}
