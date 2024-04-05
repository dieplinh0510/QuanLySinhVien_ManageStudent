package com.example.demo.service;

import com.example.demo.domain.dto.DetailStudentDTO;
import com.example.demo.domain.dto.StudentPointDTO;
import com.example.demo.domain.model.Student;

import java.util.List;

public interface StudentService {
  StudentPointDTO getStudentByStudentCode(String studentCode);
  List<StudentPointDTO> getStudentByClassroom(Long courseId, Long classroomId);
  List<StudentPointDTO> getStudentByPoint(Double pointOne, Double pointTwo);
  List<DetailStudentDTO> getSubjectInStudent(String studentCode);
  Student createStudent(StudentPointDTO studentPointDTO);
  Student changeStudent(StudentPointDTO studentPointDTO);
  Boolean deleteStudent(String studentCode);
}
