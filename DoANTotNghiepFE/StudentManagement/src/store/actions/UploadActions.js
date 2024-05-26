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

// API get all documents
export const getAllDocumentsRequest = (payload) => {
  return {
    type: UploadTypes.GET_ALL_DOCUMENTS_REQUEST,
    payload: payload,
  };
};

export const getAllDocumentsSuccess = (payload) => {
  return {
    type: UploadTypes.GET_ALL_DOCUMENTS_SUCCESS,
    payload: payload,
  };
};

export const getAllDocumentsFailure = (error) => {
  return {
    type: UploadTypes.GET_ALL_DOCUMENTS_FAILURE,
    payload: error,
  };
};

// API upload document
export const uploadDocumentRequest = (payload) => {
  return {
    type: UploadTypes.UPLOAD_DOCUMENT_REQUEST,
    payload: payload,
  };
};

export const uploadDocumentSuccess = (payload) => {
  return {
    type: UploadTypes.UPLOAD_DOCUMENT_SUCCESS,
    payload: payload,
  };
};

export const uploadDocumentFailure = (error) => {
  return {
    type: UploadTypes.UPLOAD_DOCUMENT_FAILURE,
    payload: error,
  };
};


// API download document
export const downloadDocumentRequest = (payload) => {
  return {
    type: UploadTypes.DOWNLOAD_DOCUMENT_REQUEST,
    payload: payload,
  };
};

export const downloadDocumentSuccess = (payload) => {
  return {
    type: UploadTypes.DOWNLOAD_DOCUMENT_SUCCESS,
    payload: payload,
  };
};

export const downloadDocumentFailure = (error) => {
  return {
    type: UploadTypes.DOWNLOAD_DOCUMENT_FAILURE,
    payload: error,
  };
};

// API export file pdf
export const exportFilePdfRequest = (payload) => {
  return {
    type: UploadTypes.EXPORT_FILE_PDF_REQUEST,
    payload: payload,
  };
};

export const exportFilePdfSuccess = (payload) => {
  return {
    type: UploadTypes.EXPORT_FILE_PDF_SUCCESS,
    payload: payload,
  };
};

export const exportFilePdfFailure = (error) => {
  return {
    type: UploadTypes.EXPORT_FILE_PDF_FAILURE,
    payload: error,
  };
};

// API get all documents of classroom by documentId
export const getAllDocumentsByDocumentIdRequest = (payload) => {
  return {
    type: UploadTypes.GET_ALL_DOCUMENTS_BY_DOCUMENT_ID_REQUEST,
    payload: payload,
  };
};

export const getAllDocumentsByDocumentIdSuccess = (payload) => {
  return {
    type: UploadTypes.GET_ALL_DOCUMENTS_BY_DOCUMENT_ID_SUCCESS,
    payload: payload,
  };
};

export const getAllDocumentsByDocumentIdFailure = (error) => {
  return {
    type: UploadTypes.GET_ALL_DOCUMENTS_BY_DOCUMENT_ID_FAILURE,
    payload: error,
  };
};

// API update document
export const updateDocumentRequest = (payload) => {
  return {
    type: UploadTypes.UPDATE_DOCUMENT_REQUEST,
    payload: payload,
  };
};

export const updateDocumentSuccess = (payload) => {
  return {
    type: UploadTypes.UPDATE_DOCUMENT_SUCCESS,
    payload: payload,
  };
};

export const updateDocumentFailure = (error) => {
  return {
    type: UploadTypes.UPDATE_DOCUMENT_FAILURE,
    payload: error,
  };
};

// API submit homework
export const submitHomeworkRequest = (payload) => {
  return {
    type: UploadTypes.SUBMIT_HOMEWORK_REQUEST,
    payload: payload,
  };
};

export const submitHomeworkSuccess = (payload) => {
  return {
    type: UploadTypes.SUBMIT_HOMEWORK_SUCCESS,
    payload: payload,
  };
};

export const submitHomeworkFailure = (error) => {
  return {
    type: UploadTypes.SUBMIT_HOMEWORK_FAILURE,
    payload: error,
  };
};

// API download assignment
export const downloadAssignmentRequest = (payload) => {
  return {
    type: UploadTypes.DOWNLOAD_ASSIGNMENT_REQUEST,
    payload: payload,
  };
};

export const downloadAssignmentSuccess = (payload) => {
  return {
    type: UploadTypes.DOWNLOAD_ASSIGNMENT_SUCCESS,
    payload: payload,
  };
};

export const downloadAssignmentFailure = (error) => {
  return {
    type: UploadTypes.DOWNLOAD_ASSIGNMENT_FAILURE,
    payload: error,
  };
};
