package com.alfarays.course.service;

import com.alfarays.course.entity.Course;
import com.alfarays.course.mapper.CourseMapper;
import com.alfarays.course.model.CourseRequest;
import com.alfarays.course.model.CourseResponse;
import com.alfarays.course.repository.CourseRepository;
import com.alfarays.exception.ResourceNotFoundException;
import com.alfarays.image.entity.Image;
import com.alfarays.image.service.ImageService;
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
public class CourseService implements ICourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final ImageService imageService;

    @Override
    public CourseResponse createCourse(Long instructorId, CourseRequest courseRequest) {
        log.info("Creating course with title: {}", courseRequest.getTitle());

        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", instructorId.toString()));

        Course course = CourseMapper.toEntity(courseRequest);
        course.setInstructor(instructor);

        var thumbnail = courseRequest.getThumbnail();
        if(null != thumbnail){
            Image image = imageService.save(thumbnail);
            course.setThumbnail(image);
        }

        Course savedCourse = courseRepository.save(course);

        log.info("Course created successfully with id: {}", savedCourse.getId());
        return CourseMapper.toResponse(savedCourse);
    }

    @Override
    public CourseResponse getCourseById(Long id) {
        log.info("Fetching course with id: {}", id);
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id.toString()));
        return CourseMapper.toResponse(course);
    }

    @Override
    public Page<CourseResponse> getAllPublishedCourses(Pageable pageable) {
        log.info("Fetching all published courses");
        return courseRepository.findByIsPublishedTrue(pageable)
                .map(CourseMapper::toResponse);
    }

    @Override
    public List<CourseResponse> getCoursesByInstructor(Long instructorId) {
        log.info("Fetching courses for instructor with id: {}", instructorId);
        return courseRepository.findByInstructorId(instructorId)
                .stream()
                .map(CourseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CourseResponse> searchCoursesByTitle(String title, Pageable pageable) {
        log.info("Searching courses by title: {}", title);
        return courseRepository.findByTitleContainingIgnoreCase(title, pageable)
                .map(CourseMapper::toResponse);
    }

    @Override
    public Page<CourseResponse> getCoursesByCategory(String category, Pageable pageable) {
        log.info("Fetching courses by category: {}", category);
        return courseRepository.findByCategory(category, pageable)
                .map(CourseMapper::toResponse);
    }

    @Override
    public Page<CourseResponse> getCoursesByLevel(String level, Pageable pageable) {
        log.info("Fetching courses by level: {}", level);
        return courseRepository.findByLevel(level, pageable)
                .map(CourseMapper::toResponse);
    }

    @Override
    public CourseResponse updateCourse(Long id, CourseRequest courseRequest) {
        log.info("Updating course with id: {}", id);
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id.toString()));
        CourseMapper.updateEntity(courseRequest, course);
        Course updatedCourse = courseRepository.save(course);
        log.info("Course updated successfully");
        return CourseMapper.toResponse(updatedCourse);
    }

    @Override
    public CourseResponse publishCourse(Long id) {
        log.info("Publishing course with id: {}", id);
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id.toString()));
        course.setIsPublished(true);
        Course publishedCourse = courseRepository.save(course);
        log.info("Course published successfully");
        return CourseMapper.toResponse(publishedCourse);
    }

    @Override
    public void deleteCourse(Long id) {
        log.info("Deleting course with id: {}", id);
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id.toString()));
        courseRepository.delete(course);
        log.info("Course deleted successfully");
    }
}
