package com.example.demo.domain.dto;

import lombok.*;

import javax.persistence.Column;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentPointInClassroomDTO {
  private Long id;
  private String studentCode;
  private String studentName;
  private Double regularPointOne;
  private Double regularPointTwo;
  private Double midtermPointOne;
  private Double testPointOne;
  private Double accumulated_point;
  private Double mediumPoint;
}