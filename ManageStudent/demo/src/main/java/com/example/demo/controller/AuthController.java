package com.example.demo.controller;

import com.example.demo.domain.dto.AuthenticationPayload;
import com.example.demo.domain.dto.AuthenticationResponse;
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

  @Operation(summary = "API login")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid AuthenticationPayload payload) {
    AuthenticationResponse response = authService.login(payload);
    if (ObjectUtils.isEmpty(response)) {
      return toExceptionResult("Username hoặc Password sai", RETURN_CODE_ERROR);
    }
    return toSuccessResult(response);
  }

//  @PostMapping("/auth/change-password")
//  public ResponseEntity<?> changePassword(@RequestBody ChangePasswordPayload payload) {
//    Boolean res = authService.changePassword(payload);
//
//    if (!res) {
//      return VsResponseUtil.error(HttpStatus.BAD_REQUEST, "Invalid old password");
//    }
//    return VsResponseUtil.ok(true);
//  }
}
