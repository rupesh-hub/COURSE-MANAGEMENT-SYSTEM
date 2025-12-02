package com.alfarays.user.service;

import com.alfarays.exception.ResourceNotFoundException;
import com.alfarays.user.entity.Role;
import com.alfarays.user.mapper.RoleMapper;
import com.alfarays.user.model.RoleRequest;
import com.alfarays.user.model.RoleResponse;
import com.alfarays.user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleService implements IRoleService {

    private final RoleRepository roleRepository;

    @Override
    public RoleResponse createRole(RoleRequest roleRequest) {
        log.info("Creating role with name: {}", roleRequest.getName());
        Role role = RoleMapper.toEntity(roleRequest);
        Role savedRole = roleRepository.save(role);
        log.info("Role created successfully with id: {}", savedRole.getId());
        return RoleMapper.toResponse(savedRole);
    }

    @Override
    public RoleResponse getRoleById(Long id) {
        log.info("Fetching role with id: {}", id);
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id.toString()));
        return RoleMapper.toResponse(role);
    }

    @Override
    public RoleResponse getRoleByName(String roleName) {
        log.info("Fetching role with name: {}", roleName);
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleName));
        return RoleMapper.toResponse(role);
    }

    @Override
    public List<RoleResponse> getAllRoles() {
        log.info("Fetching all roles");
        return roleRepository.findAll()
                .stream()
                .map(RoleMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RoleResponse updateRole(Long id, RoleRequest roleRequest) {
        log.info("Updating role with id: {}", id);
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id.toString()));
        RoleMapper.updateEntity(roleRequest, role);
        Role updatedRole = roleRepository.save(role);
        log.info("Role updated successfully");
        return RoleMapper.toResponse(updatedRole);
    }

    @Override
    public void deleteRole(Long id) {
        log.info("Deleting role with id: {}", id);
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id.toString()));
        roleRepository.delete(role);
        log.info("Role deleted successfully");
    }
}
