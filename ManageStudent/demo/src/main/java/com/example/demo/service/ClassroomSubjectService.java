package com.example.demo.service;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.domain.model.ClassroomSubject;

import java.util.List;

public interface ClassroomSubjectService {
  List<ClassroomSubjectDTO> getClassroomSubject();
}
