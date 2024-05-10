package com.example.demo.service.impl;

import com.example.demo.common.Const;
import com.example.demo.domain.dto.StudentDTO;
import com.example.demo.domain.dto.TeacherDTO;
import com.example.demo.domain.dto.UserDTO;
import com.example.demo.domain.model.Role;
import com.example.demo.domain.model.User;
import com.example.demo.repo.RoleRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.repo.UserRepoCustom;
import com.example.demo.service.MailService;
import com.example.demo.service.UserService;
import com.example.demo.utils.FileUtil;
import com.example.demo.utils.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
  private final UserRepo userRepo;
  private final UserRepoCustom userRepoCustom;
  private final RoleRepo roleRepo;

  private final PasswordEncoder passwordEncoder;
  private final MailService mailService;

  public UserServiceImpl(UserRepo userRepo, UserRepoCustom userRepoCustom, RoleRepo roleRepo, PasswordEncoder passwordEncoder, MailService mailService) {
    this.userRepo = userRepo;
    this.userRepoCustom = userRepoCustom;
    this.roleRepo = roleRepo;
    this.passwordEncoder = passwordEncoder;
    this.mailService = mailService;
  }

  @Override
  public List<TeacherDTO> getAllTeacher() {
    List<TeacherDTO> teacherDTOList = userRepoCustom.getAllTeacherInfo();
    return teacherDTOList;
  }


  @Override
  public List<User> search() {
    return userRepo.findAll();
  }

  @Override
  public User createUser(UserDTO dto) {
    Assert.notNull(dto.getUsername(), "Teacher username is null");
    Assert.notNull(dto.getPassword(), "Teacher password is null");
    Assert.notNull(dto.getTeacherName(), "Teacher teacher name is null");
    Assert.notNull(dto.getTeacherCode(), "Teacher teacher code is null");

    Role role = roleRepo.findByNameRole(Const.ROLE_TEACHER);
    if (role == null) {
      return null;
    }

    User user = User.builder()
        .username(dto.getUsername())
        .password(passwordEncoder.encode(dto.getPassword()))
        .name(dto.getTeacherName())
        .code(dto.getTeacherCode())
        .email(dto.getEmail())
        .isFirstLogin(true)
        .createDatetime(LocalDateTime.now())
        .updateDatetime(LocalDateTime.now())
        .updateUser(SecurityUtil.getCurrentUserLogin().getUsername())
        .createUser(SecurityUtil.getCurrentUserLogin().getUsername())
        .idRole(role.getId())
        .isActive(true)
        .build();

    // send email
    mailService.send(dto.getEmail(), "Thông tin tài khoản", "Tài khoản của bạn đã được tạo thành công!\n" +
        "Username: " + dto.getUsername() + "\n" +
        "Password: " + dto.getPassword() + "\n" +
        "Vui lòng đăng nhập và thay đổi mật khẩu ngay sau khi đăng nhập thành công!");

    return userRepo.save(user);
  }

  @Override
  public User updateUser(UserDTO dto) {
    Assert.notNull(dto.getUsername(), "Teacher username is null");
    Assert.notNull(dto.getPassword(), "Teacher password is null");
    Assert.notNull(dto.getTeacherName(), "Teacher teacher name is null");
    Assert.notNull(dto.getTeacherCode(), "Teacher teacher code is null");

    User user = userRepo.findById(dto.getId()).orElse(null);
    if (user == null) {
      return null;
    }

    user.setUsername(dto.getUsername());
    user.setName(dto.getTeacherName());
    user.setCode(dto.getTeacherCode());
    user.setUpdateDatetime(LocalDateTime.now());
    user.setEmail(dto.getEmail());
    user.setIsActive(dto.getIsActive());
    user.setUpdateUser(SecurityUtil.getCurrentUserLogin().getUsername());

    if (!dto.getPassword().equals(user.getPassword())) {
      user.setPassword(passwordEncoder.encode(dto.getPassword()));
    }

    return userRepo.save(user);
  }

  @Override
  public User registerStudent(StudentDTO studentDTO) throws IOException {
    Assert.notNull(studentDTO.getUsername(), "Student username is null");
    Assert.notNull(studentDTO.getPassword(), "Student password is null");
    Assert.notNull(studentDTO.getStudentImage(), "Student image is null");
    Assert.notNull(studentDTO.getStudentName(), "Student name is null");
    Assert.notNull(studentDTO.getEmail(), "Student email is null");
    Assert.notNull(studentDTO.getIdClass(), "Class is null");
    Assert.notNull(studentDTO.getIdCourse(), "Course is null");
    User user = User.builder()
        .createDatetime(LocalDateTime.now())
        .createUser(studentDTO.getUsername())
        .password(passwordEncoder.encode(studentDTO.getPassword()))
        .username(studentDTO.getUsername())
        .idRole(3L)
        .isActive(true)
        .isFirstLogin(true)
        .image(FileUtil.saveImage(studentDTO.getStudentImage()))
        .name(studentDTO.getStudentName())
        .idClass(studentDTO.getIdClass())
        .email(studentDTO.getEmail())
        .build();
    userRepo.save(user);
    user.setCode(studentDTO.getIdCourse() + user.getId());
    userRepo.save(user);
    return user;
  }
}
