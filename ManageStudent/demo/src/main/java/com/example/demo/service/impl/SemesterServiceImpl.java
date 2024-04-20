package com.example.demo.service.impl;

import com.example.demo.domain.model.Semester;
import com.example.demo.repo.SemesterRepo;
import com.example.demo.service.SemesterService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterServiceImpl implements SemesterService {

  private SemesterRepo semesterRepo;
  @Override
  public List<Semester> getAllSemester() {
    List<Semester> result = semesterRepo.getAllSemester();
    return result;
  }
}
