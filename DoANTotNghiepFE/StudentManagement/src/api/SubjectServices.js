import HttpService from '../utils/http-service';
import { toast } from 'react-toastify';

export const getSubjects = async () => {
  let response = await HttpService.get('/subjects');
  return response?.data?.data;
};

export const getSubjectDetail = async (payload) => {
  try {
    let response = await HttpService.get('/subjects/detail', {
      params: payload,
    });
    if (response?.data && response?.data?.data) {
      return [response?.data?.data];
    }
    return [];
  } catch(e) {
    toast.error('Không tìm thấy môn học');
    return [];
  }
};

export const createSubject = async (payload) => {
  let response = await HttpService.post('/subjects', {
    body: payload,
  });
  return HttpService.checkResponseCommon(response, {}, 'Tạo môn học thành công');
};

export const updateSubject = async (payload) => {
  let response = await HttpService.put(`/subjects`, {
    body: payload,
    params: {
      subjectId: payload.id,
    },
  });
  return HttpService.checkResponseCommon(response, {}, 'Sửa môn học thành công');
};

export const deleteSubject = async (payload) => {
  let response = await HttpService.delete(`/subjects`, {
    params: {
      subjectId: payload.id,
    },
  });
  return response?.data;
}

export const getListSemester = async () => {
  let response = await HttpService.get('/semesters');
  let output = [];
  let arr = response?.data?.data;
  if (arr && arr.length > 0) {
    output = arr.map((item) => {
      return {
        value: item.id,
        label: item.nameSemester,
      };
    });
  }

  return output;
}

// Get subject detail by id
export const getSubjectDetailById = async (payload) => {
  let response = await HttpService.get(`/subjects/detail/${payload.id}`);
  return response?.data?.data;
};

