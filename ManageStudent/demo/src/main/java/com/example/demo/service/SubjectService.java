package com.example.demo.service;

import com.example.demo.domain.dto.ClassroomDTO;
import com.example.demo.domain.dto.SubjectDTO;
import com.example.demo.domain.model.Subject;

import java.util.List;

public interface SubjectService {
  Subject getSubjectBySubjectCode(String subjectCode);
  List<Subject> getAllSubject();
  List<ClassroomDTO> getClassroomBySubjectCode(Long subjectId);
  Subject createSubject(SubjectDTO subjectDTO) throws Exception;
  Subject changeSubject(SubjectDTO subjectDTO, Long subjectId) throws Exception;
}
