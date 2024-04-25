import * as PointInputTypes from '../types/PointInputTypes';

// API get column in student
export const getStudentColumnRequest = (payload) => {
  return {
    type: PointInputTypes.GET_ALL_STUDENT_REQUEST,
    payload: payload,
  };
};

export const getStudentColumnSuccess = (payload) => {
  return {
    type: PointInputTypes.GET_ALL_STUDENT_SUCCESS,
    payload: payload,
  };
};

export const getStudentColumnFailure = (error) => {
  return {
    type: PointInputTypes.GET_ALL_STUDENT_FAILURE,
    payload: error,
  };
};

// API get all classroom
export const getAllClassroomRequest = () => {
  return {
    type: PointInputTypes.GET_ALL_CLASSROOM_REQUEST,
  };
};

export const getAllClassroomSuccess = (payload) => {
  return {
    type: PointInputTypes.GET_ALL_CLASSROOM_SUCCESS,
    payload: payload,
  };
};

export const getAllClassroomFailure = (error) => {
  return {
    type: PointInputTypes.GET_ALL_CLASSROOM_FAILURE,
    payload: error,
  };
};

// API edit point
export const editPointRequest = (payload) => {
  return {
    type: PointInputTypes.EDIT_POINT_REQUEST,
    payload: payload,
  };
};

export const editPointSuccess = (payload) => {
  return {
    type: PointInputTypes.EDIT_POINT_SUCCESS,
    payload: payload,
  };
};

export const editPointFailure = (error) => {
  return {
    type: PointInputTypes.EDIT_POINT_FAILURE,
    payload: error,
  };
};

// API delete point
export const deletePointRequest = (payload) => {
  return {
    type: PointInputTypes.DELETE_POINT_REQUEST,
    payload: payload,
  };
};

export const deletePointSuccess = (payload) => {
  return {
    type: PointInputTypes.DELETE_POINT_SUCCESS,
    payload: payload,
  };
};

export const deletePointFailure = (error) => {
  return {
    type: PointInputTypes.DELETE_POINT_FAILURE,
    payload: error,
  };
};
