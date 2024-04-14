package com.example.demo.service.impl;

import com.example.demo.domain.dto.TeacherDTO;
import com.example.demo.repo.UserRepo;
import com.example.demo.repo.UserRepoCustom;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
  private final UserRepo userRepo;
  private final UserRepoCustom userRepoCustom;

  public UserServiceImpl(UserRepo userRepo, UserRepoCustom userRepoCustom) {
    this.userRepo = userRepo;
    this.userRepoCustom = userRepoCustom;
  }

  @Override
  public List<TeacherDTO> getAllTeacher() {
    List<TeacherDTO> teacherDTOList = userRepoCustom.getAllTeacherInfo();
    return teacherDTOList;
  }
}
