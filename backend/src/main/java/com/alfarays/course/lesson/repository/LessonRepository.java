package com.alfarays.course.lesson.repository;

import com.alfarays.course.lesson.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByCourseIdOrderBySequenceOrder(Long courseId);
    long countByCourseId(Long courseId);
}
