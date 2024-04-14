package com.example.demo.service;


import com.example.demo.domain.dto.TeacherDTO;
import com.example.demo.domain.model.User;

import java.util.List;

public interface UserService{
  List<TeacherDTO> getAllTeacher();
}
