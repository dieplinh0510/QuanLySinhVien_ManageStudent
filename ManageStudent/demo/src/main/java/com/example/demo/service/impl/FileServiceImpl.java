package com.example.demo.service.impl;

import com.example.demo.domain.dto.InsertFieldDTO;
import com.example.demo.domain.dto.SearchProcessDTO;
import com.example.demo.domain.model.ProcessFileImport;
import com.example.demo.domain.model.User;
import com.example.demo.repo.ProcessFileImportRepo;
import com.example.demo.service.FileService;
import com.example.demo.service.StudentService;
import com.example.demo.utils.SecurityUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FileServiceImpl implements FileService {
  private final ProcessFileImportRepo processFileImportRepo;
  private final StudentService studentService;
  @Value("${upload.file.path}")
  private String filePath;

  public FileServiceImpl(ProcessFileImportRepo processFileImportRepo, StudentService studentService) {
    this.processFileImportRepo = processFileImportRepo;
    this.studentService = studentService;
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
  public Long uploadFile(MultipartFile file, byte[] fileContent) throws Exception {
    User user = SecurityUtil.getCurrentUserLogin();
    if (user == null){
      throw new Exception(HttpStatus.UNAUTHORIZED.toString());
    }
    String[] str = Objects.requireNonNull(file.getOriginalFilename()).split("\\.");
    String filename = String.format("%s(%s).%s", Arrays.stream(str).filter(item -> !item.equals(str[str.length - 1])).collect(Collectors.joining(".")),
        UUID.randomUUID(), str[str.length - 1]);
    try {
      ProcessFileImport process = ProcessFileImport.builder()
          .createDatetime(LocalDateTime.now())
          .fileContent(fileContent)
          .filePath(filePath)
          .status(0)
          .keyRequest(filename)
          .createUser(user.getUsername())
          .build();
      processFileImportRepo.save(process);
      FileCopyUtils.copy(fileContent, new File(filePath, filename));
      return process.getId();
    } catch (IOException e) {
      e.printStackTrace();
      throw new IOException(e.getMessage());
    }
  }

  @Override
  public boolean insertField(InsertFieldDTO insertFieldDTO, Integer typeInsert) throws Exception {
    Optional<ProcessFileImport> processFileImport = processFileImportRepo.findById(insertFieldDTO.getId());
    User user = SecurityUtil.getCurrentUserLogin();
    if (user == null){
      throw new Exception(HttpStatus.UNAUTHORIZED.toString());
    }

    if (processFileImport.get() != null) {
      if (typeInsert == 1){
        processFileImport.get().setMapField(new ObjectMapper().writeValueAsString(insertFieldDTO.getMapFields()));
        processFileImport.get().setSchema("manage_student");
        processFileImport.get().setTable("student_in_classroom_subjects");
        processFileImport.get().setStatus(1);
        processFileImport.get().setType(1L);
        processFileImport.get().setUpdateDatetime(LocalDateTime.now());
        processFileImport.get().setUpdateUser(user.getUsername());
        processFileImportRepo.save(processFileImport.get());
        return true;
      }
      if (typeInsert == 2){
        processFileImport.get().setMapField(new ObjectMapper().writeValueAsString(insertFieldDTO.getMapFields()));
        processFileImport.get().setSchema("manage_student");
        processFileImport.get().setTable("students");
        processFileImport.get().setStatus(1);
        processFileImport.get().setType(2L);
        processFileImport.get().setUpdateUser(user.getUsername());
        processFileImport.get().setUpdateDatetime(LocalDateTime.now());
        processFileImportRepo.save(processFileImport.get());
        return true;
      }
    }
    return false;
  }

  @Override
  public void importFile(ProcessFileImport processFileImport) throws IOException {
    String schema = processFileImport.getSchema();
    String table = processFileImport.getTable();
    String mapFieldsStr = processFileImport.getMapField();
    String fileName = "result_" + processFileImport.getKeyRequest();
    byte[] data = processFileImport.getFileContent();
    Long type = processFileImport.getType();

    InputStream is = new BufferedInputStream(new ByteArrayInputStream(data));
    XSSFWorkbook wb = new XSSFWorkbook(is);

    boolean checkField = true;
    Sheet sheet = wb.getSheetAt(0);
    HashMap<String, String> mapFields = new ObjectMapper().readValue(mapFieldsStr, HashMap.class);
    mapFields.entrySet().removeIf(e -> !StringUtils.hasText(e.getValue()));

    HashMap<Integer, String> columnFile = new HashMap<>();
    HashMap<String, String> columnTable = studentService.getColumnForInput();
    HashSet<String> mapFieldFile = new HashSet<>(mapFields.keySet());
    if (type == 2){
      try {
        for (Row row : sheet) {
          if (checkField) {
            for (int i = 0; i < row.getLastCellNum(); i++) {
              Cell cell = row.getCell(i);
              if (mapFieldFile.contains(cell.getStringCellValue()))
                columnFile.put(i, row.getCell(i).getStringCellValue());

            }
//            Assert.isTrue(new HashSet<>(columnTable.keySet()).containsAll(new HashSet<>(mapFields.values())), "Primary key not found");
            row.createCell(row.getLastCellNum()).setCellValue("Import result");
            row.createCell(row.getLastCellNum()).setCellValue("Description");
            checkField = false;
            continue;
          }
          StringBuilder columnQuery = new StringBuilder(" ( ");
          StringBuilder valuesQuery = new StringBuilder(" value ( ");
          boolean checkFirst = true;
          int i;
          for (i = 0; i < row.getLastCellNum(); i++) {

          }

          try {

            row.createCell(i).setCellValue("Import data success");
          } catch (Exception ex) {
            row.createCell(i++).setCellValue("Import date fail");
            row.createCell(i).setCellValue(ex.getMessage());
          }
        }
        is.close();
        String[] validateName = fileName.replaceAll(" ", "").split("\\.+\\w+$");
        log.info("File name {} ", Arrays.toString(validateName));
        Assert.isTrue(validateName.length != 0, "Filename is null");
        StringBuilder name = new StringBuilder(fileName);
        ByteArrayOutputStream boas = new ByteArrayOutputStream();
        wb.write(boas);
        wb.close();

        InputStream fis = new ByteArrayInputStream(IOUtils.toByteArray(new ByteArrayInputStream(boas.toByteArray())));
        FileCopyUtils.copy(fis.readAllBytes(), new File(filePath, String.valueOf(name)));


        processFileImport.setStatus(2);
        processFileImport.setKeyResponse(name.toString());
        processFileImport.setUpdateUser("PROCESS");
        processFileImport.setUpdateDatetime(LocalDateTime.now());
      } catch (Exception e) {
        processFileImport.setStatus(3);
        processFileImport.setDiscription(e.getMessage());
        processFileImport.setUpdateUser("PROCESS");
        processFileImport.setUpdateDatetime(LocalDateTime.now());
        processFileImportRepo.save(processFileImport);
      }
  }
  }
}
