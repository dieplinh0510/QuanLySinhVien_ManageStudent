package com.example.demo.repo;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import com.example.demo.domain.model.ClassroomSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomSubjectRepo extends JpaRepository<ClassroomSubject, Long> {
  @Query(value = "select * from classroom_in_subjects where id_subject = :idSubject", nativeQuery = true)
  List<ClassroomSubject> getByIdSubject(Long idSubject);

  @Query(value = "select * from classroom_in_subjects where classroom_code = :classroomCode", nativeQuery = true)
  ClassroomSubject getClassroomSubjectByClassroomCode(String classroomCode);

}
