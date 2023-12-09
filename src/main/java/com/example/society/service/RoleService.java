package com.example.society.service;

import com.example.society.models.Role;
import com.example.society.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role getUserRole() {
        return roleRepository.findByName("ROLE_USER")
                .orElseThrow(RuntimeException::new);
    }
}