import * as UploadTypes from '../types/UploadTypes';

// API get column in student
export const getStudentColumnRequest = () => {
  return {
    type: UploadTypes.GET_STUDENT_COLUMN_REQUEST,
    payload: {},
  };
};

export const getStudentColumnSuccess = (payload) => {
  return {
    type: UploadTypes.GET_STUDENT_COLUMN_SUCCESS,
    payload: payload,
  };
};

export const getStudentColumnFailure = (error) => {
  return {
    type: UploadTypes.GET_STUDENT_COLUMN_FAILURE,
    payload: error,
  };
};

// API get column in point
export const getPointColumnRequest = () => {
  return {
    type: UploadTypes.GET_POINT_COLUMN_REQUEST,
    payload: {},
  };
};

export const getPointColumnSuccess = (payload) => {
  return {
    type: UploadTypes.GET_POINT_COLUMN_SUCCESS,
    payload: payload,
  };
};

export const getPointColumnFailure = (error) => {
  return {
    type: UploadTypes.GET_POINT_COLUMN_FAILURE,
    payload: error,
  };
};

// API upload file
export const uploadFileRequest = (payload) => {
  return {
    type: UploadTypes.UPLOAD_FILE_REQUEST,
    payload: payload,
  };
};

export const uploadFileSuccess = (payload) => {
  return {
    type: UploadTypes.UPLOAD_FILE_SUCCESS,
    payload: payload,
  };
};

export const uploadFileFailure = (error) => {
  return {
    type: UploadTypes.UPLOAD_FILE_FAILURE,
    payload: error,
  };
};

// API post mapping column
export const postMappingColumnRequest = (payload) => {
  return {
    type: UploadTypes.POST_MAPPING_COLUMN_REQUEST,
    payload: payload,
  };
};

export const postMappingColumnSuccess = (payload) => {
  return {
    type: UploadTypes.POST_MAPPING_COLUMN_SUCCESS,
    payload: payload,
  };
};

export const postMappingColumnFailure = (error) => {
  return {
    type: UploadTypes.POST_MAPPING_COLUMN_FAILURE,
    payload: error,
  };
};

// API get file status list
export const getFileStatusRequest = (payload) => {
  return {
    type: UploadTypes.GET_FILE_STATUS_REQUEST,
    payload: payload,
  };
};

export const getFileStatusSuccess = (payload) => {
  return {
    type: UploadTypes.GET_FILE_STATUS_SUCCESS,
    payload: payload,
  };
};

export const getFileStatusFailure = (error) => {
  return {
    type: UploadTypes.GET_FILE_STATUS_FAILURE,
    payload: error,
  };
};

// API download file
export const downloadFileRequest = (payload) => {
  return {
    type: UploadTypes.DOWNLOAD_FILE_REQUEST,
    payload: payload,
  };
};

export const downloadFileSuccess = (payload) => {
  return {
    type: UploadTypes.DOWNLOAD_FILE_SUCCESS,
    payload: payload,
  };
};

export const downloadFileFailure = (error) => {
  return {
    type: UploadTypes.DOWNLOAD_FILE_FAILURE,
    payload: error,
  };
};