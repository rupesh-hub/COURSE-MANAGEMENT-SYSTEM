package com.alfarays.user.repository;

import com.alfarays.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("SELECT R FROM Role R WHERE lower(R.name)=lower(:name)")
    Optional<Role> findByName(String name);
}
