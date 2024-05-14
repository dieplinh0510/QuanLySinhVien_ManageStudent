import HttpService from '../utils/http-service';

// API get statistical-point
export const getStatisticalPoint = async (payload) => {
  let response = await HttpService.get('/classroom-subject/statistical-point', {
    params: payload,
  });

  return response?.data?.data;
};

// API get statistical-point student
export const getStatisticalPointStudent = async (payload) => {
  let response = await HttpService.get('/classroom-subject/statistical-point/student', {
    params: payload,
  });

  return response?.data?.data;
};