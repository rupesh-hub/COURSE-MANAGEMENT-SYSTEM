package com.alfarays.course.comment.model;

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
        name = "CommentResponse",
        description = "Schema to hold comment response information"
)
public class CommentResponse {

    @Schema(description = "Comment id", example = "1")
    private Long id;

    @Schema(description = "Comment content", example = "Great course!")
    private String content;

    @Schema(description = "Comment rating (1-5)", example = "5")
    private Integer rating;

    @Schema(description = "Course id", example = "1")
    private Long courseId;

    @Schema(description = "Author id", example = "1")
    private Long authorId;

    @Schema(description = "Author username", example = "johndoe")
    private String authorUsername;

    @Schema(description = "Created on", example = "2024-01-01T10:00:00")
    private LocalDateTime createdOn;

    @Schema(description = "Created by", example = "johndoe")
    private String createdBy;
}
