package com.example.demo.controller;

import com.example.demo.domain.dto.AuthenticationResponse;
import com.example.demo.domain.dto.InsertFieldDTO;
import com.example.demo.domain.model.ProcessFileImport;
import com.example.demo.repo.ProcessFileImportRepo;
import com.example.demo.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;

@RestController
@RequestMapping("/file")
@Slf4j
public class FileController extends CommonController{
  private final ProcessFileImportRepo processFileImportRepo;
  private final FileService fileService;
  @Value("${upload.file.path}")
  private String filePath;

  public FileController(FileService fileService,
                        ProcessFileImportRepo processFileImportRepo) {
    this.fileService = fileService;
    this.processFileImportRepo = processFileImportRepo;
  }

  @Operation(summary = "API lấy trạng thái các file ã upload")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
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

  @Operation(summary = "API download file")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @GetMapping("/download-file")
  public ResponseEntity<?> downloadFile(@RequestParam(value = "idFile") Long idFile){
    try {
      ProcessFileImport processFileImport = processFileImportRepo.getProcessFileById(idFile);
      Assert.notNull(processFileImport, "File download does not exits");
      File file = new File(filePath+"/"+processFileImport.getKeyRequest());
      InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
      return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + processFileImport.getKeyRequest())
          .contentLength(processFileImport.getFileContent().length)
          .contentType(MediaType.APPLICATION_OCTET_STREAM)
          .body(resource);
    } catch (Exception ex){
      log.error(ex.getMessage(), ex);
      return toExceptionResult(ex.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API upload file")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @PostMapping(value = "/upload-file")
  ResponseEntity<?> uploadFile(@RequestBody MultipartFile file){
    try{
      return toSuccessResult(fileService.uploadFile(file, file.getBytes()));
    } catch (Exception e){
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API insert field mapping")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Success",
          content = {@Content(mediaType = "application/json",
              schema = @Schema(implementation = AuthenticationResponse.class))}),
      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
          content = @Content)
  })
  @PostMapping(value = "/insert-field")
  ResponseEntity<?> insertField(@RequestBody InsertFieldDTO insertFieldDTO, @RequestParam(value = "typeInsert") Integer typeInsert){
    try{
      return toSuccessResult(fileService.insertField(insertFieldDTO, typeInsert));
    } catch (Exception e){
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }
}
