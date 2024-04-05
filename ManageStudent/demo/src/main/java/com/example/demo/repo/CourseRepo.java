package com.example.demo.repo;

import com.example.demo.domain.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {
  @Query(value = "select * from courses", nativeQuery = true)
  List<Course> getAllCourse();

  @Query(value = "select * from courses where id = :courseId", nativeQuery = true)
  Course getCourseByCourseId(Long courseId);
}
