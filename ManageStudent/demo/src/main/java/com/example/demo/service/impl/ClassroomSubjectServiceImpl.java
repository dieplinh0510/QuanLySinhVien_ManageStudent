package com.example.demo.service.impl;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.repo.ClassroomSubjectRepo;
import com.example.demo.repo.ClassroomSubjectRepoCustom;
import com.example.demo.service.ClassroomSubjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomSubjectServiceImpl implements ClassroomSubjectService {
  private final ClassroomSubjectRepo classroomSubjectRepo;
  private final ClassroomSubjectRepoCustom classroomSubjectRepoCustom;

  public ClassroomSubjectServiceImpl(ClassroomSubjectRepo classroomSubjectRepo, ClassroomSubjectRepoCustom classroomSubjectRepoCustom) {
    this.classroomSubjectRepo = classroomSubjectRepo;
    this.classroomSubjectRepoCustom = classroomSubjectRepoCustom;
  }

  @Override
  public List<ClassroomSubjectDTO> getClassroomSubject() {
    List<ClassroomSubjectDTO> classroomSubjectDTOS = classroomSubjectRepoCustom.getAllClassroomSubject();
    return classroomSubjectDTOS;
  }
}
