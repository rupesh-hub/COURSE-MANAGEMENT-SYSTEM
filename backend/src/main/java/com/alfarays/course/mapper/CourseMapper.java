package com.alfarays.course.mapper;

import com.alfarays.course.entity.Course;
import com.alfarays.course.lesson.mapper.LessonMapper;
import com.alfarays.course.model.CourseRequest;
import com.alfarays.course.model.CourseResponse;
import com.alfarays.image.mapper.ImageMapper;
import com.alfarays.user.mapper.UserMapper;

public final class CourseMapper {

    private CourseMapper() {
    }

    public static Course toEntity(CourseRequest courseRequest) {
        if (courseRequest == null) return null;

        Course course = new Course();

        course.setTitle(courseRequest.getTitle());
        course.setDescription(courseRequest.getDescription());
        course.setCategory(courseRequest.getCategory());
        course.setLevel(courseRequest.getLevel());
        course.setPrice(courseRequest.getPrice());
        course.setTotalDuration(courseRequest.getTotalDuration());
        course.setIsPublished(
                courseRequest.getIsPublished() != null ? courseRequest.getIsPublished() : false
        );

        return course;
    }


    public static CourseResponse toResponse(Course course) {
        if (course == null) {
            return null;
        }
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .category(course.getCategory())
                .level(course.getLevel().name())
                .price(course.getPrice())
                .totalDuration(course.getTotalDuration())
                .isPublished(course.getIsPublished())
                .instructor(UserMapper.toResponse(course.getInstructor()))
                .createdOn(course.getCreatedOn())
                .createdBy(course.getCreatedBy())
                .modifiedOn(course.getModifiedOn())
                .modifiedBy(course.getModifiedBy())
                .thumbnail((null != course.getThumbnail()) ? ImageMapper.toResponse(course.getThumbnail()) : null)
                .lessons(
                        course.getLessons()
                                .stream()
                                .map(LessonMapper::toResponse)
                                .toList()
                )
                .build();
    }

    public static void updateEntity(CourseRequest courseRequest, Course course) {
        if (courseRequest == null) {
            return;
        }
        course.setTitle(courseRequest.getTitle());
        course.setDescription(courseRequest.getDescription());
        course.setCategory(courseRequest.getCategory());
        course.setLevel(courseRequest.getLevel());
        course.setPrice(courseRequest.getPrice());
        course.setTotalDuration(courseRequest.getTotalDuration());
        course.setIsPublished(courseRequest.getIsPublished());
    }
}
