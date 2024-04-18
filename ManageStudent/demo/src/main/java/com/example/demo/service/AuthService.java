package com.example.demo.service;

import com.example.demo.domain.dto.AuthenticationPayload;
import com.example.demo.domain.dto.AuthenticationResponse;

public interface AuthService {
  AuthenticationResponse login(AuthenticationPayload payload);
}
