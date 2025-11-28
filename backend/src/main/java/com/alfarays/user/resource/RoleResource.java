package com.alfarays.user.resource;

import com.alfarays.shared.ErrorResponse;
import com.alfarays.shared.GlobalResponse;
import com.alfarays.user.model.RoleResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/roles", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(
        name = "Roles",
        description = "REST endpoints for managing roles."
)
public class RoleResource {


    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Create a new role",
            description = "Allows creation of a role."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201",
                    description = "Role created successfully",
                    content = @Content(schema = @Schema(implementation = RoleResponse.class))),

            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload or malformed specifications JSON",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),

            @ApiResponse(responseCode = "500",
                    description = "Unexpected internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> create() {
        return null;
    }

}
