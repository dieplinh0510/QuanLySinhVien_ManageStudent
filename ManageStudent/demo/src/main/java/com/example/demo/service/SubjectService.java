package com.example.demo.service;

import com.example.demo.domain.dto.ClassroomDTO;
import com.example.demo.domain.dto.SubjectDTO;
import com.example.demo.domain.model.Subject;

import java.util.List;

public interface SubjectService {
  Subject getSubjectBySubjectCode(String subjectCode);
  List<Subject> getAllSubject();
  List<ClassroomDTO> getClassroomBySubjectId(Long subjectId);
  Subject getSubjectBySubjectId(Long subjectId) throws Exception;
  Subject createSubject(SubjectDTO subjectDTO) throws Exception;
  Subject changeSubject(SubjectDTO subjectDTO, Long subjectId) throws Exception;
}
