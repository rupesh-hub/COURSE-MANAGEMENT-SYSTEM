package com.alfarays.course.resource;

import com.alfarays.course.enums.CourseLevel;
import com.alfarays.course.model.CourseRequest;
import com.alfarays.course.model.CourseResponse;
import com.alfarays.course.service.ICourseService;
import com.alfarays.shared.ErrorResponse;
import com.alfarays.shared.GlobalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/courses", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(
        name = "Courses",
        description = "REST endpoints for managing courses."
)
public class CourseResource {

    private final ICourseService courseService;

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Create a new course",
            description = "Creates a new course. Must be authenticated as an instructor."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201",
                    description = "Course created successfully",
                    content = @Content(schema = @Schema(implementation = CourseResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Instructor not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> createCourse(
            @Parameter(description = "Instructor ID", required = true)
            @RequestParam Long instructorId,
            @Parameter(description = "Title", required = true)
            @RequestParam(value = "title", required = true) String title,
            @Parameter(description = "Description", required = true)
            @RequestParam(value = "description", required = true) String description,
            @Parameter(description = "Category", required = true)
            @RequestParam(value = "category", required = true) String category,
            @Parameter(description = "Level", required = true)
            @RequestParam(value = "level", required = true) CourseLevel level,
            @Parameter(description = "Price", required = true)
            @RequestParam(value = "price", required = true) Double price,
            @Parameter(description = "Total Duration", required = true)
            @RequestParam(value = "totalDuration", required = true) int totalDuration,
            @Parameter(description = "Is course published?", required = true)
            @RequestParam(value = "isPublished", required = false) boolean isPublished,
            @Parameter(description = "Thumbnail", required = true)
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail
    ) {

        CourseRequest request = CourseRequest.builder()
                .title(title)
                .description(description)
                .category(category)
                .level(level)
                .price(price)
                .totalDuration(totalDuration)
                .isPublished(isPublished)
                .thumbnail(thumbnail)
                .build();

        log.info("Creating course with title: {}", request.getTitle());
        CourseResponse courseResponse = courseService.createCourse(instructorId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalResponse.builder()
                        .code(HttpStatus.CREATED.value())
                        .message("Course created successfully")
                        .data(courseResponse)
                        .build());
    }

    @GetMapping(value = "/by.id/{id}")
    @Operation(
            summary = "Get course by ID",
            description = "Retrieves a course by its unique identifier."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Course retrieved successfully",
                    content = @Content(schema = @Schema(implementation = CourseResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Course not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getCourseById(
            @Parameter(description = "Course ID", required = true)
            @PathVariable Long id) {
        log.info("Fetching course with id: {}", id);
        CourseResponse courseResponse = courseService.getCourseById(id);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Course retrieved successfully")
                .data(courseResponse)
                .build());
    }

    @GetMapping(value = "/published/all")
    @Operation(
            summary = "Get all published courses",
            description = "Retrieves a paginated list of all published courses."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Published courses retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getAllPublishedCourses(
            @Parameter(description = "Pagination parameters")
            Pageable pageable) {
        log.info("Fetching all published courses");
        Page<CourseResponse> courses = courseService.getAllPublishedCourses(pageable);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Published courses retrieved successfully")
                .data(courses)
                .build());
    }

    @GetMapping(value = "/instructor/{instructorId}")
    @Operation(
            summary = "Get courses by instructor",
            description = "Retrieves all courses created by a specific instructor."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Courses retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getCoursesByInstructor(
            @Parameter(description = "Instructor ID", required = true)
            @PathVariable Long instructorId) {
        log.info("Fetching courses for instructor with id: {}", instructorId);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Courses retrieved successfully")
                .data(courseService.getCoursesByInstructor(instructorId))
                .build());
    }

    @GetMapping(value = "/search")
    @Operation(
            summary = "Search courses by title",
            description = "Searches for courses by their title with pagination."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Courses found successfully",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> searchCoursesByTitle(
            @Parameter(description = "Search title", required = true)
            @RequestParam String title,
            @Parameter(description = "Pagination parameters")
            Pageable pageable) {
        log.info("Searching courses by title: {}", title);
        Page<CourseResponse> courses = courseService.searchCoursesByTitle(title, pageable);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Courses found successfully")
                .data(courses)
                .build());
    }

    @GetMapping(value = "/category/{category}")
    @Operation(
            summary = "Get courses by category",
            description = "Retrieves courses filtered by category with pagination."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Courses retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getCoursesByCategory(
            @Parameter(description = "Category name", required = true)
            @PathVariable String category,
            @Parameter(description = "Pagination parameters")
            Pageable pageable) {
        log.info("Fetching courses by category: {}", category);
        Page<CourseResponse> courses = courseService.getCoursesByCategory(category, pageable);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Courses retrieved successfully")
                .data(courses)
                .build());
    }

    @GetMapping(value = "/level/{level}")
    @Operation(
            summary = "Get courses by level",
            description = "Retrieves courses filtered by difficulty level with pagination."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Courses retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getCoursesByLevel(
            @Parameter(description = "Difficulty level", required = true)
            @PathVariable String level,
            @Parameter(description = "Pagination parameters")
            Pageable pageable) {
        log.info("Fetching courses by level: {}", level);
        Page<CourseResponse> courses = courseService.getCoursesByLevel(level, pageable);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Courses retrieved successfully")
                .data(courses)
                .build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Update a course",
            description = "Updates an existing course's details."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Course updated successfully",
                    content = @Content(schema = @Schema(implementation = CourseResponse.class))),
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
    public ResponseEntity<GlobalResponse<?>> updateCourse(
            @Parameter(description = "Course ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest courseRequest) {
        log.info("Updating course with id: {}", id);
        CourseResponse courseResponse = courseService.updateCourse(id, courseRequest);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Course updated successfully")
                .data(courseResponse)
                .build());
    }

    @PostMapping(value = "/{id}/publish")
    @Operation(
            summary = "Publish a course",
            description = "Publishes a course, making it visible to all users."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Course published successfully",
                    content = @Content(schema = @Schema(implementation = CourseResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Course not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> publishCourse(
            @Parameter(description = "Course ID", required = true)
            @PathVariable Long id) {
        log.info("Publishing course with id: {}", id);
        CourseResponse courseResponse = courseService.publishCourse(id);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Course published successfully")
                .data(courseResponse)
                .build());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(
            summary = "Delete a course",
            description = "Deletes a course and all associated lessons and comments."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204",
                    description = "Course deleted successfully"),
            @ApiResponse(responseCode = "404",
                    description = "Course not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteCourse(
            @Parameter(description = "Course ID", required = true)
            @PathVariable Long id) {
        log.info("Deleting course with id: {}", id);
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
