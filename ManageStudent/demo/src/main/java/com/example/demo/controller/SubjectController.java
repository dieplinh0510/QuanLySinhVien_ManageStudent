package com.example.demo.controller;

import com.example.demo.domain.dto.ClassroomDTO;
import com.example.demo.domain.dto.SubjectDTO;
import com.example.demo.domain.model.Subject;
import com.example.demo.service.SubjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;

@RestController
@Slf4j
@RequestMapping("/subjects")
public class SubjectController extends CommonController{
  private final SubjectService subjectService;

  public SubjectController(SubjectService subjectService) {
    this.subjectService = subjectService;
  }

  @GetMapping("/detail")
  public ResponseEntity<?> getSubjectBySubjectCode(@RequestParam(value = "subjectCode") String subjectCode){
    try {
      return toSuccessResult(subjectService.getSubjectBySubjectCode(subjectCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping()
  public ResponseEntity<?> getAllSubject(){
    try {
      return toSuccessResult(subjectService.getAllSubject());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/classrooms")
  public ResponseEntity<?> getClassroomBySubjectCode(@RequestParam(value = "subjectId") Long subjectId){
    try {
      return toSuccessResult(subjectService.getClassroomBySubjectCode(subjectId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @PostMapping()
  public ResponseEntity<?> createSubject(@RequestBody SubjectDTO subjectDTO){
    try {
      return toSuccessResult(subjectService.createSubject(subjectDTO));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @PutMapping()
  public ResponseEntity<?> changeSubject(@RequestBody SubjectDTO subjectDTO, @RequestParam(value = "subjectId") Long subjectId){
    try {
      return toSuccessResult(subjectService.changeSubject(subjectDTO, subjectId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }
}
