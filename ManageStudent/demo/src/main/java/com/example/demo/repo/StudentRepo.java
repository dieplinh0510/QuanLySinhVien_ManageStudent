package com.example.demo.repo;

import com.example.demo.domain.dto.StudentPointDTO;
import com.example.demo.domain.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {
  @Query(value = "select * from students s where s.id_class = :classroomId", nativeQuery = true)
  List<Student> getStudentByClassroomId(Long classroomId);

  @Query(value = "select * from students where student_code = :studentCode", nativeQuery = true)
  Student getStudentByStudentCode(String studentCode);

  @Query("select s from Student s where s.id = ?1")
  Optional<Student> findById(Long id);

}
