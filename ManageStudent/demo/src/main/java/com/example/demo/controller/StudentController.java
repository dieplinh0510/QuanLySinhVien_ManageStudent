package com.example.demo.controller;

import com.example.demo.domain.dto.DetailStudentDTO;
import com.example.demo.domain.dto.StudentPointDTO;
import com.example.demo.domain.model.Student;
import com.example.demo.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
  private final StudentService studentService;

  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }
  @GetMapping()
  public StudentPointDTO getStudentByStudentCode(@RequestParam(name = "studentCode") String studentCode){
    return studentService.getStudentByStudentCode(studentCode);
  }

  @GetMapping("/classroom")
  public List<StudentPointDTO> getStudentByClassroom(@RequestParam(name = "courseId") Long courseId,
                                                     @RequestParam(name = "classroomId") Long classroomId) {
    return studentService.getStudentByClassroom(courseId, classroomId);
  }

  @GetMapping("/point")
  public List<StudentPointDTO> getStudentByPoint(@RequestParam(name = "pointOne") Double pointOne,
                                             @RequestParam(name = "pointTwo") Double pointTwo){
    return studentService.getStudentByPoint(pointOne, pointTwo);
  }

  @GetMapping("/detail/subject")
  public List<DetailStudentDTO> getSubjectInStudent(@RequestParam(name = "studentCode") String studentCode){
    return studentService.getSubjectInStudent(studentCode);
  }

  @PostMapping()
  public Student createStudent(@RequestBody StudentPointDTO studentPointDTO){
    return studentService.createStudent(studentPointDTO);
  }

  @PutMapping()
  public Student changeStudent(@RequestBody StudentPointDTO studentPointDTO){
    return studentService.changeStudent(studentPointDTO);
  }

  @DeleteMapping()
  public Boolean deleteStudent(@RequestParam(name = "studentCode") String studentCode ){
    return studentService.deleteStudent(studentCode);
  }

}
