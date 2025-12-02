package com.alfarays.user.mapper;

import com.alfarays.user.entity.Role;
import com.alfarays.user.model.RoleResponse;

public final class UserRoleMapper {

    private UserRoleMapper() {
    }

    static RoleResponse toResponse(Role role) {
        if (role == null) {
            return null;
        }
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .createdOn(role.getCreatedOn())
                .createdBy(role.getCreatedBy())
                .build();
    }

}
