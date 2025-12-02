package com.alfarays.course.comment.resource;

import com.alfarays.course.comment.model.CommentRequest;
import com.alfarays.course.comment.model.CommentResponse;
import com.alfarays.course.comment.service.ICommentService;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/comments", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(
        name = "Comments",
        description = "REST endpoints for managing course comments and discussions."
)
public class CommentResource {

    private final ICommentService commentService;

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Create a new comment",
            description = "Creates a new comment on a course. User must be authenticated."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201",
                    description = "Comment created successfully",
                    content = @Content(schema = @Schema(implementation = CommentResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Course or user not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> createComment(
            @Parameter(description = "Course ID", required = true)
            @RequestParam Long courseId,
            @Parameter(description = "User ID (Comment Author)", required = true)
            @RequestParam Long userId,
            @Valid @RequestBody CommentRequest commentRequest) {
        log.info("Creating comment for course with id: {} by user: {}", courseId, userId);
        CommentResponse commentResponse = commentService.createComment(courseId, userId, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalResponse
                        .builder()
                        .code(HttpStatus.CREATED.value())
                        .message("Comment created successfully")
                        .data(commentResponse)
                        .build());
    }

    @GetMapping(value = "/{id}")
    @Operation(
            summary = "Get comment by ID",
            description = "Retrieves a comment by its unique identifier."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Comment retrieved successfully",
                    content = @Content(schema = @Schema(implementation = CommentResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Comment not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getCommentById(
            @Parameter(description = "Comment ID", required = true)
            @PathVariable Long id) {
        log.info("Fetching comment with id: {}", id);
        CommentResponse commentResponse = commentService.getCommentById(id);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Comment retrieved successfully")
                .data(commentResponse)
                .build());
    }

    @GetMapping(value = "/course/{courseId}")
    @Operation(
            summary = "Get all comments for a course",
            description = "Retrieves all comments for a specific course with pagination."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Comments retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Page.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getCommentsByCourse(
            @Parameter(description = "Course ID", required = true)
            @PathVariable Long courseId,
            @Parameter(description = "Pagination parameters")
            Pageable pageable) {
        log.info("Fetching comments for course with id: {}", courseId);
        Page<CommentResponse> comments = commentService.getCommentsByCourse(courseId, pageable);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Comments retrieved successfully")
                .data(comments)
                .build());
    }

    @GetMapping(value = "/author/{authorId}")
    @Operation(
            summary = "Get all comments by an author",
            description = "Retrieves all comments created by a specific user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Comments retrieved successfully",
                    content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> getCommentsByAuthor(
            @Parameter(description = "Author (User) ID", required = true)
            @PathVariable Long authorId) {
        log.info("Fetching comments by author with id: {}", authorId);
        List<CommentResponse> comments = commentService.getCommentsByAuthor(authorId);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Comments retrieved successfully")
                .data(comments)
                .build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Update a comment",
            description = "Updates an existing comment's text content."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200",
                    description = "Comment updated successfully",
                    content = @Content(schema = @Schema(implementation = CommentResponse.class))),
            @ApiResponse(responseCode = "400",
                    description = "Invalid request payload",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404",
                    description = "Comment not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<GlobalResponse<?>> updateComment(
            @Parameter(description = "Comment ID", required = true)
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest commentRequest) {
        log.info("Updating comment with id: {}", id);
        CommentResponse commentResponse = commentService.updateComment(id, commentRequest);
        return ResponseEntity.ok(GlobalResponse.builder()
                .code(HttpStatus.OK.value())
                .message("Comment updated successfully")
                .data(commentResponse)
                .build());
    }

    @DeleteMapping(value = "/{id}")
    @Operation(
            summary = "Delete a comment",
            description = "Deletes a comment from the system."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204",
                    description = "Comment deleted successfully"),
            @ApiResponse(responseCode = "404",
                    description = "Comment not found",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500",
                    description = "Internal server error",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<Void> deleteComment(
            @Parameter(description = "Comment ID", required = true)
            @PathVariable Long id) {
        log.info("Deleting comment with id: {}", id);
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
