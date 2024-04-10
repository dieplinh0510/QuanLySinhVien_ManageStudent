package com.example.demo.controller;

import com.example.demo.service.ClassroomSubjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;

@RestController
@RequestMapping("/classroom-subject")
@Slf4j
public class ClassroomSubjectController extends CommonController{
  private final ClassroomSubjectService classroomSubjectService;

  public ClassroomSubjectController(ClassroomSubjectService classroomSubjectService) {
    this.classroomSubjectService = classroomSubjectService;
  }

  @GetMapping()
  ResponseEntity<?> getClassroomSubject(){
    try {
      return toSuccessResult(classroomSubjectService.getClassroomSubject());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }
}
