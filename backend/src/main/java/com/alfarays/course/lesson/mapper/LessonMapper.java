package com.alfarays.course.lesson.mapper;

import com.alfarays.course.lesson.entity.Lesson;
import com.alfarays.course.lesson.model.LessonRequest;
import com.alfarays.course.lesson.model.LessonResponse;
import org.springframework.stereotype.Component;

public final class LessonMapper {

    private LessonMapper(){}

    public static Lesson toEntity(LessonRequest lessonRequest) {
        if (lessonRequest == null) return null;

        Lesson lesson = new Lesson();
        lesson.setTitle(lessonRequest.getTitle());
        lesson.setDescription(lessonRequest.getDescription());
        lesson.setContent(lessonRequest.getContent());
        lesson.setVideoUrl(lessonRequest.getVideoUrl());
        lesson.setDuration(lessonRequest.getDuration());
        lesson.setSequenceOrder(lessonRequest.getSequenceOrder());
        lesson.setIsPublished(
                lessonRequest.getIsPublished() != null ? lessonRequest.getIsPublished() : false
        );

        return lesson;
    }


    public static LessonResponse toResponse(Lesson lesson) {
        if (lesson == null) return null;
        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .content(lesson.getContent())
                .videoUrl(lesson.getVideoUrl())
                .duration(lesson.getDuration())
                .sequenceOrder(lesson.getSequenceOrder())
                .isPublished(lesson.getIsPublished())
                .courseId(lesson.getCourse() != null ? lesson.getCourse().getId() : null)
                .createdOn(lesson.getCreatedOn())
                .createdBy(lesson.getCreatedBy())
                .build();
    }

    public static void updateEntity(LessonRequest lessonRequest, Lesson lesson) {
        if (lessonRequest == null) return;
        lesson.setTitle(lessonRequest.getTitle());
        lesson.setDescription(lessonRequest.getDescription());
        lesson.setContent(lessonRequest.getContent());
        lesson.setVideoUrl(lessonRequest.getVideoUrl());
        lesson.setDuration(lessonRequest.getDuration());
        lesson.setSequenceOrder(lessonRequest.getSequenceOrder());
        lesson.setIsPublished(lessonRequest.getIsPublished());
    }
}
