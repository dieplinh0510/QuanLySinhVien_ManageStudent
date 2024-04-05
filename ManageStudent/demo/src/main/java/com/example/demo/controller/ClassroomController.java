package com.example.demo.controller;

import com.example.demo.domain.model.Classroom;
import com.example.demo.service.ClassroomService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/classroom")
public class ClassroomController {
  private final ClassroomService classroomService;

  public ClassroomController(ClassroomService classroomService) {
    this.classroomService = classroomService;
  }

  @GetMapping("/course")
  public List<Classroom> getClassroomByCourseId(@RequestParam(name = "courseId") Long courseId){
    return classroomService.getClassroomByCourseId(courseId);
  }

}
