package com.example.demo.controller;

import com.example.demo.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;

@RestController
@RequestMapping("/file")
@Slf4j
public class FileController extends CommonController{
  private final FileService fileService;

  public FileController(FileService fileService) {
    this.fileService = fileService;
  }

  @GetMapping("/process-file")
  public ResponseEntity<?> getAllProcessFile(@RequestParam(value = "pageIndex") Integer pageIndex,
                                             @RequestParam(value = "pageSize") Integer pageSize) {
    try {
      return toSuccessResult(fileService.queryProcess(pageIndex, pageSize));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/download-file")
  public ResponseEntity<?> downloadFile(@RequestParam(value = "idFile") Long idFile){
    try {
      return toSuccessResult(fileService.downloadFile(idFile));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }
}
