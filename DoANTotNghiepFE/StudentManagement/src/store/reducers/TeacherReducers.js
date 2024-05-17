import * as TeacherTypes from '../types/TeacherTypes';

const initialState = {
  loading: false,
  error: null,
  teachers: [],
  paging: null,
  myClasses: [],
  pagingMyClass: null
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    // get all teacher
    case TeacherTypes.GET_ALL_TEACHERS_REQUEST:
      return { ...state, loading: true };
    case TeacherTypes.GET_ALL_TEACHERS_SUCCESS:
      return {
        ...state, loading: false, teachers: action.payload.content,
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
      };
    case TeacherTypes.GET_ALL_TEACHERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // create teacher
    case TeacherTypes.CREATE_TEACHER_REQUEST:
      return { ...state, loading: true };
    case TeacherTypes.CREATE_TEACHER_SUCCESS:
      return { ...state, loading: false };
    case TeacherTypes.CREATE_TEACHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // update teacher
    case TeacherTypes.UPDATE_TEACHER_REQUEST:
      return { ...state, loading: true };
    case TeacherTypes.UPDATE_TEACHER_SUCCESS:
      return { ...state, loading: false };
    case TeacherTypes.UPDATE_TEACHER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // API get all my class
    case TeacherTypes.SEARCH_MY_CLASSES_REQUEST:
      return { ...state, loading: true };
    case TeacherTypes.SEARCH_MY_CLASSES_SUCCESS:


      return { ...state, 
        loading: false, 
        myClasses: action.payload.content,
        pagingMyClass: {
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
    case TeacherTypes.SEARCH_MY_CLASSES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // API update class
    case TeacherTypes.UPDATE_CLASS_REQUEST:
      console.log('UPDATE_CLASS_REQUEST');
      return { ...state, loading: true };
    case TeacherTypes.UPDATE_CLASS_SUCCESS:
      return { ...state, loading: false };
    case TeacherTypes.UPDATE_CLASS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default teacherReducer;

