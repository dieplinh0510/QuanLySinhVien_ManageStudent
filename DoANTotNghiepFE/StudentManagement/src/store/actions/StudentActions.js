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
