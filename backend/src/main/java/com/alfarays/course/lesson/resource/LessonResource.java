package com.alfarays.course.lesson.resource;

import com.alfarays.course.lesson.model.LessonRequest;
import com.alfarays.course.lesson.model.LessonResponse;
import com.alfarays.course.lesson.service.ILessonService;
import com.alfarays.shared.ErrorResponse;
import com.alfarays.shared.GlobalResponse;
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
@RequestMapping(value = "/lessons", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(
        name = "Lessons",
        description = "REST endpoints for managing course lessons."
)
public class LessonResource {

    private final ILessonService lessonService;

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Create a new lesson",
            description = "Creates a new lesson for a specific course."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201",
                    description = "Lesson created successfully",
                    content = @Content(schema = @Schema(implementation = LessonResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Course not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> createLesson(
            @Parameter(description = "Course ID", required = true)
            @RequestParam Long courseId,
            @Valid @RequestBody List<LessonRequest> lessonRequest) {
        log.info("Creating lesson for course with id: {}", courseId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalResponse.builder()
                        .code(HttpStatus.CREATED.value())
                        .message("Lesson created successfully")
                        .data(lessonService.createLesson(courseId, lessonRequest))
                        .build());
    }

    @GetMapping(value = "/{id}")
    @Operation(
            summary = "Get lesson by ID",
            description = "Retrieves a lesson by its unique identifier."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Lesson retrieved successfully",
                    content = @Content(schema = @Schema(implementation = LessonResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Lesson not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getLessonById(
            @Parameter(description = "Lesson ID", required = true)
            @PathVariable Long id) {
        log.info("Fetching lesson with id: {}", id);
        LessonResponse lessonResponse = lessonService.getLessonById(id);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Lesson retrieved successfully")
                .data(lessonResponse)
                .build());
    }

    @GetMapping(value = "/course/{courseId}")
    @Operation(
            summary = "Get all lessons for a course",
            description = "Retrieves all lessons for a specific course ordered by sequence."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Lessons retrieved successfully",
                    content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getLessonsByCourse(
            @Parameter(description = "Course ID", required = true)
            @PathVariable Long courseId) {
        log.info("Fetching lessons for course with id: {}", courseId);
        List<LessonResponse> lessons = lessonService.getLessonsByCourse(courseId);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Lessons retrieved successfully")
                .data(lessons)
                .build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Update a lesson",
            description = "Updates an existing lesson's information."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Lesson updated successfully",
                    content = @Content(schema = @Schema(implementation = LessonResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Lesson not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> updateLesson(
            @Parameter(description = "Lesson ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody LessonRequest lessonRequest) {
        log.info("Updating lesson with id: {}", id);
        LessonResponse lessonResponse = lessonService.updateLesson(id, lessonRequest);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Lesson updated successfully")
                .data(lessonResponse)
                .build());
    }

    @PostMapping(value = "/{id}/publish")
    @Operation(
            summary = "Publish a lesson",
            description = "Publishes a lesson, making it visible to enrolled students."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Lesson published successfully",
                    content = @Content(schema = @Schema(implementation = LessonResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Lesson not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> publishLesson(
            @Parameter(description = "Lesson ID", required = true)
            @PathVariable Long id) {
        log.info("Publishing lesson with id: {}", id);
        LessonResponse lessonResponse = lessonService.publishLesson(id);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Lesson published successfully")
                .data(lessonResponse)
                .build());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(
            summary = "Delete a lesson",
            description = "Deletes a lesson from a course."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204",
                    description = "Lesson deleted successfully"),
            @ApiResponse(responseCode = "404",
                    description = "Lesson not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteLesson(
            @Parameter(description = "Lesson ID", required = true)
            @PathVariable Long id) {
        log.info("Deleting lesson with id: {}", id);
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }
}
