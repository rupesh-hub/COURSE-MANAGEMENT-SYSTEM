package com.alfarays.course.model;

import com.alfarays.course.lesson.model.LessonResponse;
import com.alfarays.image.model.ImageResponse;
import com.alfarays.user.model.UserResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(
        name = "CourseResponse",
        description = "Schema to hold course response information"
)
public class CourseResponse {

    @Schema(description = "Course id", example = "1")
    private Long id;

    @Schema(description = "Course title", example = "Java Programming Basics")
    private String title;

    @Schema(description = "Course description", example = "Learn Java from scratch")
    private String description;

    @Schema(description = "Course category", example = "Programming")
    private String category;

    @Schema(description = "Course level", example = "Beginner")
    private String level;

    @Schema(description = "Course price", example = "29.99")
    private Double price;

    @Schema(description = "Total duration in minutes", example = "1200")
    private Integer totalDuration;

    @Schema(description = "Is course published", example = "false")
    private Boolean isPublished;

    @Schema(description = "Instructor", example = "{}")
    private UserResponse instructor;

    @Schema(description = "Created on", example = "2024-01-01T10:00:00")
    private LocalDateTime createdOn;

    @Schema(description = "Created by", example = "admin")
    private String createdBy;

    @Schema(description = "Modified on", example = "2024-01-01T10:00:00")
    private LocalDateTime modifiedOn;

    @Schema(description = "Modified by", example = "admin")
    private String modifiedBy;

    private ImageResponse thumbnail;

    private List<LessonResponse> lessons;
}
