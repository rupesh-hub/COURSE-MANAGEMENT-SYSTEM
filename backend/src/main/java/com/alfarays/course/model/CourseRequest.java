package com.alfarays.course.model;

import com.alfarays.course.enums.CourseLevel;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(
        name = "CourseRequest",
        description = "Schema to hold course request information"
)
public class CourseRequest {

    @NotBlank(message = "Title cannot be blank")
    @Schema(description = "Course title", example = "Java Programming Basics")
    private String title;

    @Schema(description = "Course description", example = "Learn Java from scratch")
    private String description;

    @Schema(description = "Course category", example = "Programming")
    private String category;

    @Schema(description = "Course level", example = "Beginner")
    @Enumerated(EnumType.STRING)
    private CourseLevel level;

    @Schema(description = "Course price", example = "29.99")
    private Double price;

    @Schema(description = "Total duration in minutes", example = "1200")
    private Integer totalDuration;

    @Schema(description = "Is course published", example = "false")
    private Boolean isPublished;

    @Schema(description = "Course thumbnail", example = "url")
    private MultipartFile thumbnail;
}
