package com.example.demo.controller;

import com.example.demo.domain.dto.AuthenticationPayload;
import com.example.demo.domain.dto.AuthenticationResponse;
import com.example.demo.domain.dto.ChangePasswordPayload;
import com.example.demo.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController extends CommonController{
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @Operation(summary = "API login - admin - teacher")
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid AuthenticationPayload payload) {
    AuthenticationResponse response = authService.login(payload);
    if (ObjectUtils.isEmpty(response)) {
      return toExceptionResult("Username hoặc Password sai", RETURN_CODE_ERROR);
    }
    return toSuccessResult(response);
  }

  @Operation(summary = "API login -  teacher - student")
  @PostMapping("/change-password")
  public ResponseEntity<?> changePassword(@RequestBody ChangePasswordPayload payload) {
    AuthenticationResponse response = authService.changePassword(payload);

    if (ObjectUtils.isEmpty(response)) {
      return toExceptionResult("Thay đổi mật khẩu thất bại", RETURN_CODE_ERROR);
    }
    return toSuccessResult(response);
  }
}
