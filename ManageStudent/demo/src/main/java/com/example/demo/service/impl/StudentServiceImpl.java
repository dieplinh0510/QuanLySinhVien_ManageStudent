package com.example.demo.service.impl;

import com.example.demo.domain.dto.DetailStudentDTO;
import com.example.demo.domain.dto.StudentPointDTO;
import com.example.demo.domain.dto.StudentPointInClassroomDTO;
import com.example.demo.domain.dto.StudentSemesterDTO;
import com.example.demo.domain.model.*;
import com.example.demo.repo.*;
import com.example.demo.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Transactional
@Service
public class StudentServiceImpl implements StudentService {
  private final StudentRepo studentRepo;
  private final StudentInSemesterRepo studentInSemesterRepo;
  private final ClassroomRepo classroomRepo;
  private final CourseRepo courseRepo;
  private final StudentInClassroomSubjectRepo studentInClassroomSubjectRepo;
  private final ClassroomSubjectRepo classroomSubjectRepo;
  private final SubjectRepo subjectRepo;
  private final SemesterRepo semesterRepo;

  public StudentServiceImpl(StudentRepo studentRepo, StudentInSemesterRepo studentInSemesterRepo, ClassroomRepo classroomRepo, CourseRepo courseRepo, StudentInClassroomSubjectRepo studentInClassroomSubjectRepo, ClassroomSubjectRepo classroomSubjectRepo, SubjectRepo subjectRepo, SemesterRepo semesterRepo) {
    this.studentRepo = studentRepo;
    this.studentInSemesterRepo = studentInSemesterRepo;
    this.classroomRepo = classroomRepo;
    this.courseRepo = courseRepo;
    this.studentInClassroomSubjectRepo = studentInClassroomSubjectRepo;
    this.classroomSubjectRepo = classroomSubjectRepo;
    this.subjectRepo = subjectRepo;
    this.semesterRepo = semesterRepo;
  }

  @Override
  public StudentPointDTO getStudentByStudentCode(String studentCode) {
    Student student = studentRepo.getStudentByStudentCode(studentCode);
    Assert.notNull(student, "Student is null");
    Classroom classroom = classroomRepo.getClassroomByClassroomId(student.getIdClass());
    Course course = courseRepo.getCourseByCourseId(classroom.getIdCourse());
    Double point = studentInSemesterRepo.getAccumulatedPointsByStudentId(student.getId());
    Integer countPoint = studentInSemesterRepo.countAccumulatedPointsByStudentId(student.getId());
    return StudentPointDTO.builder()
        .studentCode(student.getStudentCode())
        .studentName(student.getStudentName())
        .classroomName(classroom.getNameClass())
        .courseName(course!=null ? course.getNameCourse() : null)
        .accumulatedPoints(point!=null ? Math.ceil(point/countPoint * 100)/100 : null)
        .build();
  }

  @Override
  public List<StudentPointDTO> getStudentByClassroom(Long courseId, Long classroomId) {
    Assert.notNull(classroomId, "Classroom is null");
    Assert.notNull(courseId, "Course is null");
    List<Student> listStudent = studentRepo.getStudentByClassroomId(classroomId);
    Classroom classroom = classroomRepo.getClassroomByClassroomId(classroomId);
    Course course = courseRepo.getCourseByCourseId(courseId);
    List<StudentPointDTO> studentPointDTOList = new ArrayList<>();
    for (Student item: listStudent) {
      Double point = studentInSemesterRepo.getAccumulatedPointsByStudentId(item.getId());
      StudentPointDTO studentPointDTO = StudentPointDTO.builder()
          .studentCode(item.getStudentCode())
          .accumulatedPoints(point)
          .studentName(item.getStudentName())
          .classroomName(classroom!=null ? classroom.getNameClass() : null)
          .courseName(course!=null ? course.getNameCourse() : null)
          .build();
      studentPointDTOList.add(studentPointDTO);
    }
    return studentPointDTOList;
  }

