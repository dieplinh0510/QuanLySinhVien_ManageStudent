package com.example.demo.controller;

import com.example.demo.domain.dto.StudentPointDTO;
import com.example.demo.domain.dto.StudentPointInClassroomDTO;
import com.example.demo.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;
import static com.example.demo.common.Const.RETURN_CODE_SUCCESS;

@RestController
@Slf4j
@RequestMapping("/students")
public class StudentController extends CommonController {
  private final StudentService studentService;

  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  @GetMapping()
  public ResponseEntity<?> getStudentByStudentCode(@RequestParam(name = "studentCode") String studentCode) {
    try {
      return toSuccessResult(studentService.getStudentByStudentCode(studentCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/classroom")
  public ResponseEntity<?> getStudentByClassroom(@RequestParam(name = "courseId") Long courseId,
                                                 @RequestParam(name = "classroomId") Long classroomId) {
    try {
      return toSuccessResult(studentService.getStudentByClassroom(courseId, classroomId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/point")
  public ResponseEntity<?> getStudentByPoint(@RequestParam(name = "pointOne") Double pointOne,
                                             @RequestParam(name = "pointTwo") Double pointTwo) {
    try {
      return toSuccessResult(studentService.getStudentByPoint(pointOne, pointTwo));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/detail/subject")
  public ResponseEntity<?> getSubjectInStudent(@RequestParam(name = "studentCode") String studentCode) {
    try {
      return toSuccessResult(studentService.getSubjectInStudent(studentCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/semester/accumulated_point")
  public ResponseEntity<?> getAccumulatedPointByStudentCode(@RequestParam(name = "studentCode") String studentCode) {
    try {
      return toSuccessResult(studentService.getAccumulatedPointByStudentCode(studentCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @PostMapping()
  public ResponseEntity<?> createStudent(@RequestBody StudentPointDTO studentPointDTO) {
    try {
      return toSuccessResult(studentService.createStudent(studentPointDTO));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @PutMapping()
  public ResponseEntity<?> changeStudent(@RequestBody StudentPointDTO studentPointDTO) {
    try {
      return toSuccessResult(studentService.changeStudent(studentPointDTO));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @DeleteMapping()
  public ResponseEntity<?> deleteStudent(@RequestParam(name = "studentCode") String studentCode) {
    try {
      return toSuccessResult(studentService.deleteStudent(studentCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/view-point-class")
  public ResponseEntity<?> viewPointInClassroom(@RequestParam(name = "classroomCode") String classroomCode){
    try {
      return toSuccessResult(studentService.viewPointInClassroom(classroomCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @PutMapping("/change-point-class")
  public ResponseEntity<?> changePointClass(@RequestBody StudentPointInClassroomDTO studentPointInClassroomDTO){
    try {
      return toSuccessResult(studentService.changePointInClassroom(studentPointInClassroomDTO));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @DeleteMapping("/delete-point-class")
  public ResponseEntity<?> deleteStudentInClass(@RequestParam(value = "studentClassId") Long studentClassId){
    try {
      studentService.deleteStudentInClass(studentClassId);
      return toSuccessResult(RETURN_CODE_SUCCESS);
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/get-column")
  public ResponseEntity<?> getColumnForInputPoint(){
    try {
      return toSuccessResult(studentService.getColumnForInputPoint());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

}
