package com.example.demo.domain.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "students")
@Entity
@Builder
public class Student {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "id_class")
  private Long idClass;
  @Column(name = "student_code")
  private String studentCode;
  @Column(name = "student_name")
  private String studentName;
  @Column(name = "student_image")
  private String studentImage;
  @Column(name = "create_user")
  private String createUser;
  @Column(name = "create_datetime")
  private LocalDateTime createDatetime;
  @Column(name = "update_user")
  private String updateUser;
  @Column(name = "update_datetime")
  private LocalDateTime updateDatetime;
}
