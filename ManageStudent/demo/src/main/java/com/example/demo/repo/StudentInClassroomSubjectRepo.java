package com.example.demo.repo;

import com.example.demo.domain.model.StudentInClassroomSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInClassroomSubjectRepo extends JpaRepository<StudentInClassroomSubject, Long> {
  @Query(value = "select * from student_in_classroom_subjects s where id_student = :studentId", nativeQuery = true)
  List<StudentInClassroomSubject> findByStudentId(Long studentId);

  @Query(value = "select cis.id_subject  from student_in_classroom_subjects sics join classroom_in_subjects cis on sics.id_class_sbject = cis.id where sics.id_class_sbject = :idClassSubject and sics.id_student = :idStudent", nativeQuery = true)
  Long getIdSubject(Long idClassSubject, Long idStudent);

  @Query(value = "select cis.classroom_code  from student_in_classroom_subjects sics join classroom_in_subjects cis on sics.id_class_sbject = cis.id where sics.id_class_sbject = :idClassSubject and sics.id_student = :idStudent", nativeQuery = true)
  String getClassroomCode(Long idClassSubject, Long idStudent);
}
