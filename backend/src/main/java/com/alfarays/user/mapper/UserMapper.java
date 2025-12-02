package com.alfarays.user.mapper;

import com.alfarays.image.mapper.ImageMapper;
import com.alfarays.user.entity.User;
import com.alfarays.user.model.UserRequest;
import com.alfarays.user.model.UserResponse;

public final class UserMapper {

    private UserMapper() {
    }

    public static User toEntity(UserRequest userRequest) {
        if (userRequest == null) return null;
        User user = new User();
        user.setFirstname(userRequest.getFirstname());
        user.setLastname(userRequest.getLastname());
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPhone(userRequest.getPhone());
        user.setBio(userRequest.getBio());
        user.setPassword(userRequest.getPassword());
        user.setIsActive(true);
        return user;
    }

    public static UserResponse toResponse(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .phone(user.getPhone())
                .bio(user.getBio())
                .isActive(user.getIsActive())
                .role(user.getRole() != null ? UserRoleMapper.toResponse(user.getRole()) : null)
                .createdOn(user.getCreatedOn())
                .createdBy(user.getCreatedBy())
                .modifiedOn(user.getModifiedOn())
                .modifiedBy(user.getModifiedBy())
                .profile(user.getProfile() != null ? ImageMapper.toResponse(user.getProfile()) : null)
                .build();
    }

    public static void updateEntity(UserRequest userRequest, User user) {
        if (userRequest == null) return;
        user.setEmail(userRequest.getEmail());
        user.setFirstname(userRequest.getFirstname());
        user.setLastname(userRequest.getLastname());
        user.setPhone(userRequest.getPhone());
        user.setBio(userRequest.getBio());
    }


}


