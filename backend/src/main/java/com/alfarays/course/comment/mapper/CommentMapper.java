package com.alfarays.course.comment.mapper;

import com.alfarays.course.comment.entity.Comment;
import com.alfarays.course.comment.model.CommentRequest;
import com.alfarays.course.comment.model.CommentResponse;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public Comment toEntity(CommentRequest commentRequest) {
        if (commentRequest == null) {
            return null;
        }
        return Comment.builder()
                .content(commentRequest.getContent())
                .rating(commentRequest.getRating())
                .build();
    }

    public CommentResponse toResponse(Comment comment) {
        if (comment == null) {
            return null;
        }
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .rating(comment.getRating())
                .courseId(comment.getCourse() != null ? comment.getCourse().getId() : null)
                .authorId(comment.getAuthor() != null ? comment.getAuthor().getId() : null)
                .authorUsername(comment.getAuthor() != null ? comment.getAuthor().getUsername() : null)
                .createdOn(comment.getCreatedOn())
                .createdBy(comment.getCreatedBy())
                .build();
    }

    public void updateEntity(CommentRequest commentRequest, Comment comment) {
        if (commentRequest == null) {
            return;
        }
        comment.setContent(commentRequest.getContent());
        comment.setRating(commentRequest.getRating());
    }
}
