import * as CourseTypes from '../types/CourseTypes';

const initialState = {
  loading: false,
  courses: [],
  error: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    // get list course
    case CourseTypes.GET_COURSES_REQUEST:
      return { ...state, loading: true };
    case CourseTypes.GET_COURSES_SUCCESS:
      return { ...state, loading: false, courses: action.payload.data };
    case CourseTypes.GET_COURSES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default courseReducer;

