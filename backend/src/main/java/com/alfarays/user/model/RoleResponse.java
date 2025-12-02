package com.alfarays.user.model;

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
        name = "RoleResponse",
        description = "Schema to hold role response information"
)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleResponse {

    @Schema(description = "Role id", example = "1")
    private Long id;

    @Schema(description = "Role name", example = "ADMIN")
    private String name;

    @Schema(description = "Role description", example = "Administrator role")
    private String description;

    @Schema(description = "Created on", example = "2024-01-01T10:00:00")
    private LocalDateTime createdOn;

    @Schema(description = "Created by", example = "admin")
    private String createdBy;

    @Schema(description = "Updated on", example = "2024-01-01T10:00:00")
    private LocalDateTime modifiedOn;

    @Schema(description = "Updated by", example = "admin")
    private String modifiedBy;
}
