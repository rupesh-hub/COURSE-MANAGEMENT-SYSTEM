package com.alfarays.course.lesson.entity;

import com.alfarays.course.entity.Course;
import com.alfarays.shared.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lessons")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"course"})
public class Lesson extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "duration")
    private Integer duration; // in minutes

    @Column(name = "sequence_order")
    private Integer sequenceOrder;

    @Column(name = "is_published")
    private Boolean isPublished = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
}
