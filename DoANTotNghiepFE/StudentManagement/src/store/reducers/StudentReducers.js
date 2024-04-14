import * as CategoryTypes from '../types/StudentTypes';

const initialState = {
  students: [],
  loading: false,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CategoryTypes.GET_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CategoryTypes.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case CategoryTypes.GET_STUDENTS_FAILURE:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
