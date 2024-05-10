package com.example.demo.repo;

import com.example.demo.domain.dto.ClassroomSubjectDTO;

import java.util.List;

public interface ClassroomSubjectRepoCustom {
  List<ClassroomSubjectDTO> getAllClassroomSubject(Long userId);
  List<ClassroomSubjectDTO> getAllClassroomSubjectDetail(Long subjectId, String classroomCode, Long userId);
}
