package com.example.demo.service.impl;

import com.example.demo.domain.dto.SearchProcessDTO;
import com.example.demo.domain.model.ProcessFileImport;
import com.example.demo.repo.ProcessFileImportRepo;
import com.example.demo.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FileServiceImpl implements FileService {
  private final ProcessFileImportRepo processFileImportRepo;
  @Value("${upload.file.path}")
  private String filePath;

  public FileServiceImpl(ProcessFileImportRepo processFileImportRepo) {
    this.processFileImportRepo = processFileImportRepo;
  }

  @Override
  public Page<SearchProcessDTO> queryProcess(Integer pageIndex, Integer pageSize) {
    List<SearchProcessDTO> result = new ArrayList<>();
    List<ProcessFileImport> allFile = processFileImportRepo.findAllByStatusInOrderByCreateDatetimeDesc(List.of(0, 1, 2, 3, -1));
    for (ProcessFileImport processFileImport : allFile) {
      result.add(SearchProcessDTO.builder()
          .id(processFileImport.getId())
          .fileName(processFileImport.getKeyRequest())
          .createDatetime(processFileImport.getCreateDatetime())
          .status(processFileImport.getStatus())
          .build());
    }
    Pageable pageRequest = PageRequest.of(pageIndex - 1, pageSize);
    int start = (int) pageRequest.getOffset();
    int end = Math.min(start + pageRequest.getPageSize(), result.size());
    List<SearchProcessDTO> pageContent = result.subList(start, end);

    return new PageImpl<>(pageContent, pageRequest, result.size());
  }

  @Override
  public ResponseEntity<?> downloadFile(Long idFile) throws FileNotFoundException {
      ProcessFileImport processFileImport = processFileImportRepo.getById(idFile);
      Assert.notNull(processFileImport, "File download does not exits");
      File file = new File(filePath+"/"+processFileImport.getKeyRequest());
      InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
      return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + processFileImport.getKeyRequest())
          .contentLength(processFileImport.getFileContent().length)
          .contentType(MediaType.APPLICATION_OCTET_STREAM)
          .body(resource);
  }
}
