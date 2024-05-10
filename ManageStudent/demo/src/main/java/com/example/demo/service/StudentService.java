package com.example.demo.service;

import com.example.demo.domain.dto.*;
import com.example.demo.domain.model.User;
import org.springframework.data.domain.Page;

import java.util.LinkedHashMap;
import java.util.List;

public interface StudentService {
  StudentPointDTO getStudentByStudentCode(Long code);
  StudentPointDTO getStudentByStudentId(Long userId) throws Exception;
//  List<StudentPointDTO> getStudentByClassroom(Long courseId, Long classroomId);
//  List<StudentPointDTO> getStudentByPoint(Double pointStart, Double pointEnd);
  Page<StudentPointDTO> searchStudent(String studentCode, Long courseId, Long classroomId, Double pointStart, Double pointEnd, Integer pageIndex, Integer pageSize) throws Exception;
  Page<DetailStudentDTO> getSubjectInStudent(Long studentId, Integer pageIndex, Integer pageSize);
  List<StudentSemesterDTO> getAccumulatedPointByStudentCode(Long studentCode);
  User createStudent(StudentDTO studentDTO) throws Exception;
  User changeStudent(StudentDTO studentDTO) throws Exception;
  List<StudentPointInClassroomDTO> viewPointInClassroom(String classroomCode);
  StudentPointInClassroomDTO sendRequestChangePointClass(String classroomCode);
  StudentPointInClassroomDTO changePointInClassroom(StudentPointInClassroomDTO studentPointInClassroomDTO) throws Exception;
  void deleteStudentInClass(Long studentClassId);
  LinkedHashMap<String, String> getColumnForInputPoint();
  LinkedHashMap<String, String> getColumnForInput();
  List<ClassroomSubjectDTO> viewSubjectClassRegister(String subjectCode);
  List<SubjectDTO> viewSubjectRegister();


}
