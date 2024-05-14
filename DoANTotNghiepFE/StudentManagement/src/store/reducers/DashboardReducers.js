import * as DashboardTypes from '../types/DashboardTypes';

const initialState = {
  loading: false,
  error: null,
  statisticsPoint: {},
  statisticsPointStudent: {},
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DashboardTypes.GET_STATISTICAL_POINT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DashboardTypes.GET_STATISTICAL_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
        statisticsPoint: action.payload.data,
      };
    case DashboardTypes.GET_STATISTICAL_POINT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DashboardTypes.GET_STATISTICAL_POINT_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DashboardTypes.GET_STATISTICAL_POINT_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        statisticsPointStudent: action.payload.data,
      };
    case DashboardTypes.GET_STATISTICAL_POINT_STUDENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;