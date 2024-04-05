package com.example.demo.service.impl;

import com.example.demo.domain.dto.DetailStudentDTO;
import com.example.demo.domain.dto.StudentPointDTO;
import com.example.demo.domain.model.*;
import com.example.demo.repo.*;
import com.example.demo.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
  private final StudentRepo studentRepo;
  private final StudentInSemesterRepo studentInSemesterRepo;
  private final ClassroomRepo classroomRepo;
  private final CourseRepo courseRepo;
  private final StudentInClassroomSubjectRepo studentInClassroomSubjectRepo;
  private final ClassroomSubjectRepo classroomSubjectRepo;
  private final SubjectRepo subjectRepo;

  public StudentServiceImpl(StudentRepo studentRepo, StudentInSemesterRepo studentInSemesterRepo, ClassroomRepo classroomRepo, CourseRepo courseRepo, StudentInClassroomSubjectRepo studentInClassroomSubjectRepo, ClassroomSubjectRepo classroomSubjectRepo, SubjectRepo subjectRepo) {
    this.studentRepo = studentRepo;
    this.studentInSemesterRepo = studentInSemesterRepo;
    this.classroomRepo = classroomRepo;
    this.courseRepo = courseRepo;
    this.studentInClassroomSubjectRepo = studentInClassroomSubjectRepo;
    this.classroomSubjectRepo = classroomSubjectRepo;
    this.subjectRepo = subjectRepo;
  }

  @Override
  public StudentPointDTO getStudentByStudentCode(String studentCode) {
    Student student = studentRepo.getStudentByStudentCode(studentCode);
    Assert.notNull(student, "Student is null");
    Classroom classroom = classroomRepo.getClassroomByClassroomId(student.getIdClass());
    Course course = courseRepo.getCourseByCourseId(classroom.getIdCourse());
    Double point = studentInSemesterRepo.getAccumulatedPointsByStudentId(student.getId());
    Integer countPoint = studentInSemesterRepo.countAccumulatedPointsByStudentId(student.getId());
    StudentPointDTO studentPointDTO = StudentPointDTO.builder()
        .studentCode(student.getStudentCode())
        .studentName(student.getStudentName())
        .classroomName(classroom!=null ? classroom.getNameClass() : null)
        .courseName(course!=null ? course.getNameCourse() : null)
        .accumulatedPoints(point!=null ? Math.ceil(point/countPoint * 100)/100 : null)
        .build();
    return studentPointDTO;
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
          .accumulatedPoints(point!=null ? point : null)
          .studentName(item.getStudentName())
          .classroomName(classroom!=null ? classroom.getNameClass() : null)
          .courseName(course!=null ? course.getNameCourse() : null)
          .build();
      studentPointDTOList.add(studentPointDTO);
    }
    return studentPointDTOList;
  }

  @Override
  public List<StudentPointDTO> getStudentByPoint(Double pointOne, Double pointTwo) {
    Assert.notNull(pointOne, "Point is null");
    Assert.notNull(pointTwo, "Point is null");
    List<StudentPointDTO> studentPointDTOList = new ArrayList<>();
    List<StudentInSemester> studentInSemesters = studentInSemesterRepo.getStudentInSemesterByPoint(pointOne, pointTwo);
    for (int i=0; i<studentInSemesters.size(); i++) {
        Student student = studentRepo.getById(studentInSemesters.get(i).getStudentId());
        Classroom classroom = classroomRepo.getClassroomByClassroomId(student.getIdClass());
        Course course = courseRepo.getCourseByCourseId(classroom.getIdCourse());
        boolean check = false;
        for (StudentPointDTO item : studentPointDTOList){
          if (item.getStudentCode().equals(student.getStudentCode())){
            check = true;
          }
        }
        if (!check){
          StudentPointDTO studentPointDTO = StudentPointDTO.builder()
              .studentCode(student.getStudentCode())
              .classroomName(classroom!=null ? classroom.getNameClass() : null)
              .courseName(course!=null ? course.getNameCourse() : null)
              .studentName(student.getStudentName())
              .accumulatedPoints(Math.ceil(studentInSemesters.get(i).getAccumulatedPoints() * 100)/100)
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
      Double mediumPoint = null;
      if (item.getRegularPointOne() != null && item.getRegularPointTwo() != null &&  item.getMidtermPointOne() != null){
        mediumPoint = Math.ceil(((item.getRegularPointOne() + item.getRegularPointTwo())/2 + item.getMidtermPointOne()*2)/3 * 100)/100;
      }
      Double accumulatedPoint = null;
      if (item.getRegularPointOne() != null && item.getRegularPointTwo() != null && item.getMidtermPointOne() != null && item.getTestPointOne()!=null){
        accumulatedPoint = Math.ceil((mediumPoint + item.getTestPointOne()*2)/3 * 100)/100;
      }
      Double point = null;
      point = accumulatedPoint/2.5;
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
}
