import * as TeacherTypes from '../types/TeacherTypes';

const initialState = {
  loading: false,
  error: null,
  teachers: [],
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    // get all teacher
    case TeacherTypes.GET_ALL_TEACHERS_REQUEST:
      return { ...state, loading: true };
    case TeacherTypes.GET_ALL_TEACHERS_SUCCESS:
      return { ...state, loading: false, teachers: action.payload };
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

    default:
      return state;
  }
};

export default teacherReducer;

