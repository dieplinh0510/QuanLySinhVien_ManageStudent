package com.example.demo.service;


import com.example.demo.domain.dto.TeacherDTO;
import com.example.demo.domain.dto.UserDTO;
import com.example.demo.domain.model.User;

import java.util.List;

public interface UserService{
  List<TeacherDTO> getAllTeacher();
  List<User> search();

  User createUser(UserDTO dto);

  User updateUser(UserDTO dto);
}
