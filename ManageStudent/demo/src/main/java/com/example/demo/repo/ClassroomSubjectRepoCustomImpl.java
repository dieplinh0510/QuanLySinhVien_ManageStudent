package com.example.demo.repo;

import com.example.demo.domain.dto.ClassroomSubjectDTO;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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
  public List<ClassroomSubjectDTO> getAllClassroomSubjectDetail(Long subjectId, String classroomCode) {
    List<ClassroomSubjectDTO> list = new ArrayList<>();
    StringBuilder strQuery = new StringBuilder();
    strQuery.append("select\n" +
        "\tu.teacher_name, classroom_code, s.subject_name, cis.quantity_student, u.id, cis.id as classroomId \n" +
        "from\n" +
        "\tsubjects s\n" +
        "inner join classroom_in_subjects cis on\n" +
        "\ts.id = cis.id_subject\n" +
        "inner join users u on\n" +
        "\tcis.id_user = u.id ");
    if (subjectId != null){
      strQuery.append(" where s.id = :subjectId");
    }

    if (classroomCode != null){
      strQuery.append(" where cis.classroom_code = :classroomCode");
    }
    Query query = entityManager.createNativeQuery(strQuery.toString());
    if (subjectId != null){
      query.setParameter("subjectId", subjectId);
    }

    if (classroomCode != null){
      query.setParameter("classroomCode", classroomCode);
    }
    List<Object[]> result = query.getResultList();
    if (result!=null){
      for (Object[] item: result) {
        ClassroomSubjectDTO classroomSubjectDTO = ClassroomSubjectDTO.builder()
            .teacher(item[0] != null ? item[0].toString() : null)
            .classroomCode(item[1] != null ? item[1].toString() : null)
            .subjectName(item[2] != null ? item[2].toString() : null)
            .quantityStudent(item[3] != null ? Long.parseLong(item[3].toString()) : null)
            .idUser(item[4] != null ? Long.parseLong(item[4].toString()) : null)
            .idClassroom(item[5] != null ? Long.parseLong(item[5].toString()) : null)
            .build();
        list.add(classroomSubjectDTO);
      }
    }
    return list;
  }
}
