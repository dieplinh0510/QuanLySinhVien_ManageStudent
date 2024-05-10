package com.example.demo.service.impl;

import com.example.demo.domain.dto.AuthenticationPayload;
import com.example.demo.domain.dto.AuthenticationResponse;
import com.example.demo.domain.dto.ChangePasswordPayload;
import com.example.demo.domain.model.Role;
import com.example.demo.domain.model.User;
import com.example.demo.repo.RoleRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.AuthService;
import com.example.demo.service.MyUserDetailsService;
import com.example.demo.utils.JwtUtil;
import com.example.demo.utils.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class AuthServiceImpl implements AuthService {
  private final UserRepo userRepo;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;
  private final MyUserDetailsService myUserDetailsService;
  private final RoleRepo roleRepo;

  public AuthServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, MyUserDetailsService myUserDetailsService,
                         RoleRepo roleRepo) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
    this.myUserDetailsService = myUserDetailsService;
    this.roleRepo = roleRepo;
  }

  @Override
  public AuthenticationResponse login(AuthenticationPayload payload) {
    User user = userRepo.getUserByUsername(payload.getUsername());
    if (ObjectUtils.isEmpty(user)) {
      return null;
    }

    if (!passwordEncoder.matches(payload.getPassword(), user.getPassword())) {
      return null;
    }

    Role role = roleRepo.getRoleByRoleId(user.getIdRole());
    return new AuthenticationResponse(
        jwtUtil.generateToken(myUserDetailsService.loadUserByUsername(user.getUsername())),
        user, role != null ? role.getNameRole() : null
    );
  }

  @Override
  public AuthenticationResponse changePassword(ChangePasswordPayload payload) {
    User user = userRepo.getUserByUsername(SecurityUtil.getCurrentUserLogin().getUsername());
    if (ObjectUtils.isEmpty(user)) {
      return null;
    }

    user.setPassword(passwordEncoder.encode(payload.getPassword()));
    user.setIsFirstLogin(false);
    user = userRepo.save(user);

    Role role = roleRepo.getRoleByRoleId(user.getIdRole());
    return new AuthenticationResponse(
        jwtUtil.generateToken(myUserDetailsService.loadUserByUsername(user.getUsername())),
        user, role != null ? role.getNameRole() : null
    );
  }
}
