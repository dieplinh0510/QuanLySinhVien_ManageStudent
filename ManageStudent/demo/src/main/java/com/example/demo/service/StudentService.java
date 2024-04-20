package com.example.demo.service;

import com.example.demo.domain.dto.DetailStudentDTO;
import com.example.demo.domain.dto.StudentPointDTO;
import com.example.demo.domain.dto.StudentPointInClassroomDTO;
import com.example.demo.domain.dto.StudentSemesterDTO;
import com.example.demo.domain.model.Student;
import com.example.demo.domain.model.StudentInClassroomSubject;
import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.List;

public interface StudentService {
  StudentPointDTO getStudentByStudentCode(String studentCode);
  StudentPointDTO getStudentByStudentId(Long studentId) throws Exception;
  List<StudentPointDTO> getStudentByClassroom(Long courseId, Long classroomId);
  List<StudentPointDTO> getStudentByPoint(Double pointStart, Double pointEnd);
  Page<StudentPointDTO> searchStudent(String studentCode, Long courseId, Long classroomId, Double pointStart, Double pointEnd, Integer pageIndex, Integer pageSize) throws Exception;
  List<DetailStudentDTO> getSubjectInStudent(Long studentId);
  List<StudentSemesterDTO> getAccumulatedPointByStudentCode(String studentCode);
  Student createStudent(StudentPointDTO studentPointDTO);
  Student changeStudent(StudentPointDTO studentPointDTO);
  Boolean deleteStudent(String studentCode);
  List<StudentPointInClassroomDTO> viewPointInClassroom(String classroomCode);
  StudentPointInClassroomDTO changePointInClassroom(StudentPointInClassroomDTO studentPointInClassroomDTO);
  void deleteStudentInClass(Long studentClassId);
  HashMap<String, String> getColumnForInputPoint();
  HashMap<String, String> getColumnForInput();
}
