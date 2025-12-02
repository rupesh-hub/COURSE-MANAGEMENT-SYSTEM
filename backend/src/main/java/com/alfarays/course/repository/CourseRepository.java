package com.alfarays.course.repository;

import com.alfarays.course.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Page<Course> findByIsPublishedTrue(Pageable pageable);
    List<Course> findByInstructorId(Long instructorId);
    Page<Course> findByCategory(String category, Pageable pageable);
    Page<Course> findByLevel(String level, Pageable pageable);
    Page<Course> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
