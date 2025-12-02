package com.alfarays.user.service;

import com.alfarays.exception.ResourceNotFoundException;
import com.alfarays.image.entity.Image;
import com.alfarays.image.service.ImageService;
import com.alfarays.user.entity.Role;
import com.alfarays.user.entity.User;
import com.alfarays.user.mapper.UserMapper;
import com.alfarays.user.model.RoleResponse;
import com.alfarays.user.model.UserRequest;
import com.alfarays.user.model.UserResponse;
import com.alfarays.user.repository.RoleRepository;
import com.alfarays.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    @Override
    public UserResponse registerUser(UserRequest request) {
        log.info("Registering user with username: {}", request.getUsername());

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String password = request.getPassword();
        String confirmPassword = request.getConfirmPassword();
        if(!password.equals(confirmPassword)){
            throw new RuntimeException("Password and confirm password does not match.");
        }

        User user = UserMapper.toEntity(request);
        var profile = request.getProfile();
        if (null != profile) {
            final Image image = imageService.save(profile);
            user.setProfile(image);
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", request.getRole()));
        user.setRole(role);

        User savedUser = userRepository.save(user);
        log.info("User registered successfully with id: {}", savedUser.getId());
        
        return UserMapper.toResponse(savedUser);
    }

    @Override
    public UserResponse loginUser(String username, String password) {
        log.info("User login attempt for username: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        log.info("User logged in successfully");
        return null;
    }

    @Override
    public UserResponse getUserById(Long id) {
        log.info("Fetching user with id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id.toString()));
        return UserMapper.toResponse(user);
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        log.info("Fetching user with username: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        return UserMapper.toResponse(user);
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        log.info("Fetching user with email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return UserMapper.toResponse(user);
    }

    @Override
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        log.info("Fetching all users");
        return userRepository.findAll(pageable)
                .map(UserMapper::toResponse);
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        log.info("Updating user with id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id.toString()));
        UserMapper.updateEntity(userRequest, user);
        User updatedUser = userRepository.save(user);
        log.info("User updated successfully");
        return UserMapper.toResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        log.info("Deleting user with id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id.toString()));
        userRepository.delete(user);
        log.info("User deleted successfully");
    }
}
