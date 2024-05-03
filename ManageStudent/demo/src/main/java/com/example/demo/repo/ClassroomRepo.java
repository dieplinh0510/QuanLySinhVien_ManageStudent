package com.example.demo.repo;

import com.example.demo.domain.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepo extends JpaRepository<Classroom, Long> {
  @Query(value = "select * from classroomes where id_course = :courseId", nativeQuery = true)
  List<Classroom> getClassroomByCourseId(Long courseId);

  @Query(value = "select * from classroomes where id = :classroomId", nativeQuery = true)
  Classroom getClassroomByClassroomId(Long classroomId);

  @Query(value = "select c.id  from classroomes c where c.id_course = :courseId and c.name_class = :className", nativeQuery = true)
  Long getIdByClassNameAndCourseId(Long courseId, String className);
}
