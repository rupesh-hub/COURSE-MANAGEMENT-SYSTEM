package com.alfarays.course.lesson.service;

import com.alfarays.course.entity.Course;
import com.alfarays.course.lesson.entity.Lesson;
import com.alfarays.course.lesson.mapper.LessonMapper;
import com.alfarays.course.lesson.model.LessonRequest;
import com.alfarays.course.lesson.model.LessonResponse;
import com.alfarays.course.lesson.repository.LessonRepository;
import com.alfarays.course.repository.CourseRepository;
import com.alfarays.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LessonService implements ILessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    @Override
    public List<LessonResponse> createLesson(Long courseId, List<LessonRequest> requests) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course", "id", courseId.toString()));

        List<Lesson> lessons = requests.stream()
                .map(LessonMapper::toEntity)
                .peek(lesson -> lesson.setCourse(course))
                .toList();

        List<Lesson> savedLessons = lessonRepository.saveAll(lessons);

        log.info("Lesson(s) created successfully. Total saved: {}", savedLessons.size());

        return savedLessons.stream()
                        .map(LessonMapper::toResponse)
                        .toList();
    }


    @Override
    public LessonResponse getLessonById(Long id) {
        log.info("Fetching lesson with id: {}", id);
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id.toString()));
        return LessonMapper.toResponse(lesson);
    }

    @Override
    public List<LessonResponse> getLessonsByCourse(Long courseId) {
        log.info("Fetching lessons for course with id: {}", courseId);
        return lessonRepository.findByCourseIdOrderBySequenceOrder(courseId)
                .stream()
                .map(LessonMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LessonResponse updateLesson(Long id, LessonRequest lessonRequest) {
        log.info("Updating lesson with id: {}", id);
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id.toString()));
        LessonMapper.updateEntity(lessonRequest, lesson);
        Lesson updatedLesson = lessonRepository.save(lesson);
        log.info("Lesson updated successfully");
        return LessonMapper.toResponse(updatedLesson);
    }

    @Override
    public LessonResponse publishLesson(Long id) {
        log.info("Publishing lesson with id: {}", id);
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id.toString()));
        lesson.setIsPublished(true);
        Lesson publishedLesson = lessonRepository.save(lesson);
        log.info("Lesson published successfully");
        return LessonMapper.toResponse(publishedLesson);
    }

    @Override
    public void deleteLesson(Long id) {
        log.info("Deleting lesson with id: {}", id);
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id.toString()));
        lessonRepository.delete(lesson);
        log.info("Lesson deleted successfully");
    }
}
