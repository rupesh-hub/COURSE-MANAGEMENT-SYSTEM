package com.alfarays.course.service;

import com.alfarays.course.model.CourseRequest;
import com.alfarays.course.model.CourseResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICourseService {
    CourseResponse createCourse(Long instructorId, CourseRequest courseRequest);
    CourseResponse getCourseById(Long id);
    Page<CourseResponse> getAllPublishedCourses(Pageable pageable);
    List<CourseResponse> getCoursesByInstructor(Long instructorId);
    Page<CourseResponse> searchCoursesByTitle(String title, Pageable pageable);
    Page<CourseResponse> getCoursesByCategory(String category, Pageable pageable);
    Page<CourseResponse> getCoursesByLevel(String level, Pageable pageable);
    CourseResponse updateCourse(Long id, CourseRequest courseRequest);
    CourseResponse publishCourse(Long id);
    void deleteCourse(Long id);
}
