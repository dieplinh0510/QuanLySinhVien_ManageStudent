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

  @Operation(summary = "API lấy tất cả lớp học màn nhập điểm")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @GetMapping()
  ResponseEntity<?> getClassroomSubject(){
    try {
      return toSuccessResult(classroomSubjectService.getClassroomSubject());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API lấy classroom trong môn học")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @GetMapping("/detail")
  ResponseEntity<?> getAllClassroomSubject(@RequestParam(name = "subjectId") Long subjectId){
    try {
      return toSuccessResult(classroomSubjectService.getAllClassroomSubject(subjectId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }



  @Operation(summary = "API tạo lớp học trong môn học")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @PostMapping()
  ResponseEntity<?> createClassroomSubject(@RequestBody ClassroomSubjectDTO classroomSubjectDTO, @RequestParam(value = "subjectId") Long subjectId){
    try {
      return toSuccessResult(classroomSubjectService.createClassroomSubject(classroomSubjectDTO, subjectId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API sửa classroom trong môn học")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @PutMapping()
  ResponseEntity<?> changeInfoClassroomSubject(@RequestBody ClassroomSubjectDTO classroomSubjectDTO, @RequestParam(value = "classroomId") Long classroomId){
    try {
      return toSuccessResult(classroomSubjectService.changeInfoClassroomSubject(classroomSubjectDTO, classroomId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

}
