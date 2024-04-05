package com.example.demo.repo;

import com.example.demo.domain.model.StudentInSemester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentInSemesterRepo extends JpaRepository<StudentInSemester, Long> {
  @Query(value = "select sum(accumulated_points) from student_semester where student_id = :studentId", nativeQuery = true)
  Double getAccumulatedPointsByStudentId(Long studentId);

  @Query(value = "select count(accumulated_points) from student_semester where student_id = :studentId", nativeQuery = true)
  Integer countAccumulatedPointsByStudentId(Long studentId);

  @Query(value = "with datas as (\n" +
      "\tselect\n" +
      "\t\tss.student_id, \n" +
      "\t\tSUM(ss.accumulated_points)/count(ss.student_id) as trungbinh\n" +
      "\tfrom\n" +
      "\t\tstudent_semester ss\n" +
      "\twhere\n" +
      "\t\t(\n" +
      "\t\tselect\n" +
      "\t\t\tsum(ss.accumulated_points)/count(ss.accumulated_points) \n" +
      "\t\tfrom\n" +
      "\t\t\n" +
      "\t\t\tstudent_semester ss2) >= :pointOne\n" +
      "\t\tand (\n" +
      "\t\tselect\n" +
      "\t\t\tsum(ss.accumulated_points)/count(ss.accumulated_points) \n" +
      "\t\tfrom\n" +
      "\t\t\tstudent_semester ss2) <= :pointTwo \n" +
      "\tgroup by ss.student_id\n" +
      "\torder by ss.student_id\n" +
      ")\n" +
      "select \n" +
      "\tss.id, \n" +
      "\td.trungbinh as accumulated_points,\n" +
      "\tss.create_datetime, \n" +
      "\tss.create_user, \n" +
      "\tss.semester_id, \n" +
      "\tss.student_id, \n" +
      "\tss.update_datetime, \n" +
      "\tss.update_user \n" +
      "from student_semester ss inner join datas d \n" +
      "\ton ss.student_id = d.student_id\n" +
      "order by ss.student_id ", nativeQuery = true)
  List<StudentInSemester> getStudentInSemesterByPoint(Double pointOne, Double pointTwo);


  @Query("select s from StudentInSemester s where s.semesterId = ?1")
  StudentInSemester findBySemesterId();

}
