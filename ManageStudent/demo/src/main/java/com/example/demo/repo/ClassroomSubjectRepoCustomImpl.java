package com.example.demo.repo;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import org.springframework.stereotype.Repository;

import javax.management.Query;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class ClassroomSubjectRepoCustomImpl implements ClassroomSubjectRepoCustom{
  @PersistenceContext
  EntityManager entityManager;
  @Override
  public List<ClassroomSubjectDTO> getAllClassroomSubject() {
    List<ClassroomSubjectDTO> list = new ArrayList<>();
    StringBuilder strQuery = new StringBuilder();
    strQuery.append("select\n" +
        "\tu.teacher_name, classroom_code, s.subject_name \n" +
        "from\n" +
        "\tsubjects s\n" +
        "inner join classroom_in_subjects cis on\n" +
        "\ts.id = cis.id_subject\n" +
        "inner join users u on\n" +
        "\tcis.id_user = u.id");
    List<Object[]> result = entityManager.createNativeQuery(strQuery.toString()).getResultList();
    if (result!=null){
      for (Object[] item: result) {
        ClassroomSubjectDTO classroomSubjectDTO = ClassroomSubjectDTO.builder()
            .teacher(item[0] != null ? item[0].toString() : null)
            .classroomCode(item[1] != null ? item[1].toString() : null)
            .subjectName(item[2] != null ? item[2].toString() : null)
            .build();
        list.add(classroomSubjectDTO);
      }
    }
    return list;
  }

  @Override
  public List<ClassroomSubjectDTO> getAllClassroomSubjectDetail() {
    List<ClassroomSubjectDTO> list = new ArrayList<>();
    StringBuilder strQuery = new StringBuilder();
    strQuery.append("select\n" +
        "\tu.teacher_name, classroom_code, s.subject_name, cis.quantity_student \n" +
        "from\n" +
        "\tsubjects s\n" +
        "inner join classroom_in_subjects cis on\n" +
        "\ts.id = cis.id_subject\n" +
        "inner join users u on\n" +
        "\tcis.id_user = u.id");
    List<Object[]> result = entityManager.createNativeQuery(strQuery.toString()).getResultList();
    if (result!=null){
      for (Object[] item: result) {
        ClassroomSubjectDTO classroomSubjectDTO = ClassroomSubjectDTO.builder()
            .teacher(item[0] != null ? item[0].toString() : null)
            .classroomCode(item[1] != null ? item[1].toString() : null)
            .subjectName(item[2] != null ? item[2].toString() : null)
            .quantityStudent(item[3] != null ? Long.parseLong(item[3].toString()) : null)
            .build();
        list.add(classroomSubjectDTO);
      }
    }
    return list;
  }
}
