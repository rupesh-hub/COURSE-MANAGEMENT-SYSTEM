package com.alfarays.user.resource;

import com.alfarays.shared.ErrorResponse;
import com.alfarays.shared.GlobalResponse;
import com.alfarays.user.model.RoleRequest;
import com.alfarays.user.model.RoleResponse;
import com.alfarays.user.service.IRoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/roles", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(
        name = "Roles",
        description = "REST endpoints for managing roles in the course management system."
)
public class RoleResource {

    private final IRoleService roleService;

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Create a new role",
            description = "Creates a new role in the system. Only administrators can create roles."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201",
                    description = "Role created successfully",
                    content = @Content(schema = @Schema(implementation = RoleResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> createRole(@Valid @RequestBody RoleRequest roleRequest) {
        log.info("Creating role with name: {}", roleRequest.getName());
        RoleResponse roleResponse = roleService.createRole(roleRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalResponse.builder()
                        .code(HttpStatus.CREATED.value())
                        .message("Role created successfully")
                        .data(roleResponse)
                        .build());
    }

    @GetMapping(value = "/{id}")
    @Operation(
            summary = "Get role by ID",
            description = "Retrieves a role by its unique identifier."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Role retrieved successfully",
                    content = @Content(schema = @Schema(implementation = RoleResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Role not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getRoleById(
            @Parameter(description = "Role ID", required = true)
            @PathVariable Long id) {
        log.info("Fetching role with id: {}", id);
        RoleResponse roleResponse = roleService.getRoleById(id);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Role retrieved successfully")
                .data(roleResponse)
                .build());
    }

    @GetMapping(value = "/by.name/{roleName}")
    @Operation(
            summary = "Get role by name",
            description = "Retrieves a role by its name."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Role retrieved successfully",
                    content = @Content(schema = @Schema(implementation = RoleResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Role not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getRoleByName(
            @Parameter(description = "Role name", required = true)
            @PathVariable String roleName) {
        log.info("Fetching role with name: {}", roleName);
        RoleResponse roleResponse = roleService.getRoleByName(roleName);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Role retrieved successfully")
                .data(roleResponse)
                .build());
    }

    @GetMapping(value = "/get.all")
    @Operation(
            summary = "Get all roles",
            description = "Retrieves a list of all roles in the system."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Roles retrieved successfully",
                    content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getAllRoles() {
        log.info("Fetching all roles");
        List<RoleResponse> roles = roleService.getAllRoles();
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Roles retrieved successfully")
                .data(roles)
                .build());
    }

    @PutMapping(value = "/by.id/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Update a role",
            description = "Updates an existing role by its ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Role updated successfully",
                    content = @Content(schema = @Schema(implementation = RoleResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Role not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> updateRole(
            @Parameter(description = "Role ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody RoleRequest roleRequest) {
        log.info("Updating role with id: {}", id);
        RoleResponse roleResponse = roleService.updateRole(id, roleRequest);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Role updated successfully")
                .data(roleResponse)
                .build());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(
            summary = "Delete a role",
            description = "Deletes a role by its ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204",
                    description = "Role deleted successfully"),
            @ApiResponse(responseCode = "404",
                    description = "Role not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteRole(
            @Parameter(description = "Role ID", required = true)
            @PathVariable Long id) {
        log.info("Deleting role with id: {}", id);
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
