package com.example.demo.service.impl;

import com.example.demo.domain.dto.ClassroomDTO;
import com.example.demo.domain.dto.SubjectDTO;
import com.example.demo.domain.model.ClassroomSubject;
import com.example.demo.domain.model.Subject;
import com.example.demo.repo.ClassroomSubjectRepo;
import com.example.demo.repo.SubjectRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.SubjectService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SubjectServiceImpl implements SubjectService {
  private final SubjectRepo subjectRepo;
  private final ClassroomSubjectRepo classroomSubjectRepo;
  private final UserRepo userRepo;

  public SubjectServiceImpl(SubjectRepo subjectRepo, ClassroomSubjectRepo classroomSubjectRepo, UserRepo userRepo) {
    this.subjectRepo = subjectRepo;
    this.classroomSubjectRepo = classroomSubjectRepo;
    this.userRepo = userRepo;
  }

  @Override
  public Subject getSubjectBySubjectCode(String subjectCode) {
    Subject subject = subjectRepo.getSubjectBySubjectCode(subjectCode);
    return subject;
  }

  @Override
  public List<Subject> getAllSubject() {
    List<Subject> subjects = subjectRepo.findAll();
    return subjects;
  }

  @Override
  public List<ClassroomDTO> getClassroomBySubjectId(Long subjectId) {
    List<ClassroomDTO> classroomDTOS = new ArrayList<>();
    Subject subject = subjectRepo.getById(subjectId);
    List<ClassroomSubject> classroomSubjects = classroomSubjectRepo.getByIdSubject(subjectId);
    for (ClassroomSubject item: classroomSubjects) {
      ClassroomDTO classroomDTO = ClassroomDTO.builder()
          .classroomCode(item.getClassroomCode())
          .subjectName(subject.getSubjectName())
          .quantityStudent(item.getQuantityStudent())
          .teacherName(userRepo.findById(item.getIdUser()).get() != null ? userRepo.findById(item.getIdUser()).get().getTeacherName() : null)
          .build();
      classroomDTOS.add(classroomDTO);
    }
    return classroomDTOS;
  }

  @Override
  public Subject getSubjectBySubjectId(Long subjectId) throws Exception {
    Subject subject = subjectRepo.getSubjectBySubjectId(subjectId);
    if(subject==null){
      throw new Exception("Không tim thấy môn học");
    }
    return subject;
  }

  @Override
  public Subject createSubject(SubjectDTO subjectDTO) throws Exception {
    Subject subject = subjectRepo.getSubjectBySubjectCode(subjectDTO.getSubjectCode());
    if (subject == null){
      Subject subjectNew = Subject.builder()
          .subjectCode(subjectDTO.getSubjectCode())
          .subjectName(subjectDTO.getSubjectName())
          .idSemester(subjectDTO.getIdSemester())
          .numberOfCredits(subjectDTO.getNumberOfCredits())
          .createDatetime(LocalDateTime.now())
          .build();
      subjectRepo.save(subjectNew);
      return subjectNew;
    } else {
     throw new Exception("Môn học đã tồn tại");
    }
  }

  @Override
  public Subject changeSubject(SubjectDTO subjectDTO, Long subjectId) throws Exception {
    Subject subject = subjectRepo.findById(subjectId).get();
    if (subject != null){
      subject.setSubjectCode(subjectDTO.getSubjectCode());
      subject.setSubjectName(subjectDTO.getSubjectName());
      subject.setIdSemester(subjectDTO.getIdSemester());
      subject.setNumberOfCredits(subjectDTO.getNumberOfCredits());
      subject.setUpdateDatetime(LocalDateTime.now());
      subjectRepo.save(subject);
      return subject;
    } else {
      throw new Exception("Môn học chưa tồn tại");
    }
  }


}
