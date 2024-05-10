package com.example.demo.service.impl;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.domain.model.ClassroomSubject;
import com.example.demo.domain.model.StudentInClassroomSubject;
import com.example.demo.domain.model.User;
import com.example.demo.repo.ClassroomSubjectRepo;
import com.example.demo.repo.ClassroomSubjectRepoCustom;
import com.example.demo.repo.StudentInClassroomSubjectRepo;
import com.example.demo.service.ClassroomSubjectService;
import com.example.demo.utils.SecurityUtil;
import org.springframework.http.HttpStatus;
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
  public List<ClassroomSubjectDTO> getClassroomSubject() throws Exception {
    User user = SecurityUtil.getCurrentUserLogin();
    if (user == null){
      throw new Exception(HttpStatus.UNAUTHORIZED.toString());
    }
    List<ClassroomSubjectDTO> classroomSubjectDTOS = classroomSubjectRepoCustom.getAllClassroomSubject(user.getId());
    return classroomSubjectDTOS;
  }

  @Override
  public List<ClassroomSubjectDTO> getClassroomSubjectByUser() throws Exception {
    User user = SecurityUtil.getCurrentUserLogin();
    if (user == null){
      throw new Exception(HttpStatus.UNAUTHORIZED.toString());
    }
    List<ClassroomSubjectDTO> list = classroomSubjectRepoCustom.getAllClassroomSubjectDetail(null, null, user.getId());
    return list;
  }

  @Override
  public List<ClassroomSubjectDTO> getAllClassroomSubject(Long subjectId) {
    List<ClassroomSubjectDTO> list = classroomSubjectRepoCustom.getAllClassroomSubjectDetail(subjectId, null, null);
    return list;
  }

  @Override
  public ClassroomSubjectDTO getClassroomByClassroomCode(Long subjectId, String classroomCode) throws Exception {
    List<ClassroomSubjectDTO> listClassroom = classroomSubjectRepoCustom.getAllClassroomSubjectDetail(subjectId, classroomCode, null);
    if (listClassroom.size() != 0){
      ClassroomSubjectDTO classroom = listClassroom.get(0);
      if (classroom == null){
        throw new Exception("Không tìm thấy thông tin lớp học");
      }
      return classroom;
    } else {
      throw new Exception("Không tìm thấy thông tin lớp học");
    }

  }

  @Override
  public ClassroomSubject createClassroomSubject(ClassroomSubjectDTO classroomSubjectDTO, Long subjectId) throws Exception {
    User user = SecurityUtil.getCurrentUserLogin();
    if (user == null){
      throw new Exception(HttpStatus.UNAUTHORIZED.toString());
    }
    if (user.getIdRole() != 1){
      throw new Exception("Tài khoản không có quyền sử dụng chức năng này");
    }
    Assert.notNull(classroomSubjectDTO.getClassroomCode(), "Mã lớp chống");
    ClassroomSubject classroomSubject = classroomSubjectRepo.getClassroomSubjectByClassroomCode(classroomSubjectDTO.getClassroomCode());
    if (classroomSubject == null){
      ClassroomSubject classroomSubject1 = ClassroomSubject.builder()
          .idSubject(subjectId)
          .classroomCode(classroomSubjectDTO.getClassroomCode())
          .idUser(classroomSubjectDTO.getIdUser())
          .quantityStudent(classroomSubjectDTO.getQuantityStudent())
          .createDatetime(LocalDateTime.now())
          .status(-1)
          .build();
      classroomSubjectRepo.save(classroomSubject1);
      return  classroomSubject1;
    } else {
      throw new Exception("Mã lớp đã tồn tại");
    }
  }

  @Override
  public ClassroomSubject changeInfoClassroomSubject(ClassroomSubjectDTO classroomSubjectDTO, Long classroomId) throws Exception {
    User user = SecurityUtil.getCurrentUserLogin();
    if (user == null){
      throw new Exception(HttpStatus.UNAUTHORIZED.toString());
    }
    ClassroomSubject classroomSubject = classroomSubjectRepo.getClassroomSubjectById(classroomId);
    if ( classroomSubject != null && classroomSubject.getIdUser() == user.getId()){
      classroomSubject.setStatus(2);
      classroomSubjectRepo.save(classroomSubject);
    } else if (user.getIdRole() != 1){
      throw new Exception("Tài khoản không có quyền sử dụng chức năng này");
    }

    if (classroomSubject!= null){
      if (classroomSubject.getStatus() != -1){
        throw new Exception("Không thể thay đổi thông tin lớp học");
      }
      Assert.notNull(classroomSubjectDTO.getClassroomCode(), "Mã lớp chống");
      classroomSubject.setQuantityStudent(classroomSubjectDTO.getQuantityStudent());
      classroomSubject.setClassroomCode(classroomSubjectDTO.getClassroomCode());
      classroomSubject.setIdUser(classroomSubjectDTO.getIdUser());
      classroomSubject.setUpdateDatetime(LocalDateTime.now());
      classroomSubject.setStatus(classroomSubjectDTO.getStatus());
      classroomSubjectRepo.save(classroomSubject);
      return classroomSubject;
    } else {
      throw new Exception("Lớp không tồn tại");
    }
  }

  @Override
  public StudentInClassroomSubject addStudentInClassroom(Long classroomId, Long subjectId, Long userId) throws Exception {
    User user = SecurityUtil.getCurrentUserLogin();
    if (user == null){
      throw new Exception(HttpStatus.UNAUTHORIZED.toString());
    }
    if (user.getIdRole() != 1){
      throw new Exception("Tài khoản không có quyền sử dụng chức năng này");
    }
    ClassroomSubject classroomSubject = classroomSubjectRepo.getClassroomSubjectByIdAndStatus(classroomId);
    if (classroomSubject != null){
      throw new Exception("Lớp học đã bắt đầu, không thể thêm sinh viên");
    }
    Long result = studentInClassroomSubjectRepo.getStudentInStudentClass(userId, subjectId);
    if (result == null){
        Long quantityStudentInClass = studentInClassroomSubjectRepo.getQuantityStudent(classroomId);
      if (quantityStudentInClass <= classroomSubject.getQuantityStudent()){
        StudentInClassroomSubject studentInClassroomSubject = StudentInClassroomSubject.builder()
                                                              .idClassroomInSubject(classroomId)
                                                              .idUser(userId)
                                                              .createUser(user.getUsername())
                                                              .createDatetime(LocalDateTime.now())
                                                              .createDatetime(LocalDateTime.now())
                                                              .build();
        studentInClassroomSubjectRepo.save(studentInClassroomSubject);
        return studentInClassroomSubject;
      } else {
        throw new Exception("Lớp đã đầy.");
      }
    } else {
      throw new Exception("Sinh viên đang học môn học này");
    }
  }


}
