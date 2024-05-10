package com.example.demo.controller;

import com.example.demo.domain.dto.*;
import com.example.demo.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.demo.common.Const.RETURN_CODE_ERROR;
import static com.example.demo.common.Const.RETURN_CODE_SUCCESS;

@RestController
@Slf4j
@RequestMapping("/students")
public class StudentController extends CommonController {
  private final StudentService studentService;

  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  @Operation(summary = "API lấy sinh viên by mã sinh viên")
  @GetMapping()
  public ResponseEntity<?> getStudentByStudentCode(@RequestParam(name = "studentCode") Long studentCode) {
    try {
      return toSuccessResult(studentService.getStudentByStudentCode(studentCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API lấy sinh viên by studentId")
  @GetMapping("/view/detail")
  public ResponseEntity<?> getStudentByStudentId(@RequestParam(name = "studentId") Long studentId) {
    try {
      return toSuccessResult(studentService.getStudentByStudentId(studentId));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }


//  @Operation(summary = "API lấy sinh vin by lớp và khóa học")
//  @ApiResponses(value = {
//      @ApiResponse(responseCode = "200", description = "Success",
//          content = {@Content(mediaType = "application/json",
//              schema = @Schema(implementation = AuthenticationResponse.class))}),
//      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
//          content = @Content)
//  })
//  @GetMapping("/classroom")
//  public ResponseEntity<?> getStudentByClassroom(@RequestParam(name = "courseId") Long courseId,
//                                                 @RequestParam(name = "classroomId") Long classroomId) {
//    try {
//      return toSuccessResult(studentService.getStudentByClassroom(courseId, classroomId));
//    } catch (Exception e) {
//      log.error(e.getMessage(), e);
//      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
//    }
//  }
//
//  @Operation(summary = "API lấy sinh viên by điểm tích lũy")
//  @ApiResponses(value = {
//      @ApiResponse(responseCode = "200", description = "Success",
//          content = {@Content(mediaType = "application/json",
//              schema = @Schema(implementation = AuthenticationResponse.class))}),
//      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
//          content = @Content)
//  })
//  @GetMapping("/point")
//  public ResponseEntity<?> getStudentByPoint(@RequestParam(name = "pointStart") Double pointStart,
//                                             @RequestParam(name = "pointEnd") Double pointEnd) {
//    try {
//      return toSuccessResult(studentService.getStudentByPoint(pointStart, pointEnd));
//    } catch (Exception e) {
//      log.error(e.getMessage(), e);
//      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
//    }
//  }


  @Operation(summary = "API tìm kiếm sinh viên - admin - teacher")
  @GetMapping("/search")
  public ResponseEntity<?> searchStudent(@RequestParam(name = "studentCode", required = false) String studentCode,
                                          @RequestParam(name = "courseId", required = false) Long courseId,
                                          @RequestParam(name = "classroomId", required = false) Long classroomId,
                                          @RequestParam(name = "pointStart", required = false) Double pointStart,
                                          @RequestParam(name = "pointEnd", required = false) Double pointEnd,
                                         @RequestParam(value = "pageIndex") Integer pageIndex,
                                         @RequestParam(value = "pageSize") Integer pageSize) {
    try {
      return toSuccessResult(studentService.searchStudent(studentCode, courseId, classroomId, pointStart, pointEnd, pageIndex, pageSize));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }


  @Operation(summary = "API lấy tất cả môn học của sinh viên màn xem thông tin chi tiết sinh viên - admin - teacher - student")
  @GetMapping("/detail/subject")
  public ResponseEntity<?> getSubjectInStudent(@RequestParam(name = "studentId") Long studentId,
                                               @RequestParam(value = "pageIndex") Integer pageIndex,
                                               @RequestParam(value = "pageSize") Integer pageSize) {
    try {
      return toSuccessResult(studentService.getSubjectInStudent(studentId, pageIndex, pageSize));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API lấy điểm tích lũy của sinh vin theo kỳ học - admin - teacher - student")
  @GetMapping("/semester/accumulated_point")
  public ResponseEntity<?> getAccumulatedPointByStudentCode(@RequestParam(name = "studentCode") Long studentCode) {
    try {
      return toSuccessResult(studentService.getAccumulatedPointByStudentCode(studentCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API tạo sinh viên - admin")

  @PostMapping()
  public ResponseEntity<?> createStudent(@ModelAttribute StudentDTO studentDTO) {
    try {
      return toSuccessResult(studentService.createStudent(studentDTO));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API sửa thông tin sinh viên - student")
  @PutMapping()
  public ResponseEntity<?> changeStudent(@ModelAttribute StudentDTO studentDTO) {
    try {
      return toSuccessResult(studentService.changeStudent(studentDTO));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }


  @Operation(summary = "API lấy tất cả sinh viên, điểm trong lớp học màn nhập điểm teacher ")
  @GetMapping("/view-point-class")
  public ResponseEntity<?> viewPointInClassroom(@RequestParam(name = "classroomCode") String classroomCode){
    try {
      return toSuccessResult(studentService.viewPointInClassroom(classroomCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API gui yeu cau sua diem cho admin - teacher")
  @PutMapping("/send-request/change-point-class")
  public ResponseEntity<?> sendRequestChangePointClass(@RequestParam (name = "classroomCode") String classroomCode){
    try {
      return toSuccessResult(studentService.sendRequestChangePointClass(classroomCode));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API sửa điểm sinh viên trong lớp học màn nhập điểm - teacher")
  @PutMapping("/change-point-class")
  public ResponseEntity<?> changePointClass(@RequestBody StudentPointInClassroomDTO studentPointInClassroomDTO){
    try {
      return toSuccessResult(studentService.changePointInClassroom(studentPointInClassroomDTO));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

//  @Operation(summary = "API xóa sinh viên trong màn nhập điểm")
//  @ApiResponses(value = {
//      @ApiResponse(responseCode = "200", description = "Success",
//          content = {@Content(mediaType = "application/json",
//              schema = @Schema(implementation = AuthenticationResponse.class))}),
//      @ApiResponse(responseCode = "400", description = "Invalid id username/password",
//          content = @Content)
//  })
//  @DeleteMapping("/delete-point-class")
//  public ResponseEntity<?> deleteStudentInClass(@RequestParam(value = "studentClassId") Long studentClassId){
//    try {
//      studentService.deleteStudentInClass(studentClassId);
//      return toSuccessResult(RETURN_CODE_SUCCESS);
//    } catch (Exception e) {
//      log.error(e.getMessage(), e);
//      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
//    }
//  }

  @Operation(summary = "API lấy các field để mapping trong màn nhập điểm - teacher")
  @GetMapping("/get-column/point")
  public ResponseEntity<?> getColumnForInputPoint(){
    try {
      return toSuccessResult(studentService.getColumnForInputPoint());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API lấy các field để mapping trong màn theem sinh viên")
  @GetMapping("/get-column")
  public ResponseEntity<?> getColumnForInput(){
    try {
      return toSuccessResult(studentService.getColumnForInput());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @Operation(summary = "API man dang ky lop hoc - student")
  @GetMapping("/view-subject-class/register")
  public ResponseEntity<?> viewSubjectClassRegister(@RequestParam (name = "subjectCode") String subjectCode,
                                                    @RequestParam(value = "pageIndex") Integer pageIndex,
                                                    @RequestParam(value = "pageSize") Integer pageSize){
    try {
      return toSuccessResult(studentService.viewSubjectClassRegister(subjectCode, pageIndex, pageSize));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

  @GetMapping("/view-subject/register")
  public ResponseEntity<?> viewSubjectRegister(@RequestParam(value = "pageIndex") Integer pageIndex,
                                               @RequestParam(value = "pageSize") Integer pageSize){
    try {
      return toSuccessResult(studentService.viewSubjectRegister(pageIndex, pageSize));
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return toExceptionResult(e.getMessage(), RETURN_CODE_ERROR);
    }
  }

}
