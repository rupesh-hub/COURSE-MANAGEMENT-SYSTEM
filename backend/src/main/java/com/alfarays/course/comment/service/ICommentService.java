package com.alfarays.course.comment.service;

import com.alfarays.course.comment.model.CommentRequest;
import com.alfarays.course.comment.model.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICommentService {
    CommentResponse createComment(Long courseId, Long userId, CommentRequest commentRequest);
    CommentResponse getCommentById(Long id);
    Page<CommentResponse> getCommentsByCourse(Long courseId, Pageable pageable);
    List<CommentResponse> getCommentsByAuthor(Long authorId);
    CommentResponse updateComment(Long id, CommentRequest commentRequest);
    void deleteComment(Long id);
}
