package com.example.demo.service.impl;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.domain.model.ClassroomSubject;
import com.example.demo.repo.ClassroomSubjectRepo;
import com.example.demo.repo.ClassroomSubjectRepoCustom;
import com.example.demo.service.ClassroomSubjectService;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.LocalDateTime;
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

  @Override
  public List<ClassroomSubjectDTO> getAllClassroomSubject() {
    List<ClassroomSubjectDTO> list = classroomSubjectRepoCustom.getAllClassroomSubjectDetail();
    return list;
  }

  @Override
  public ClassroomSubject createClassroomSubject(ClassroomSubjectDTO classroomSubjectDTO, Long subjectId) throws Exception {
    Assert.isNull(classroomSubjectDTO.getClassroomCode(), "Mã lớp chống");
    ClassroomSubject classroomSubject = classroomSubjectRepo.getClassroomSubjectByClassroomCode(classroomSubjectDTO.getClassroomCode());
    if (classroomSubject != null){
      ClassroomSubject classroomSubject1 = new ClassroomSubject();
      classroomSubject1.builder()
          .idSubject(subjectId)
          .classroomCode(classroomSubjectDTO.getClassroomCode())
          .idUser(classroomSubjectDTO.getIdUser())
          .quantityStudent(Long.parseLong(classroomSubjectDTO.getQuantityStudent()))
          .createDatetime(LocalDateTime.now())
          .build();
      classroomSubjectRepo.save(classroomSubject1);
      return  classroomSubject1;
    } else {
      throw new Exception("Mã lớp đã tồn tại");
    }
  }
}
