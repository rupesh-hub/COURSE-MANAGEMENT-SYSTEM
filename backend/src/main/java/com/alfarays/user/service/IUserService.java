package com.alfarays.user.service;

import com.alfarays.user.model.RoleResponse;
import com.alfarays.user.model.UserRequest;
import com.alfarays.user.model.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
    UserResponse registerUser(UserRequest userRequest);
    UserResponse loginUser(String username, String password);
    UserResponse getUserById(Long id);
    UserResponse getUserByUsername(String username);
    UserResponse getUserByEmail(String email);
    Page<UserResponse> getAllUsers(Pageable pageable);
    UserResponse updateUser(Long id, UserRequest userRequest);
    void deleteUser(Long id);
}