  @Override
  public List<StudentPointDTO> getStudentByPoint(Double pointStart, Double pointEnd) {
    Assert.notNull(pointStart, "Point is null");
    Assert.notNull(pointEnd, "Point is null");
    List<StudentPointDTO> studentPointDTOList = new ArrayList<>();
    List<StudentInSemester> studentInSemesters = studentInSemesterRepo.getStudentInSemesterByPoint(pointStart, pointEnd);
    for (StudentInSemester studentInSemester : studentInSemesters) {
      Student student = studentRepo.getById(studentInSemester.getStudentId());
      Classroom classroom = classroomRepo.getClassroomByClassroomId(student.getIdClass());
      Course course = courseRepo.getCourseByCourseId(classroom.getIdCourse());
      boolean check = false;
      for (StudentPointDTO item : studentPointDTOList) {
        if (item.getStudentCode().equals(student.getStudentCode())) {
          check = true;
          break;
        }
      }
      if (!check) {
        StudentPointDTO studentPointDTO = StudentPointDTO.builder()
            .studentCode(student.getStudentCode())
            .classroomName(classroom.getNameClass())
            .courseName(course != null ? course.getNameCourse() : null)
            .studentName(student.getStudentName())
            .accumulatedPoints(Math.ceil(studentInSemester.getAccumulatedPoints() * 100) / 100)
            .build();
        studentPointDTOList.add(studentPointDTO);
      }

    }
    return studentPointDTOList;
  }

  @Override
  public List<DetailStudentDTO> getSubjectInStudent(String studentCode) {
    Student student = studentRepo.getStudentByStudentCode(studentCode);
    List<StudentInClassroomSubject> studentSubject = studentInClassroomSubjectRepo.findByStudentId(student.getId());
    List<DetailStudentDTO> detailStudentDTOList = new ArrayList<>();
    for (StudentInClassroomSubject item: studentSubject) {
      Long subjectId = studentInClassroomSubjectRepo.getIdSubject(item.getIdClassroomInSubject(), item.getIdStudent());
      Subject subject = subjectRepo.findById(subjectId).get();
      String classroomCode = studentInClassroomSubjectRepo.getClassroomCode(item.getIdClassroomInSubject(), item.getIdStudent());
      double mediumPoint = 0.0;
      if (item.getRegularPointOne() != null && item.getRegularPointTwo() != null &&  item.getMidtermPointOne() != null){
        mediumPoint = Math.ceil(((item.getRegularPointOne() + item.getRegularPointTwo())/2 + item.getMidtermPointOne()*2)/3 * 100)/100;
      }
      double accumulatedPoint = 0;
      if (item.getRegularPointOne() != null && item.getRegularPointTwo() != null && item.getMidtermPointOne() != null && item.getTestPointOne()!=null){
        accumulatedPoint = Math.ceil((mediumPoint + item.getTestPointOne()*2)/3 * 100)/100;
      }
      double point = accumulatedPoint/2.5;
     DetailStudentDTO detailStudentDTO = DetailStudentDTO.builder()
         .studentInClassroomSubject(item)
         .subjectName(subject.getSubjectName())
         .classroomCode(classroomCode)
         .mediumPoint(Math.ceil(mediumPoint))
         .accumulated_point(accumulatedPoint)
         .point(Math.ceil(point*100)/100)
         .build();
      detailStudentDTOList.add(detailStudentDTO);
    }
    return detailStudentDTOList;
  }

  @Override
  public List<StudentSemesterDTO> getAccumulatedPointByStudentCode(String studentCode) {
    Student student = studentRepo.getStudentByStudentCode(studentCode);
    List<Semester> semesters= semesterRepo.getAllSemester();
    List<StudentSemesterDTO> studentSemesterDTOS = new ArrayList<>();
    for (Semester item: semesters) {
      Integer sumCredit = 0;
      double point = 0.0;
      List<Subject> listIdSubject = subjectRepo.getIdSubjectBySemesterAndStudent(item.getId(), student.getId());
      for (Subject subject: listIdSubject){
        sumCredit+=subject.getNumberOfCredits();
        StudentInClassroomSubject studentSubject = studentInClassroomSubjectRepo.getListByIdSubject(subject.getId()).get(0);
        double accumulatedPoint = 0.0;
        if (studentSubject.getRegularPointOne() != null && studentSubject.getRegularPointTwo() != null && studentSubject.getMidtermPointOne() != null && studentSubject.getTestPointOne()!=null){
          accumulatedPoint = Math.ceil((((studentSubject.getRegularPointOne() + studentSubject.getRegularPointTwo())/2 + studentSubject.getMidtermPointOne()*2)/3 + studentSubject.getTestPointOne()*2)/3 * 100)/100;
        }
        point += accumulatedPoint*subject.getNumberOfCredits();
      }
      StudentSemesterDTO studentSemesterDTO = StudentSemesterDTO.builder()
          .idSemester(item.getId()).sumCredit(sumCredit).accumulatedPoint(Math.ceil(point/sumCredit/2.5*100)/100).build();
      studentSemesterDTOS.add(studentSemesterDTO);

      studentInSemesterRepo.deleteStudentIdAndSemesterId(item.getId(), student.getId());
      StudentInSemester studentInSemester = StudentInSemester.builder().semesterId(item.getId()).studentId(student.getId()).build();
      studentInSemesterRepo.save(studentInSemester);
    }
    return studentSemesterDTOS;
  }

