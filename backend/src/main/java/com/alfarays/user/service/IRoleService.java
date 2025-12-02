package com.alfarays.user.service;

import com.alfarays.user.model.RoleRequest;
import com.alfarays.user.model.RoleResponse;

import java.util.List;

public interface IRoleService {
    RoleResponse createRole(RoleRequest roleRequest);
    RoleResponse getRoleById(Long id);
    RoleResponse getRoleByName(String roleName);
    List<RoleResponse> getAllRoles();
    RoleResponse updateRole(Long id, RoleRequest roleRequest);
    void deleteRole(Long id);
}
