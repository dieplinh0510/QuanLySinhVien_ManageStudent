package com.example.demo.service.impl;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.domain.model.ClassroomSubject;
import com.example.demo.repo.ClassroomSubjectRepo;
import com.example.demo.repo.ClassroomSubjectRepoCustom;
import com.example.demo.repo.StudentInClassroomSubjectRepo;
import com.example.demo.service.ClassroomSubjectService;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClassroomSubjectServiceImpl implements ClassroomSubjectService {
  private final ClassroomSubjectRepo classroomSubjectRepo;
  private final ClassroomSubjectRepoCustom classroomSubjectRepoCustom;
  private final StudentInClassroomSubjectRepo studentInClassroomSubjectRepo;

  public ClassroomSubjectServiceImpl(ClassroomSubjectRepo classroomSubjectRepo, ClassroomSubjectRepoCustom classroomSubjectRepoCustom, StudentInClassroomSubjectRepo studentInClassroomSubjectRepo) {
    this.classroomSubjectRepo = classroomSubjectRepo;
    this.classroomSubjectRepoCustom = classroomSubjectRepoCustom;
    this.studentInClassroomSubjectRepo = studentInClassroomSubjectRepo;
  }

  @Override
  public List<ClassroomSubjectDTO> getClassroomSubject() {
    List<ClassroomSubjectDTO> classroomSubjectDTOS = classroomSubjectRepoCustom.getAllClassroomSubject();
    return classroomSubjectDTOS;
  }

  @Override
  public List<ClassroomSubjectDTO> getAllClassroomSubject(Long subjectId) {
    List<ClassroomSubjectDTO> list = classroomSubjectRepoCustom.getAllClassroomSubjectDetail(subjectId);
    return list;
  }

  @Override
  public ClassroomSubject createClassroomSubject(ClassroomSubjectDTO classroomSubjectDTO, Long subjectId) throws Exception {
    Assert.notNull(classroomSubjectDTO.getClassroomCode(), "Mã lớp chống");
    ClassroomSubject classroomSubject = classroomSubjectRepo.getClassroomSubjectByClassroomCode(classroomSubjectDTO.getClassroomCode());
    if (classroomSubject != null){
      ClassroomSubject classroomSubject1 = new ClassroomSubject();
      classroomSubject1.builder()
          .idSubject(subjectId)
          .classroomCode(classroomSubjectDTO.getClassroomCode())
          .idUser(classroomSubjectDTO.getIdUser())
          .quantityStudent(classroomSubjectDTO.getQuantityStudent())
          .createDatetime(LocalDateTime.now())
          .type(1)
          .build();
      classroomSubjectRepo.save(classroomSubject1);
      return  classroomSubject1;
    } else {
      throw new Exception("Mã lớp đã tồn tại");
    }
  }

  @Override
  public ClassroomSubject changeInfoClassroomSubject(ClassroomSubjectDTO classroomSubjectDTO, Long classroomId) throws Exception {
    ClassroomSubject classroomSubject = classroomSubjectRepo.getClassroomSubjectById(classroomId);
    if (classroomSubject!= null){
      Assert.notNull(classroomSubjectDTO.getClassroomCode(), "Mã lớp chống");
      if (classroomSubject.getType() == 3){
        if (classroomSubjectDTO.getQuantityStudent() >= classroomSubject.getQuantityStudent()){
          classroomSubject.setQuantityStudent(classroomSubjectDTO.getQuantityStudent());
        } else {
          throw new Exception("Số lượng sinh viên không hợp lệ");
        }
      }
      if (classroomSubject.getType() == 2){
        Long quantityStudent = studentInClassroomSubjectRepo.getQuantityStudentInClass(classroomId);
        if (classroomSubjectDTO.getQuantityStudent() >= quantityStudent){
          classroomSubject.setQuantityStudent(classroomSubjectDTO.getQuantityStudent());
        } else {
          throw new Exception("Số lượng sinh viên không hợp lệ");
        }
      }
      if (classroomSubject.getType() == 1){
        classroomSubject.setQuantityStudent(classroomSubjectDTO.getQuantityStudent());
      }
      classroomSubject.setClassroomCode(classroomSubjectDTO.getClassroomCode());
      classroomSubject.setIdUser(classroomSubjectDTO.getIdUser());
      classroomSubject.setUpdateDatetime(LocalDateTime.now());
      classroomSubjectRepo.save(classroomSubject);
      return classroomSubject;
    } else {
      throw new Exception("Lớp không tồn tại");
    }
  }


}
