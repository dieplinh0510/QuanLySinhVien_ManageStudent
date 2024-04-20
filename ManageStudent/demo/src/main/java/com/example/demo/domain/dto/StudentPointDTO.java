package com.example.demo.domain.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentPointDTO {
  private String courseName;
  private String studentCode;
  private String studentName;
  private String classroomName;
  private Double accumulatedPoints;

  private Long studentId;

  //create student
  private String studentImage;
  private Long idClass;
  private Long idCourse;
}
