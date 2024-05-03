import * as StudentTypes from '../types/StudentTypes';

const initialState = {
  students: [],
  loading: false,
  paging: null,
  pagingForDetail: null,
  studentDetail: null,
  studentMark: [],
  accumulatedPoint: [],
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case StudentTypes.GET_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case StudentTypes.GET_STUDENTS_FAILURE:
      return {
        ...state,
        loading: true,
      };


    case StudentTypes.SEARCH_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.SEARCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload.content,
        paging: {
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
    case StudentTypes.SEARCH_STUDENTS_FAILURE:
      return {
        ...state,
        loading: true,
      };


    case StudentTypes.CREATE_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.CREATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case StudentTypes.CREATE_STUDENT_FAILURE:
      return {
        ...state,
        loading: true,
      };


    case StudentTypes.EDIT_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case StudentTypes.EDIT_STUDENT_FAILURE:
      return {
        ...state,
        loading: true,
      };


    case StudentTypes.DELETE_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case StudentTypes.DELETE_STUDENT_FAILURE:
      return {
        ...state,
        loading: true,
      };

    case StudentTypes.GET_STUDENT_DETAIL_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.GET_STUDENT_DETAIL_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        studentDetail: action.payload,
      };
    case StudentTypes.GET_STUDENT_DETAIL_BY_ID_FAILURE:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.GET_STUDENT_MARK_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.GET_STUDENT_MARK_BY_ID_SUCCESS:
      console.log('action.payload', action.payload)

      return {
        ...state,
        loading: false,
        studentMark: action.payload.content,
        pagingForDetail: {
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
        }
      };
    case StudentTypes.GET_STUDENT_MARK_BY_ID_FAILURE:
      return {
        ...state,
        loading: true,
      };

    //getAccumulatedPoint
    case StudentTypes.GET_STUDENT_ACCUMULATE_POINT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.GET_STUDENT_ACCUMULATE_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
        accumulatedPoint: action.payload,
      };
    case StudentTypes.GET_STUDENT_ACCUMULATE_POINT_FAILURE:
      return {
        ...state,
        loading: true,
      };

    // Get StudentDetail By StudentCode
    case StudentTypes.GET_STUDENT_DETAIL_BY_STUDENT_CODE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StudentTypes.GET_STUDENT_DETAIL_BY_STUDENT_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        studentDetail: action.payload,
      };
    case StudentTypes.GET_STUDENT_DETAIL_BY_STUDENT_CODE_FAILURE:
      return {
        ...state,
        loading: true,
      };


    default:
      return state;
  }
};

export default studentsReducer;
