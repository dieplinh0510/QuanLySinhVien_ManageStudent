import * as StudentTypes from '../types/StudentTypes';

export const getAllStudentRequest = (payload) => ({
  type: StudentTypes.GET_STUDENTS_REQUEST,
  payload: payload,
});

export const getAllStudentSuccess = (payload) => ({
  type: StudentTypes.GET_STUDENTS_SUCCESS,
  payload: payload,
});

export const getAllStudentFailure = (error) => ({
  type: StudentTypes.GET_STUDENTS_FAILURE,
  payload: error,
});


export const searchStudentRequest = (payload) => ({
  type: StudentTypes.SEARCH_STUDENTS_REQUEST,
  payload: payload,
});

export const searchStudentSuccess = (payload) => ({
  type: StudentTypes.SEARCH_STUDENTS_SUCCESS,
  payload: payload,
});

export const searchStudentFailure = (error) => ({
  type: StudentTypes.SEARCH_STUDENTS_FAILURE,
  payload: error,
});


export const createStudentRequest = (payload) => ({
  type: StudentTypes.CREATE_STUDENT_REQUEST,
  payload: payload,
});

export const createStudentSuccess = (payload) => ({
  type: StudentTypes.CREATE_STUDENT_SUCCESS,
  payload: payload,
});

export const createStudentFailure = (error) => ({
  type: StudentTypes.CREATE_STUDENT_FAILURE,
  payload: error,
});


export const editStudentRequest = (payload) => ({
  type: StudentTypes.EDIT_STUDENT_REQUEST,
  payload: payload,
});

export const editStudentSuccess = (payload) => ({
  type: StudentTypes.EDIT_STUDENT_SUCCESS,
  payload: payload,
});

export const editStudentFailure = (error) => ({
  type: StudentTypes.EDIT_STUDENT_FAILURE,
  payload: error,
});


export const deleteStudentRequest = (payload) => ({
  type: StudentTypes.DELETE_STUDENT_REQUEST,
  payload: payload,
});

export const deleteStudentSuccess = (payload) => ({
  type: StudentTypes.DELETE_STUDENT_SUCCESS,
  payload: payload,
});

export const deleteStudentFailure = (error) => ({
  type: StudentTypes.DELETE_STUDENT_FAILURE,
  payload: error,
});

export const getStudentDetailByIdRequest = (payload) => ({
  type: StudentTypes.GET_STUDENT_DETAIL_BY_ID_REQUEST,
  payload: payload,
});

export const getStudentDetailByIdSuccess = (payload) => ({
  type: StudentTypes.GET_STUDENT_DETAIL_BY_ID_SUCCESS,
  payload: payload,
});

export const getStudentDetailByIdFailure = (error) => ({
  type: StudentTypes.GET_STUDENT_DETAIL_BY_ID_FAILURE,
  payload: error
});


export const getStudentMarkByIdRequest = (payload) => ({
  type: StudentTypes.GET_STUDENT_MARK_BY_ID_REQUEST,
  payload: payload,
});

export const getStudentMarkByIdSuccess = (payload) => ({
  type: StudentTypes.GET_STUDENT_MARK_BY_ID_SUCCESS,
  payload: payload,
});

export const getStudentMarkByIdFailure = (error) => ({
  type: StudentTypes.GET_STUDENT_MARK_BY_ID_FAILURE,
  payload: error
});


export const getStudentAccumulatePointRequest = (payload) => ({
  type: StudentTypes.GET_STUDENT_ACCUMULATE_POINT_REQUEST,
  payload: payload,
});

export const getStudentAccumulatePointSuccess = (payload) => ({
  type: StudentTypes.GET_STUDENT_ACCUMULATE_POINT_SUCCESS,
  payload: payload,
});

export const getStudentAccumulatePointFailure = (error) => ({
  type: StudentTypes.GET_STUDENT_ACCUMULATE_POINT_FAILURE,
  payload: error
});


export const getStudentDetailByStudentCodeRequest = (payload) => ({
  type: StudentTypes.GET_STUDENT_DETAIL_BY_STUDENT_CODE_REQUEST,
  payload: payload,
});

export const getStudentDetailByStudentCodeSuccess = (payload) => ({
  type: StudentTypes.GET_STUDENT_DETAIL_BY_STUDENT_CODE_SUCCESS,
  payload: payload,
});

export const getStudentDetailByStudentCodeFailure = (error) => ({
  type: StudentTypes.GET_STUDENT_DETAIL_BY_STUDENT_CODE_FAILURE,
  payload: error
});

// Get all class to register
export const getAllClassToRegisterRequest = (payload) => ({
  type: StudentTypes.GET_ALL_CLASS_TO_REGISTER_REQUEST,
  payload: payload,
});

export const getAllClassToRegisterSuccess = (payload) => ({
  type: StudentTypes.GET_ALL_CLASS_TO_REGISTER_SUCCESS,
  payload: payload,
});

export const getAllClassToRegisterFailure = (error) => ({
  type: StudentTypes.GET_ALL_CLASS_TO_REGISTER_FAILURE,
  payload: error
});

// Get all subject to register
export const getAllSubjectToRegisterRequest = (payload) => ({
  type: StudentTypes.GET_ALL_SUBJECT_TO_REGISTER_REQUEST,
  payload: payload,
});

export const getAllSubjectToRegisterSuccess = (payload) => ({
  type: StudentTypes.GET_ALL_SUBJECT_TO_REGISTER_SUCCESS,
  payload: payload,
});

export const getAllSubjectToRegisterFailure = (error) => ({
  type: StudentTypes.GET_ALL_SUBJECT_TO_REGISTER_FAILURE,
  payload: error
});


// API register subject class
export const registerSubjectClassRequest = (payload) => ({
  type: StudentTypes.REGISTER_SUBJECT_CLASS_REQUEST,
  payload: payload,
});

export const registerSubjectClassSuccess = (payload) => ({
  type: StudentTypes.REGISTER_SUBJECT_CLASS_SUCCESS,
  payload: payload,
});

export const registerSubjectClassFailure = (error) => ({
  type: StudentTypes.REGISTER_SUBJECT_CLASS_FAILURE,
  payload: error
});

// API cancel register subject class
export const cancelRegisterSubjectClassRequest = (payload) => ({
  type: StudentTypes.CANCEL_REGISTER_SUBJECT_CLASS_REQUEST,
  payload: payload,
});

export const cancelRegisterSubjectClassSuccess = (payload) => ({
  type: StudentTypes.CANCEL_REGISTER_SUBJECT_CLASS_SUCCESS,
  payload: payload,
});

export const cancelRegisterSubjectClassFailure = (error) => ({
  type: StudentTypes.CANCEL_REGISTER_SUBJECT_CLASS_FAILURE,
  payload: error
});
