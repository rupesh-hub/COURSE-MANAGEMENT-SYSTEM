package com.alfarays.course.lesson.model;

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
        name = "LessonResponse",
        description = "Schema to hold lesson response information"
)
public class LessonResponse {

    @Schema(description = "Lesson id", example = "1")
    private Long id;

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

    @Schema(description = "Course id", example = "1")
    private Long courseId;

    @Schema(description = "Created on", example = "2024-01-01T10:00:00")
    private LocalDateTime createdOn;

    @Schema(description = "Created by", example = "admin")
    private String createdBy;
}
