package com.example.demo.service;

import com.example.demo.domain.dto.AuthenticationPayload;
import com.example.demo.domain.dto.AuthenticationResponse;
import com.example.demo.domain.dto.ChangePasswordPayload;

public interface AuthService {
  AuthenticationResponse login(AuthenticationPayload payload);
  AuthenticationResponse changePassword(ChangePasswordPayload payload);
}
