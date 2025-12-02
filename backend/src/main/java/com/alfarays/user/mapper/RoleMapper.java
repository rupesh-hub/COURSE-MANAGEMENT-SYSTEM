package com.alfarays.user.mapper;

import com.alfarays.user.entity.Role;
import com.alfarays.user.model.RoleRequest;
import com.alfarays.user.model.RoleResponse;

public final class RoleMapper {

    private RoleMapper() {

    }

    public static Role toEntity(RoleRequest roleRequest) {
        if (roleRequest == null) return null;
        Role role = new Role();
        role.setName(roleRequest.getName());
        role.setDescription(role.getDescription());
        return role;
    }

    public static RoleResponse toResponse(Role role) {
        if (role == null) return null;
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .createdOn(role.getCreatedOn())
                .createdBy(role.getCreatedBy())
                .build();
    }

    public static void updateEntity(RoleRequest roleRequest, Role role) {
        if (roleRequest == null) return;
        role.setName(roleRequest.getName());
        role.setDescription(roleRequest.getDescription());
    }
}
