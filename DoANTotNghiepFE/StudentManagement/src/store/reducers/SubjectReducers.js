import * as SubjectTypes from '../types/SubjectTypes';

const initialState = {
  subjects: [],
  subject: null,
  loading: false,
  error: null,
  semesters: []
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get subjects
    case SubjectTypes.GET_SUBJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SubjectTypes.GET_SUBJECTS_SUCCESS:
      return {
        ...state,
        subjects: action.payload,
        loading: false,
      };
    case SubjectTypes.GET_SUBJECTS_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    // Get subject detail
    case SubjectTypes.GET_SUBJECT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SubjectTypes.GET_SUBJECT_DETAIL_SUCCESS:
      return {
        ...state,
        subjects: action.payload,
        loading: false,
      };
    case SubjectTypes.GET_SUBJECT_DETAIL_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    // Create subject
    case SubjectTypes.CREATE_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SubjectTypes.CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SubjectTypes.CREATE_SUBJECT_FAILURE:
      return {
        ...state,
        loading: true,
      };

    // Edit subject
    case SubjectTypes.EDIT_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SubjectTypes.EDIT_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SubjectTypes.EDIT_SUBJECT_FAILURE:
      return {
        ...state,
        loading: true,
      };

    // Delete subject
    case SubjectTypes.DELETE_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SubjectTypes.DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SubjectTypes.DELETE_SUBJECT_FAILURE:
      return {
        ...state,
        loading: true,
      };

    // Get list semester
    case SubjectTypes.GET_LIST_SEMESTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SubjectTypes.GET_LIST_SEMESTER_SUCCESS:
      return {
        ...state,
        loading: false,
        semesters: action.payload
      };
    case SubjectTypes.GET_LIST_SEMESTER_FAILURE:
      return {
        ...state,
        loading: true,
      };

    // Get subject detail by id
    case SubjectTypes.GET_SUBJECT_DETAIL_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SubjectTypes.GET_SUBJECT_DETAIL_BY_ID_SUCCESS:
      return {
        ...state,
        subject: action.payload,
        loading: false,
      };
    case SubjectTypes.GET_SUBJECT_DETAIL_BY_ID_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default subjectReducer;

