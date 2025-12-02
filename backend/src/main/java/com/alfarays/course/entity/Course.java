package com.alfarays.course.entity;

import com.alfarays.course.comment.entity.Comment;
import com.alfarays.course.enums.CourseLevel;
import com.alfarays.course.lesson.entity.Lesson;
import com.alfarays.shared.BaseEntity;
import com.alfarays.image.entity.Image;
import com.alfarays.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "courses")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"lessons", "comments", "instructor", "coverImage"})
public class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "category")
    private String category;

    @Column(name = "level")
    @Enumerated(EnumType.STRING)
    private CourseLevel level;

    @Column(name = "price")
    private Double price;

    @Column(name = "total_duration")
    private Integer totalDuration; // in minutes

    @Column(name = "is_published")
    private Boolean isPublished = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cover_image_id")
    private Image thumbnail;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Lesson> lessons;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments;
}
