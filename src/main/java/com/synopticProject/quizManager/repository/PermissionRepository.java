package com.synopticProject.quizManager.repository;
import com.synopticProject.quizManager.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByPermission(String permission);
}
