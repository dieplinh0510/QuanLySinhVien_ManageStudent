package com.example.demo.controller;

import com.example.demo.domain.model.Course;
import com.example.demo.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {
  private final CourseService courseService;

  public CourseController(CourseService courseService) {
    this.courseService = courseService;
  }

  @GetMapping()
  public List<Course> getAllCourse() {
    return courseService.getAllCourse();
  }
}
