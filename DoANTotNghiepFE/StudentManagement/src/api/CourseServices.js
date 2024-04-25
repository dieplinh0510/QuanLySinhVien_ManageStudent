import HttpService from '../utils/http-service';

export const getListCourse = async () => {
  let response = await HttpService.get('/courses');
  return response?.data?.data;
};
