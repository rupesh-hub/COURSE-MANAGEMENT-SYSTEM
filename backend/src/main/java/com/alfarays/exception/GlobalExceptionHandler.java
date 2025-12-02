package com.alfarays.exception;

import com.alfarays.shared.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request
    ) {
        Map<String, String> errors = new HashMap<>();
        List<ObjectError> list = ex.getBindingResult().getAllErrors();
        list.forEach((error) -> {
            String field = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(field, message);
        });

        log.warn("Validation error: {}", errors);

        return new ResponseEntity<Object>(
                ErrorResponse
                        .builder()
                        .path(request.getDescription(false))
                        .message("Validation failed")
                        .code(HttpStatus.BAD_REQUEST)
                        .timestamp(LocalDateTime.now())
                        .errors(errors)
                        .build(),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException exception,
            WebRequest request) {
        log.error("Resource not found: {}", exception.getMessage());

        return new ResponseEntity<>(
                ErrorResponse
                        .builder()
                        .path(request.getDescription(false))
                        .message(exception.getMessage())
                        .code(HttpStatus.NOT_FOUND)
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CourseAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleCourseAlreadyExistsException(
            CourseAlreadyExistsException ex,
            WebRequest request
    ) {
        log.warn("Course already exists: {}", ex.getMessage());

        return new ResponseEntity<>(
                ErrorResponse
                        .builder()
                        .path(request.getDescription(false))
                        .message(ex.getMessage())
                        .code(HttpStatus.CONFLICT)
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.CONFLICT);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException exception,
            WebRequest request) {
        log.error("Illegal argument: {}", exception.getMessage());

        return new ResponseEntity<>(
                ErrorResponse
                        .builder()
                        .path(request.getDescription(false))
                        .message("Invalid argument: " + exception.getMessage())
                        .code(HttpStatus.BAD_REQUEST)
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(
            RuntimeException exception,
            WebRequest request) {
        log.error("Runtime exception occurred", exception);

        return new ResponseEntity<>(
                ErrorResponse
                        .builder()
                        .path(request.getDescription(false))
                        .message(exception.getMessage())
                        .code(HttpStatus.INTERNAL_SERVER_ERROR)
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception exception,
            WebRequest request) {
        log.error("Unexpected error occurred", exception);

        return new ResponseEntity<>(
                ErrorResponse
                        .builder()
                        .path(request.getDescription(false))
                        .message("An unexpected error occurred: " + exception.getLocalizedMessage())
                        .code(HttpStatus.INTERNAL_SERVER_ERROR)
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
