import HttpService from '../utils/http-service';

export const getAllStudent = async () => {
  return [];
};

export const search = async (payload) => {
  let response = await HttpService.get('/students/search', {
    params: {
      ...payload,
      studentCode: payload.studentCode || null,
    },
  });
  return response?.data?.data;
};

export const createStudent = async (payload) => {
  let response = await HttpService.post('/students', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, [], 'Create student success');
};

export const editStudent = async (payload) => {
  let response = await HttpService.put('/students', {
    body: payload,
  });

  return HttpService.checkResponseCommon(response, [], 'Edit student success');
};

export const deleteStudent = async (payload) => {
  let response = await HttpService.delete('/students', {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, [], 'Delete student success');
};

export const getStudentDetailById = async (payload) => {
  let response = await HttpService.get(`/students/view/detail`, {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, {});
};

export const getStudentMarkById = async (payload) => {
  let response = await HttpService.get(`/students/detail/subject`, {
    params: payload,
  });

  return HttpService.checkResponseCommon(response, []);
};

// Get accumulate point by student id
export const getAccumulatedPoint = async (payload) => {
  let response = await HttpService.get(`/students/semester/accumulated_point`, {
    params: payload,
  });
  return HttpService.checkResponseCommon(response, []);
};

// Get studentDetail by studentCode
export const getStudentDetailByStudentCode = async (payload) => {
  let response = await HttpService.get(`/students`, {
    params: payload,
  });
  return HttpService.checkResponseCommon(response, {studentName: "", courseName: '', classroomName: ''});
};