  @Override
  public Student createStudent(StudentPointDTO studentPointDTO) {
    Assert.notNull(studentPointDTO.getStudentCode(), "Student code is null");
    Assert.notNull(studentPointDTO.getStudentName(), "Student name is null");
    Assert.notNull(studentPointDTO.getIdClass(), "Class is null");
    Assert.notNull(studentPointDTO.getIdCourse(), "Course is null");
    Assert.notNull(studentPointDTO.getStudentImage(), "Student Image is null");
    Student student = studentRepo.getStudentByStudentCode(studentPointDTO.getStudentCode());
    Assert.isNull(student, "Student already exits");
      Student studentNew = Student.builder()
          .studentCode(studentPointDTO.getStudentCode())
          .studentImage(studentPointDTO.getStudentImage())
          .studentName(studentPointDTO.getStudentName())
          .idClass(studentPointDTO.getIdClass())
          .createDatetime(LocalDateTime.now())
          .build();
    return studentRepo.save(studentNew);
  }

  @Override
  public Student changeStudent(StudentPointDTO studentPointDTO) {
    Assert.notNull(studentPointDTO.getStudentCode(), "Student code is null");
    Assert.notNull(studentPointDTO.getStudentName(), "Student name is null");
    Assert.notNull(studentPointDTO.getIdClass(), "Class is null");
    Assert.notNull(studentPointDTO.getIdCourse(), "Course is null");
    Assert.notNull(studentPointDTO.getStudentImage(), "Student Image is null");
    Student student = studentRepo.getStudentByStudentCode(studentPointDTO.getStudentCode());
    Assert.notNull(student, "Student does not exits");
    student.setStudentCode(studentPointDTO.getStudentCode());
    student.setStudentName(studentPointDTO.getStudentName());
    student.setStudentImage(studentPointDTO.getStudentImage());
    student.setIdClass(studentPointDTO.getIdClass());
    student.setUpdateDatetime(LocalDateTime.now());
    return studentRepo.save(student);
  }

  @Override
  public Boolean deleteStudent(String studentCode) {
    /// chưa delete dữ liệu  các table khác với student Code
    Assert.notNull(studentCode, "Student code is null");
    Student student = studentRepo.getStudentByStudentCode(studentCode);
    Assert.notNull(student, "Student does not exits");
    studentRepo.delete(student);
    return true;
  }

  @Override
  public List<StudentPointInClassroomDTO> viewPointInClassroom(String classroomCode) {
    List<StudentPointInClassroomDTO> listStudent = new ArrayList<>();
    List<StudentInClassroomSubject> listStudentInClass = studentInClassroomSubjectRepo.getStudentInClassroomSubjectsByClassroomCode(classroomCode);
    for (StudentInClassroomSubject item: listStudentInClass) {
      Student student = studentRepo.getById(item.getIdStudent());
      double mediumPoint = 0.0;
      if (item.getRegularPointOne() != null && item.getRegularPointTwo() != null &&  item.getMidtermPointOne() != null){
        mediumPoint = Math.ceil(((item.getRegularPointOne() + item.getRegularPointTwo())/2 + item.getMidtermPointOne()*2)/3 * 100)/100;
      }
      double accumulatedPoint = 0;
      if (item.getRegularPointOne() != null && item.getRegularPointTwo() != null && item.getMidtermPointOne() != null && item.getTestPointOne()!=null){
        accumulatedPoint = Math.ceil((mediumPoint + item.getTestPointOne()*2)/3 * 100)/100;
      }
      double point = accumulatedPoint/2.5;
      StudentPointInClassroomDTO studentDTO = StudentPointInClassroomDTO.builder()
          .id(item.getId())
          .studentCode(student.getStudentCode())
          .studentName(student.getStudentName())
          .regularPointOne(item.getRegularPointOne())
          .regularPointTwo(item.getRegularPointTwo())
          .midtermPointOne(item.getMidtermPointOne())
          .testPointOne(item.getTestPointOne())
          .mediumPoint(Math.ceil(mediumPoint))
          .testPointOne(Math.ceil(point))
          .build();
      listStudent.add(studentDTO);
    }
    return listStudent;
  }

