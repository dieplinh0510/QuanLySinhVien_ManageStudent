import * as CourseTypes from '../types/CourseTypes';

export const getListCourseRequest = (payload) => ({
  type: CourseTypes.GET_COURSES_REQUEST,
  payload: payload,
});

export const getListCourseSuccess = (data) => ({
  type: CourseTypes.GET_COURSES_SUCCESS,
  payload: { data },
});

export const getListCourseFailure = (error) => ({
  type: CourseTypes.GET_COURSES_FAILURE,
  payload: error,
});