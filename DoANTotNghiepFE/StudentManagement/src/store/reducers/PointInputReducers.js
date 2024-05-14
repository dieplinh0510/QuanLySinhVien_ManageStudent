import * as PointInputTypes from '../types/PointInputTypes';

const initialState = {
  loading: false,
  error: null,
  students: [],
  pagingStudents: null,
  classrooms: [],
};

const pointInputReducer = (state = initialState, action) => {
  switch (action.type) {
    // API get all student in classroom
    case PointInputTypes.GET_ALL_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PointInputTypes.GET_ALL_STUDENT_SUCCESS:
      return {
        ...state,
        students: action.payload.content,
        pagingStudents: {
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
        loading: false,
      };
    case PointInputTypes.GET_ALL_STUDENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API get all classroom
    case PointInputTypes.GET_ALL_CLASSROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PointInputTypes.GET_ALL_CLASSROOM_SUCCESS:
      return {
        ...state,
        classrooms: action.payload,
        loading: false,
      };
    case PointInputTypes.GET_ALL_CLASSROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API edit point
    case PointInputTypes.EDIT_POINT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PointInputTypes.EDIT_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PointInputTypes.EDIT_POINT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API delete point
    case PointInputTypes.DELETE_POINT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PointInputTypes.DELETE_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PointInputTypes.DELETE_POINT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default pointInputReducer;