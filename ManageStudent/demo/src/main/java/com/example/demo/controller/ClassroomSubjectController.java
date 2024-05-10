package com.example.demo.controller;

import com.example.demo.domain.dto.AuthenticationResponse;
import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.service.ClassroomSubjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;

@RestController
@RequestMapping("/classroom-subject")
@Slf4j
public class ClassroomSubjectController extends CommonController{
  private final ClassroomSubjectService classroomSubjectService;

  public ClassroomSubjectController(ClassroomSubjectService classroomSubjectService) {
    this.classroomSubjectService = classroomSubjectService;
  }

  @Operation(summary = "API lấy tất cả lớp học màn nhập điểm theo user - teacher")
  @GetMapping()
  ResponseEntity<?> getClassroomSubject(){
    try {
      return toSuccessResult(classroomSubjectService.getClassroomSubject());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API lấy tất cả lớp học màn quan ly lop hoc theo user - teacher")
  @GetMapping("/user")
  ResponseEntity<?> getClassroomSubjectByUser(){
    try {
      return toSuccessResult(classroomSubjectService.getClassroomSubjectByUser());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API lấy classroom trong môn học - admin")
  @GetMapping("/detail")
  ResponseEntity<?> getAllClassroomSubject(@RequestParam(name = "subjectId") Long subjectId){
    try {
      return toSuccessResult(classroomSubjectService.getAllClassroomSubject(subjectId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API search classroom trong môn học - admin")
  @GetMapping("/detail/{subjectId}/{classroomCode}")
  ResponseEntity<?> getClassroomByClassroomCode(
      @PathVariable Long subjectId,
      @PathVariable String classroomCode){
    try {
      return toSuccessResult(classroomSubjectService.getClassroomByClassroomCode(subjectId,classroomCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API tạo lớp học trong môn học - admin")
  @PostMapping()
  ResponseEntity<?> createClassroomSubject(@RequestBody ClassroomSubjectDTO classroomSubjectDTO, @RequestParam(value = "subjectId") Long subjectId){
    try {
      return toSuccessResult(classroomSubjectService.createClassroomSubject(classroomSubjectDTO, subjectId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API sửa classroom trong môn học - admin - teacher")
  @PutMapping()
  ResponseEntity<?> changeInfoClassroomSubject(@RequestBody ClassroomSubjectDTO classroomSubjectDTO, @RequestParam(value = "classroomId") Long classroomId){
    try {
      return toSuccessResult(classroomSubjectService.changeInfoClassroomSubject(classroomSubjectDTO, classroomId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API thêm sinh viên vào lớp học - admin")
  @PostMapping("/students")
  ResponseEntity<?> addStudentInClassroom(@RequestParam(value = "classroomId") Long classroomId,
                                          @RequestParam(value = "subjectId") Long subjectId,
                                          @RequestParam(value = "studentId") Long userId){
    try {
      return toSuccessResult(classroomSubjectService.addStudentInClassroom(classroomId, subjectId, userId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

}
