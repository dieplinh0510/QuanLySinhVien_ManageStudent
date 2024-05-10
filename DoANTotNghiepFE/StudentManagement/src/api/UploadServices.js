import HttpService from '../utils/http-service';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Api } from '../constant';

// Get all column in student
export const getStudentColumn = async (payload) => {
  let response = await HttpService.get(`/students/get-column`);
  return Object.entries(response?.data?.data).map(([value, label]) => ({ value, label }));
};

// Get all column in point
export const getPointColumn = async () => {
  let response = await HttpService.get(`/students/get-column/point`);
  return Object.entries(response?.data?.data).map(([value, label]) => ({ value, label }));
};

// API upload file
export const uploadFile = async (payload) => {
  console.log(payload.payload.file);
  const formData = new FormData();
  formData.append('file', payload?.payload?.file);
  let response = await HttpService.post('/file/upload-file', {
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response?.data?.data;
};

// API post mapping column
export const postMappingColumn = async (payload) => {
  let response = await HttpService.post('/file/insert-field', {
    body: payload,
    params: {
      typeInsert: payload.type,
    },
  });
  if (response?.data?.code !== '200') {
    toast.error(response?.data?.description);
  } else {
    toast.success('Mapping column success');
  }
  return response?.data;
};

// API get file status list
export const getFileStatusList = async (payload) => {
  console.log(payload);
  let response = await HttpService.get('/file/process-file', {
    params: payload,
  });
  console.log(response?.data?.data);
  return response?.data?.data;
};

// API download file
export const downloadFile = async (payload) => {
  const response = await axios.get(`${Api.BASE_URL}file/download-file?idFile=${payload.idFile}`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', payload.fileName);
  document.body.appendChild(link);
  link.click();
};