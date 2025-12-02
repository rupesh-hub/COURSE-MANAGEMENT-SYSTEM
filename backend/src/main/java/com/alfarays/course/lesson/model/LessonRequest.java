package com.alfarays.course.lesson.model;

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
        name = "LessonRequest",
        description = "Schema to hold lesson request information"
)
public class LessonRequest {

    @NotBlank(message = "Title cannot be blank")
    @Schema(description = "Lesson title", example = "Introduction to Java")
    private String title;

    @Schema(description = "Lesson description", example = "Learn Java basics")
    private String description;

    @Schema(description = "Lesson content", example = "Java is a programming language")
    private String content;

    @Schema(description = "Video URL", example = "https://youtube.com/watch?v=xxx")
    private String videoUrl;

    @Schema(description = "Duration in minutes", example = "60")
    private Integer duration;

    @Schema(description = "Sequence order", example = "1")
    private Integer sequenceOrder;

    @Schema(description = "Is lesson published", example = "false")
    private Boolean isPublished;
}
