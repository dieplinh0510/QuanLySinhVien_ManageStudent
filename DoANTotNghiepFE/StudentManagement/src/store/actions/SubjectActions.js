import * as SubjectTypes from '../types/SubjectTypes';

// Get subjects
export const getSubjectsRequest = (payload) => ({
  type: SubjectTypes.GET_SUBJECTS_REQUEST,
  payload: payload,
});

export const getSubjectsSuccess = (payload) => ({
  type: SubjectTypes.GET_SUBJECTS_SUCCESS,
  payload: payload,
});

export const getSubjectsFailure = (error) => ({
  type: SubjectTypes.GET_SUBJECTS_FAILURE,
  payload: error,
});

// Get subject detail
export const getSubjectDetailRequest = (payload) => ({
  type: SubjectTypes.GET_SUBJECT_DETAIL_REQUEST,
  payload: payload,
});

export const getSubjectDetailSuccess = (payload) => ({
  type: SubjectTypes.GET_SUBJECT_DETAIL_SUCCESS,
  payload: payload,
});

export const getSubjectDetailFailure = (error) => ({
  type: SubjectTypes.GET_SUBJECT_DETAIL_FAILURE,
  payload: error,
});

// Create subject
export const createSubjectRequest = (payload) => ({
  type: SubjectTypes.CREATE_SUBJECT_REQUEST,
  payload: payload,
});

export const createSubjectSuccess = (payload) => ({
  type: SubjectTypes.CREATE_SUBJECT_SUCCESS,
  payload: payload,
});

export const createSubjectFailure = (error) => ({
  type: SubjectTypes.CREATE_SUBJECT_FAILURE,
  payload: error,
});

// Edit subject
export const editSubjectRequest = (payload) => ({
  type: SubjectTypes.EDIT_SUBJECT_REQUEST,
  payload: payload,
});

export const editSubjectSuccess = (payload) => ({
  type: SubjectTypes.EDIT_SUBJECT_SUCCESS,
  payload: payload,
});

export const editSubjectFailure = (error) => ({
  type: SubjectTypes.EDIT_SUBJECT_FAILURE,
  payload: error,
});

// Delete subject
export const deleteSubjectRequest = (payload) => ({
  type: SubjectTypes.DELETE_SUBJECT_REQUEST,
  payload: payload,
});

export const deleteSubjectSuccess = (payload) => ({
  type: SubjectTypes.DELETE_SUBJECT_SUCCESS,
  payload: payload,
});

export const deleteSubjectFailure = (error) => ({
  type: SubjectTypes.DELETE_SUBJECT_FAILURE,
  payload: error,
});

// Get list semester
export const getListSemesterRequest = (payload) => ({
  type: SubjectTypes.GET_LIST_SEMESTER_REQUEST,
  payload: payload,
});

export const getListSemesterSuccess = (payload) => ({
  type: SubjectTypes.GET_LIST_SEMESTER_SUCCESS,
  payload: payload,
});

export const getListSemesterFailure = (error) => ({
  type: SubjectTypes.GET_LIST_SEMESTER_FAILURE,
  payload: error,
});

// Get subject detail by id
export const getSubjectDetailByIdRequest = (payload) => ({
  type: SubjectTypes.GET_SUBJECT_DETAIL_BY_ID_REQUEST,
  payload: payload,
});

export const getSubjectDetailByIdSuccess = (payload) => ({
  type: SubjectTypes.GET_SUBJECT_DETAIL_BY_ID_SUCCESS,
  payload: payload,
});

export const getSubjectDetailByIdFailure = (error) => ({
  type: SubjectTypes.GET_SUBJECT_DETAIL_BY_ID_FAILURE,
  payload: error,
});