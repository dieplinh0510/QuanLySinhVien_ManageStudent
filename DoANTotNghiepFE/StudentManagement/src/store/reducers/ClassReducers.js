import * as ClassTypes from '../types/ClassTypes';

const initialState = {
  loading: false,
  classes: [],
  teachers: [],
  error: null,
  students: [],
  studentPaging: null,
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    // get list course
    case ClassTypes.GET_CLASSES_IN_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.GET_CLASSES_IN_SUBJECT_SUCCESS:
      return { ...state, loading: false, classes: action.payload.data };
    case ClassTypes.GET_CLASSES_IN_SUBJECT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // get all class
    case ClassTypes.GET_ALL_CLASSES_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.GET_ALL_CLASSES_SUCCESS:
      return { ...state, loading: false, classes: action.payload.data };
    case ClassTypes.GET_ALL_CLASSES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // create class
    case ClassTypes.CREATE_CLASS_IN_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.CREATE_CLASS_IN_SUBJECT_SUCCESS:
      return { ...state, loading: false };
    case ClassTypes.CREATE_CLASS_IN_SUBJECT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // edit class
    case ClassTypes.EDIT_CLASS_IN_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.EDIT_CLASS_IN_SUBJECT_SUCCESS:
      return { ...state, loading: false };
    case ClassTypes.EDIT_CLASS_IN_SUBJECT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // get all teachers
    case ClassTypes.GET_LIST_TEACHER_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.GET_LIST_TEACHER_SUCCESS:
      return { ...state, loading: false, teachers: action.payload };
    case ClassTypes.GET_LIST_TEACHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // get list class by course id
    case ClassTypes.GET_CLASSES_BY_COURSE_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.GET_CLASSES_BY_COURSE_SUCCESS:
      return { ...state, loading: false, classes: action.payload };
    case ClassTypes.GET_CLASSES_BY_COURSE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // search class by subject
    case ClassTypes.SEARCH_CLASSES_BY_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.SEARCH_CLASSES_BY_SUBJECT_SUCCESS:
      return { ...state, loading: false, classes: action.payload };
    case ClassTypes.SEARCH_CLASSES_BY_SUBJECT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // add student to class
    case ClassTypes.ADD_STUDENT_TO_CLASS_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.ADD_STUDENT_TO_CLASS_SUCCESS:
      return { ...state, loading: false };
    case ClassTypes.ADD_STUDENT_TO_CLASS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // API get all student in class
    case ClassTypes.GET_ALL_STUDENT_IN_CLASS_REQUEST:
      return { ...state, loading: true };
    case ClassTypes.GET_ALL_STUDENT_IN_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload.content,
        studentPaging: {
          last: action.payload.last,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          size: action.payload.size,
          number: action.payload.number,
          first: action.payload.first,
          numberOfElements: action.payload.numberOfElements,
          pageIndex: action.payload.pageable.pageNumber,
          pageSize: action.payload.pageable.pageSize,
          offset: action.payload.pageable.offset,
        },
      };
    case ClassTypes.GET_ALL_STUDENT_IN_CLASS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default classReducer;

