import HttpService from '../utils/http-service';
import { toast } from 'react-toastify';

export const getListClassByCourseId = async (payload) => {
  let response = await HttpService.get('/classroom/course', {
    params: payload,
  });
  return response?.data?.data;
};

// API get all class by subjectId
export const getListClassBySubject = async (payload) => {
  let response = await HttpService.get('/classroom-subject/detail', {
    params: payload,
  });
  return response?.data?.data;
};


// API get all class
export const getAllClass = async () => {
  let response = await HttpService.get('/classroom-subject');
  return response?.data?.data;
};

// API create class in subject
export const createClassInSubject = async (payload) => {
  let response = await HttpService.post('/classroom-subject', {
    body: payload,
    params: {
      subjectId: payload.subjectId,
    }
  });

  return HttpService.checkResponseCommon(response, {}, "Thêm lớp học thành công");
};

// API edit class in subject
export const editClassInSubject = async (payload) => {
  console.log(payload)
  let response = await HttpService.put(`/classroom-subject?classroomId=${payload.id}`, {
    body: payload,
  });
  return HttpService.checkResponseCommon(response, {}, "Sửa lớp học thành công");
};

// API get all teachers
export const getAllTeachers = async () => {
  let response = await HttpService.get('/users');
  let output = [];
  let arr = response?.data?.data;
  if (arr && arr.length > 0) {
    output = arr.map((item) => {
      return {
        value: item.idUser,
        label: item.teacherName,
      };
    });
  }

  return output;
};

// Search class in subject by classroomCode
export const searchClassInSubject = async (payload) => {
  let response = await HttpService.get(`/classroom-subject/detail/${payload.subjectId}/${payload.classroomCode}`);

  if (response?.data?.code !== '200') {
    toast.error(response?.data?.description)
    return [];
  }

  return [response?.data?.data];
};

// API add student to class
export const addStudentToClass = async (payload) => {
  let response = await HttpService.post('/classroom-subject/students', {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, {}, 'Thêm thành công sinh viên vào lớp học');
};

// API get all student in class
export const getAllStudent = async (payload) => {
  let response = await HttpService.get('/students/view-point-class', {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, null);
};