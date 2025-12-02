package com.alfarays.user.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(
        name = "UserRequest",
        description = "Schema to hold user request information"
)
public class UserRequest {

    @NotBlank(message = "Username cannot be blank")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Schema(description = "User username", example = "johndoe")
    private String username;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    @Schema(description = "User email", example = "john@example.com")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Schema(description = "User password", example = "password123")
    private String password;

    private String confirmPassword;

    @Schema(description = "User first name", example = "John")
    private String firstname;

    @Schema(description = "User last name", example = "Doe")
    private String lastname;

    @Schema(description = "User phone number", example = "+1234567890")
    private String phone;

    @Schema(description = "User bio", example = "I am a software developer")
    private String bio;

    @Schema(description = "Profile image", example = "https://url.something")
    private MultipartFile profile;

    @NotBlank(message = "Role name cannot be blank")
    @Schema(description = "Role name", example = "USER")
    private String role;
}
