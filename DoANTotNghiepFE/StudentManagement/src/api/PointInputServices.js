import HttpService from '../utils/http-service';

// API get list student in classroom
export const getAllStudent = async (payload) => {
  let response = await HttpService.get('/students/view-point-class', {
    params: payload,
  });

  return response?.data?.data;
};

// API get all classroom
export const getAllClassroom = async () => {
  let response = await HttpService.get('/classroom-subject');

  return response?.data?.data;
};

// API edit point
export const editPoint = async (payload) => {
  let response = await HttpService.put('/students/change-point-class', {
    body: payload
  });

  return HttpService.checkResponseCommon(response, null, "Sửa điểm thành công!");
};

// API delete point
export const deletePoint = async (payload) => {
  let response = await HttpService.delete('/students/delete-point-class', {
    params: payload
  });

  return HttpService.checkResponseCommon(response, null, "Xóa điểm thành công!");
};