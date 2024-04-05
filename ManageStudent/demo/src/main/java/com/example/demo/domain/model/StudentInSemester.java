package com.example.demo.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "student_semester")
@Entity
public class StudentInSemester {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "student_id")
  private Long studentId;
  @Column(name = "semester_id")
  private Long semesterId;
  @Column(name = "accumulated_points")
  private Double accumulatedPoints;
  @Column(name = "create_user")
  private String createUser;
  @Column(name = "create_datetime")
  private LocalDateTime createDatetime;
  @Column(name = "update_user")
  private String updateUser;
  @Column(name = "update_datetime")
  private LocalDateTime updateDatetime;
}
