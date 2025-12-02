package com.alfarays.image.entity;

import com.alfarays.course.entity.Course;
import com.alfarays.shared.BaseEntity;
import com.alfarays.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name", nullable = false)
    private String name;

    @Column(name = "file_type")
    private String type;

    @Column(name = "file_path", nullable = false, unique = true)
    private String path;

    @Column(name = "file_size")
    private Long size;

    @OneToOne(mappedBy = "profile")
    private User user;

    @OneToOne(mappedBy = "thumbnail")
    private Course course;
}
