package com.alfarays.course.lesson.service;

import com.alfarays.course.lesson.model.LessonRequest;
import com.alfarays.course.lesson.model.LessonResponse;

import java.util.List;

public interface ILessonService {
    List<LessonResponse> createLesson(Long courseId, List<LessonRequest> requests);
    LessonResponse getLessonById(Long id);
    List<LessonResponse> getLessonsByCourse(Long courseId);
    LessonResponse updateLesson(Long id, LessonRequest lessonRequest);
    LessonResponse publishLesson(Long id);
    void deleteLesson(Long id);
}
