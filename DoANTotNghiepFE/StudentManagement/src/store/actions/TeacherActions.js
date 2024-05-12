import * as TeacherTypes from '../types/TeacherTypes';

// API get all teacher
export const getAllTeacherRequest = (payload) => ({
  type: TeacherTypes.GET_ALL_TEACHERS_REQUEST,
  payload: payload,
});

export const getAllTeacherSuccess = (payload) => ({
  type: TeacherTypes.GET_ALL_TEACHERS_SUCCESS,
  payload: payload,
});

export const getAllTeacherFailure = (error) => ({
  type: TeacherTypes.GET_ALL_TEACHERS_FAILURE,
  payload: error,
});

// API create teacher
export const createTeacherRequest = (payload) => ({
  type: TeacherTypes.CREATE_TEACHER_REQUEST,
  payload: payload,
});

export const createTeacherSuccess = (payload) => ({
  type: TeacherTypes.CREATE_TEACHER_SUCCESS,
  payload: payload,
});

export const createTeacherFailure = (error) => ({
  type: TeacherTypes.CREATE_TEACHER_FAILURE,
  payload: error,
});

// API update teacher
export const updateTeacherRequest = (payload) => ({
  type: TeacherTypes.UPDATE_TEACHER_REQUEST,
  payload: payload,
});

export const updateTeacherSuccess = (payload) => ({
  type: TeacherTypes.UPDATE_TEACHER_SUCCESS,
  payload: payload,
});

export const updateTeacherFailure = (error) => ({
  type: TeacherTypes.UPDATE_TEACHER_FAILURE,
  payload: error,
});

// API get all my class
export const searchMyClassesRequest = (payload) => ({
  type: TeacherTypes.SEARCH_MY_CLASSES_REQUEST,
  payload: payload,
});

export const searchMyClassesSuccess = (payload) => ({
  type: TeacherTypes.SEARCH_MY_CLASSES_SUCCESS,
  payload: payload,
});

export const searchMyClassesFailure = (error) => ({
  type: TeacherTypes.SEARCH_MY_CLASSES_FAILURE,
  payload: error,
});