  @Override
  public StudentPointInClassroomDTO changePointInClassroom(StudentPointInClassroomDTO studentPointInClassroomDTO) {
    StudentInClassroomSubject studentInClassroomSubject = studentInClassroomSubjectRepo.getById(studentPointInClassroomDTO.getId());
    StudentPointInClassroomDTO studentDTO = studentPointInClassroomDTO;
    if (studentInClassroomSubject!=null){
      studentInClassroomSubject.setRegularPointOne(studentPointInClassroomDTO.getRegularPointOne());
      studentInClassroomSubject.setRegularPointTwo(studentPointInClassroomDTO.getRegularPointTwo());
      studentInClassroomSubject.setMidtermPointOne(studentPointInClassroomDTO.getMidtermPointOne());
      studentInClassroomSubject.setTestPointOne(studentPointInClassroomDTO.getTestPointOne());
      studentInClassroomSubjectRepo.save(studentInClassroomSubject);

      double mediumPoint = 0.0;
      if (studentInClassroomSubject.getRegularPointOne() != null && studentInClassroomSubject.getRegularPointTwo() != null &&  studentInClassroomSubject.getMidtermPointOne() != null){
        mediumPoint = Math.ceil(((studentInClassroomSubject.getRegularPointOne() + studentInClassroomSubject.getRegularPointTwo())/2 + studentInClassroomSubject.getMidtermPointOne()*2)/3 * 100)/100;
      }
      double accumulatedPoint = 0;
      if (studentInClassroomSubject.getRegularPointOne() != null && studentInClassroomSubject.getRegularPointTwo() != null && studentInClassroomSubject.getMidtermPointOne() != null && studentInClassroomSubject.getTestPointOne()!=null){
        accumulatedPoint = Math.ceil((mediumPoint + studentInClassroomSubject.getTestPointOne()*2)/3 * 100)/100;
      }
      double point = accumulatedPoint/2.5;
      studentDTO.setRegularPointOne(studentPointInClassroomDTO.getRegularPointOne());
      studentDTO.setRegularPointTwo(studentPointInClassroomDTO.getRegularPointTwo());
      studentDTO.setMidtermPointOne(studentPointInClassroomDTO.getMidtermPointOne());
      studentDTO.setTestPointOne(studentPointInClassroomDTO.getTestPointOne());
      studentDTO.setMediumPoint(Math.ceil(mediumPoint));
      studentDTO.setAccumulated_point(Math.ceil(point));

    }
    return studentDTO;
  }

  @Override
  public void deleteStudentInClass(Long studentClassId) {
    studentInClassroomSubjectRepo.delete(studentInClassroomSubjectRepo.getById(studentClassId));
  }

  @Override
  public HashMap<String, String> getColumnForInputPoint() {
    HashMap<String, String> fields = new HashMap<>();
    fields.put("studentCode", "Mã sinh viên");
    fields.put("studentName", "Họ tên");
    fields.put("regularPointOne", "Điểm thường xuyên 1");
    fields.put("regularPointTwo", "Điểm thường xuyên 2");
    fields.put("midtermPointOne", "Điểm giữa kỳ");
    fields.put("testPointOne", "Điểm thi");
    return fields;
  }

  @Override
  public HashMap<String, String> getColumnForInput() {
    HashMap<String, String> fields = new HashMap<>();
    fields.put("studentCode", "Mã sinh viên");
    fields.put("studentName", "Họ tên");
    fields.put("id_course", "Khóa");
    fields.put("id_class", "Lớp");
    fields.put("student_image", "Ảnh");
    return fields;
  }
}