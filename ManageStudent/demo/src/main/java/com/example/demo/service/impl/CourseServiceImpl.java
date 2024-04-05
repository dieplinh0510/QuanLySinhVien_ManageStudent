package com.example.demo.service.impl;

import com.example.demo.domain.model.Course;
import com.example.demo.repo.CourseRepo;
import com.example.demo.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
  private final CourseRepo courseRepo;

  public CourseServiceImpl(CourseRepo courseRepo) {
    this.courseRepo = courseRepo;
  }

  @Override
  public List<Course> getAllCourse() {
    return courseRepo.getAllCourse();
  }
}
