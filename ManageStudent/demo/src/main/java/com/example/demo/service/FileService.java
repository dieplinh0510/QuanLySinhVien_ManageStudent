package com.example.demo.service;

import com.example.demo.domain.dto.SearchProcessDTO;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.io.FileNotFoundException;

public interface FileService {
  Page<SearchProcessDTO> queryProcess(Integer pageIndex, Integer pageSize);
  ResponseEntity<?> downloadFile(Long idFile) throws FileNotFoundException;
}
