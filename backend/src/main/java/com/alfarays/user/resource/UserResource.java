package com.alfarays.user.resource;

import com.alfarays.shared.ErrorResponse;
import com.alfarays.shared.GlobalResponse;
import com.alfarays.user.model.AuthenticationRequest;
import com.alfarays.user.model.AuthenticationResponse;
import com.alfarays.user.model.UserRequest;
import com.alfarays.user.model.UserResponse;
import com.alfarays.user.service.AuthenticationService;
import com.alfarays.user.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(
        name = "Users",
        description = "REST endpoints for managing users and authentication."
)
public class UserResource {

    private final IUserService userService;
    private final AuthenticationService authService;

    @PostMapping(value="/authenticate",  consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Authentication to the system",
            description = "To authenticate user can use username and password."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "User authenticate successfully",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid credentials.",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<AuthenticationResponse> authentication(
            @Valid @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Register a new user",
            description = "Registers a new user in the system with email and password."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201",
                    description = "User registered successfully",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload or user already exists",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> registerUser(
            @Parameter(description = "Firstname", required = true)
            @RequestParam(value = "firstname", required = true) String firstname,
            @Parameter(description = "Lastname", required = true)
            @RequestParam String lastname,
            @Parameter(description = "Username", required = true)
            @RequestParam String username,
            @Parameter(description = "Email", required = true)
            @RequestParam String email,
            @Parameter(description = "Password", required = true)
            @RequestParam String password,
            @Parameter(description = "Confirm Password", required = true)
            @RequestParam String confirmPassword,
            @Parameter(description = "Phone number", required = true)
            @RequestParam String phone,
            @Parameter(description = "BIO", required = true)
            @RequestParam String bio,
            @Parameter(description = "Role", required = false)
            @RequestParam(name="role", required = false, defaultValue = "USER") String role,
            @Parameter(description = "Confirm Password")
            @RequestParam(required = false) MultipartFile profile
    ) {

        var request = UserRequest.builder()
                .firstname(firstname)
                .lastname(lastname)
                .username(username)
                .email(email)
                .password(password)
                .confirmPassword(confirmPassword)
                .phone(phone)
                .bio(bio)
                .profile(profile)
                .role(role)
                .build();

        log.info("Registering user with username: {}", request.getUsername());
        var user = userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalResponse.builder()
                        .code(HttpStatus.CREATED.value())
                        .message("User registered successfully")
                        .data(user)
                        .build());
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Login user",
            description = "Authenticates a user and returns authentication token."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "User logged in successfully",
                    content = @Content(schema = @Schema(implementation = GlobalResponse.class))),
            @ApiResponse(responseCode = "401",
                    description = "Invalid credentials",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> loginUser(@Valid @RequestBody UserRequest userRequest) {
        log.info("User login attempt for username: {}", userRequest.getUsername());
        userService.loginUser(userRequest.getUsername(), userRequest.getPassword());
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("User logged in successfully")
                .build());
    }

    @GetMapping(value = "/{id}")
    @Operation(
            summary = "Get user by ID",
            description = "Retrieves a user by their unique identifier."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "User retrieved successfully",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "User not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getUserById(
            @Parameter(description = "User ID", required = true)
            @PathVariable Long id) {
        log.info("Fetching user with id: {}", id);
        UserResponse userResponse = userService.getUserById(id);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("User retrieved successfully")
                .data(userResponse)
                .build());
    }

    @GetMapping(value = "/by.username/{username}")
    @Operation(
            summary = "Get user by username",
            description = "Retrieves a user by their username."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "User retrieved successfully",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "User not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getUserByUsername(
            @Parameter(description = "Username", required = true)
            @PathVariable String username) {
        log.info("Fetching user with username: {}", username);
        UserResponse userResponse = userService.getUserByUsername(username);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("User retrieved successfully")
                .data(userResponse)
                .build());
    }

    @GetMapping(value = "/by.email/{email}")
    @Operation(
            summary = "Get user by email",
            description = "Retrieves a user by their email address."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "User retrieved successfully",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "User not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getUserByEmail(
            @Parameter(description = "Email address", required = true)
            @PathVariable String email) {
        log.info("Fetching user with email: {}", email);
        UserResponse userResponse = userService.getUserByEmail(email);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("User retrieved successfully")
                .data(userResponse)
                .build());
    }

    @GetMapping(value = "/all")
    @Operation(
            summary = "Get all users",
            description = "Retrieves a paginated list of all users in the system."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Users retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getAllUsers(
            @Parameter(description = "Pagination parameters")
            Pageable pageable) {
        log.info("Fetching all users");
        Page<UserResponse> users = userService.getAllUsers(pageable);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Users retrieved successfully")
                .data(users)
                .build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Update a user",
            description = "Updates an existing user's information by their ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "User updated successfully",
                    content = @Content(schema = @Schema(implementation = UserResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "User not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> updateUser(
            @Parameter(description = "User ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody UserRequest userRequest) {
        log.info("Updating user with id: {}", id);
        UserResponse userResponse = userService.updateUser(id, userRequest);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("User updated successfully")
                .data(userResponse)
                .build());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(
            summary = "Delete a user",
            description = "Deletes a user by their ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204",
                    description = "User deleted successfully"),
            @ApiResponse(responseCode = "404",
                    description = "User not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "User ID", required = true)
            @PathVariable Long id) {
        log.info("Deleting user with id: {}", id);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
