package com.example.demo.domain.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassroomSubjectDTO {
  private String teacher;
  private String classroomCode;
  private String subjectName;
  private String quantityStudent;
  private Long idUser;

}