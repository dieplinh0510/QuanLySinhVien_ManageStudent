package com.example.demo.service;

import com.example.demo.domain.dto.*;
import com.example.demo.domain.model.Student;
import com.example.demo.domain.model.StudentInClassroomSubject;
import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface StudentService {
  StudentPointDTO getStudentByStudentCode(String studentCode);
  StudentPointDTO getStudentByStudentId(Long studentId) throws Exception;
  List<StudentPointDTO> getStudentByClassroom(Long courseId, Long classroomId);
  List<StudentPointDTO> getStudentByPoint(Double pointStart, Double pointEnd);
  Page<StudentPointDTO> searchStudent(String studentCode, Long courseId, Long classroomId, Double pointStart, Double pointEnd, Integer pageIndex, Integer pageSize) throws Exception;
  Page<DetailStudentDTO> getSubjectInStudent(Long studentId, Integer pageIndex, Integer pageSize);
  List<StudentSemesterDTO> getAccumulatedPointByStudentCode(String studentCode);
  Student createStudent(StudentDTO studentDTO) throws Exception;
  Student changeStudent(StudentDTO studentDTO) throws Exception;
  Boolean deleteStudent(String studentCode);
  List<StudentPointInClassroomDTO> viewPointInClassroom(String classroomCode);
  StudentPointInClassroomDTO changePointInClassroom(StudentPointInClassroomDTO studentPointInClassroomDTO) throws Exception;
  void deleteStudentInClass(Long studentClassId);
  LinkedHashMap<String, String> getColumnForInputPoint();
  LinkedHashMap<String, String> getColumnForInput();
}
