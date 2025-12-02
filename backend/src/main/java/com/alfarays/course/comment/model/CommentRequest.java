package com.alfarays.course.comment.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
        name = "CommentRequest",
        description = "Schema to hold comment request information"
)
public class CommentRequest {

    @NotBlank(message = "Content cannot be blank")
    @Schema(description = "Comment content", example = "Great course!")
    private String content;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot exceed 5")
    @Schema(description = "Comment rating (1-5)", example = "5")
    private Integer rating;
}
