package com.example.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

  private Long id;

  private String username;

  private String password;

  private String teacherName;

  private String teacherCode;

  private String email;

  private Boolean isActive = true;

}
