import HttpService from '../utils/http-service';

// API get all teacher
export const searchTeachers = async (payload) => {
  let response = await HttpService.get('/users/search - admin', {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, null);
};

// API create teacher
export const createTeacher = async (payload) => {
  let response = await HttpService.post('/users', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, null, "Tạo mới giảng viên thành công");
};

// API update teacher
export const updateTeacher = async (payload) => {
  let response = await HttpService.put('/users', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, null, "Cập nhật giảng viên thành công");
};

// API get all my class
export const searchMyClasses = async (payload) => {
  let response = await HttpService.get('/classroom-subject/user', {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, null);
};