package com.alfarays.user.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(
        name = "RoleRequest",
        description = "Schema to hold role request information"
)
public class RoleRequest {

    @NotBlank(message = "Role name cannot be blank")
    @Schema(description = "Role name", example = "ADMIN")
    private String name;

    @Schema(description = "Role description", example = "Administrator role")
    private String description;
}
