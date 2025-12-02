package com.alfarays.course.comment.service;

import com.alfarays.course.comment.entity.Comment;
import com.alfarays.course.comment.mapper.CommentMapper;
import com.alfarays.course.comment.model.CommentRequest;
import com.alfarays.course.comment.model.CommentResponse;
import com.alfarays.course.comment.repository.CommentRepository;
import com.alfarays.course.entity.Course;
import com.alfarays.course.repository.CourseRepository;
import com.alfarays.exception.ResourceNotFoundException;
import com.alfarays.user.entity.User;
import com.alfarays.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    @Override
    public CommentResponse createComment(Long courseId, Long userId, CommentRequest commentRequest) {
        log.info("Creating comment for course with id: {}", courseId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId.toString()));

        User author = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId.toString()));

        Comment comment = commentMapper.toEntity(commentRequest);
        comment.setCourse(course);
        comment.setAuthor(author);
        Comment savedComment = commentRepository.save(comment);

        log.info("Comment created successfully with id: {}", savedComment.getId());
        return commentMapper.toResponse(savedComment);
    }

    @Override
    public CommentResponse getCommentById(Long id) {
        log.info("Fetching comment with id: {}", id);
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", id.toString()));
        return commentMapper.toResponse(comment);
    }

    @Override
    public Page<CommentResponse> getCommentsByCourse(Long courseId, Pageable pageable) {
        log.info("Fetching comments for course with id: {}", courseId);
        return commentRepository.findByCourseId(courseId, pageable)
                .map(commentMapper::toResponse);
    }

    @Override
    public List<CommentResponse> getCommentsByAuthor(Long authorId) {
        log.info("Fetching comments by author with id: {}", authorId);
        return commentRepository.findByAuthorId(authorId)
                .stream()
                .map(commentMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CommentResponse updateComment(Long id, CommentRequest commentRequest) {
        log.info("Updating comment with id: {}", id);
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", id.toString()));
        commentMapper.updateEntity(commentRequest, comment);
        Comment updatedComment = commentRepository.save(comment);
        log.info("Comment updated successfully");
        return commentMapper.toResponse(updatedComment);
    }

    @Override
    public void deleteComment(Long id) {
        log.info("Deleting comment with id: {}", id);
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", id.toString()));
        commentRepository.delete(comment);
        log.info("Comment deleted successfully");
    }
}
