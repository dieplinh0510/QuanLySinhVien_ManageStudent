import * as ClassTypes from '../types/ClassTypes';

// Get all classes by subjectId
export const getListClassInSubjectRequest = (payload) => ({
  type: ClassTypes.GET_CLASSES_IN_SUBJECT_REQUEST,
  payload: payload,
});

export const getListClassInSubjectSuccess = (data) => ({
  type: ClassTypes.GET_CLASSES_IN_SUBJECT_SUCCESS,
  payload: { data },
});

export const getListClassInSubjectFailure = (error) => ({
  type: ClassTypes.GET_CLASSES_IN_SUBJECT_FAILURE,
  payload: error,
});

// Get all classes
export const getAllClassRequest = () => ({
  type: ClassTypes.GET_ALL_CLASSES_REQUEST,
});

export const getAllClassSuccess = (data) => ({
  type: ClassTypes.GET_ALL_CLASSES_SUCCESS,
  payload: { data },
});

export const getAllClassFailure = (error) => ({
  type: ClassTypes.GET_ALL_CLASSES_FAILURE,
  payload: error,
});

// Create class in subject
export const createClassInSubjectRequest = (payload) => ({
  type: ClassTypes.CREATE_CLASS_IN_SUBJECT_REQUEST,
  payload: payload,
});

export const createClassInSubjectSuccess = () => ({
  type: ClassTypes.CREATE_CLASS_IN_SUBJECT_SUCCESS,
});

export const createClassInSubjectFailure = (error) => ({
  type: ClassTypes.CREATE_CLASS_IN_SUBJECT_FAILURE,
  payload: error,
});

// Edit class in subject
export const editClassInSubjectRequest = (payload) => ({
  type: ClassTypes.EDIT_CLASS_IN_SUBJECT_REQUEST,
  payload: payload,
});

export const editClassInSubjectSuccess = () => ({
  type: ClassTypes.EDIT_CLASS_IN_SUBJECT_SUCCESS,
});

export const editClassInSubjectFailure = (error) => ({
  type: ClassTypes.EDIT_CLASS_IN_SUBJECT_FAILURE,
  payload: error,
});

// Get list teacher
export const getListTeacherRequest = (payload) => ({
  type: ClassTypes.GET_LIST_TEACHER_REQUEST,
  payload: payload,
});

export const getListTeacherSuccess = (payload) => ({
  type: ClassTypes.GET_LIST_TEACHER_SUCCESS,
  payload: payload,
});

export const getListTeacherFailure = (error) => ({
  type: ClassTypes.GET_LIST_TEACHER_FAILURE,
  payload: error,
});

// Get list class by course id
export const getListClassByCourseRequest = (payload) => ({
  type: ClassTypes.GET_CLASSES_BY_COURSE_REQUEST,
  payload: payload,
});

export const getListClassByCourseSuccess = (payload) => ({
  type: ClassTypes.GET_CLASSES_BY_COURSE_SUCCESS,
  payload: payload,
});

export const getListClassByCourseFailure = (error) => ({
  type: ClassTypes.GET_CLASSES_BY_COURSE_FAILURE,
  payload: error,
});

// Search class by subject
export const searchClassesBySubjectRequest = (payload) => ({
  type: ClassTypes.SEARCH_CLASSES_BY_SUBJECT_REQUEST,
  payload: payload,
});

export const searchClassesBySubjectSuccess = (payload) => ({
  type: ClassTypes.SEARCH_CLASSES_BY_SUBJECT_SUCCESS,
  payload: payload,
});

export const searchClassesBySubjectFailure = (error) => ({
  type: ClassTypes.SEARCH_CLASSES_BY_SUBJECT_FAILURE,
  payload: error,
});


// API add student to class
export const addStudentToClassRequest = (payload) => ({
  type: ClassTypes.ADD_STUDENT_TO_CLASS_REQUEST,
  payload: payload,
});

export const addStudentToClassSuccess = () => ({
  type: ClassTypes.ADD_STUDENT_TO_CLASS_SUCCESS,
});

export const addStudentToClassFailure = (error) => ({
  type: ClassTypes.ADD_STUDENT_TO_CLASS_FAILURE,
  payload: error,
});

// API get all student in class
export const getAllStudentInClassRequest = (payload) => ({
  type: ClassTypes.GET_ALL_STUDENT_IN_CLASS_REQUEST,
  payload: payload,
});

export const getAllStudentInClassSuccess = (payload) => ({
  type: ClassTypes.GET_ALL_STUDENT_IN_CLASS_SUCCESS,
  payload: payload,
});

export const getAllStudentInClassFailure = (error) => ({
  type: ClassTypes.GET_ALL_STUDENT_IN_CLASS_FAILURE,
  payload: error,
});
