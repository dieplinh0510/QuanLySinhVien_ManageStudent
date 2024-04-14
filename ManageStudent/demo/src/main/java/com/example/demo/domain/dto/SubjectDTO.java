package com.example.demo.domain.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectDTO {
  private String subjectCode;
  private String subjectName;;
  private Integer numberOfCredits;
  private Long idSemester;
}
