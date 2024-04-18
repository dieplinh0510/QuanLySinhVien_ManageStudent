package com.example.demo.service;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.domain.model.ClassroomSubject;

import java.util.List;

public interface ClassroomSubjectService {
  List<ClassroomSubjectDTO> getClassroomSubject();
  List<ClassroomSubjectDTO> getAllClassroomSubject(Long subjectId);
  ClassroomSubject createClassroomSubject(ClassroomSubjectDTO classroomSubjectDTO, Long subjectId) throws Exception;
  ClassroomSubject changeInfoClassroomSubject(ClassroomSubjectDTO classroomSubjectDTO, Long classroomId) throws Exception;
}
