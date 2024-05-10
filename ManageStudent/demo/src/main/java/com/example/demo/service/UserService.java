package com.example.demo.service;


import com.example.demo.domain.dto.StudentDTO;
import com.example.demo.domain.dto.TeacherDTO;
import com.example.demo.domain.dto.UserDTO;
import com.example.demo.domain.model.User;

import java.io.IOException;
import java.util.List;

public interface UserService{
  List<TeacherDTO> getAllTeacher();
  List<User> search();

  User createUser(UserDTO dto);

  User updateUser(UserDTO dto);

  User registerStudent(StudentDTO studentDTO) throws IOException;
}
