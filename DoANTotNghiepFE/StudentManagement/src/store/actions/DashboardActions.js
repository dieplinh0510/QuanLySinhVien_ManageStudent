import * as DashboardActions from '../types/DashboardTypes';

// API get statistical-point
export const getStatisticalPointRequest = (payload) => ({
  type: DashboardActions.GET_STATISTICAL_POINT_REQUEST,
  payload: payload,
});

export const getStatisticalPointSuccess = (data) => ({
  type: DashboardActions.GET_STATISTICAL_POINT_SUCCESS,
  payload: { data },
});

export const getStatisticalPointFailure = (error) => ({
  type: DashboardActions.GET_STATISTICAL_POINT_FAILURE,
  payload: error,
});

// API get statistical-point student
export const getStatisticalPointStudentRequest = (payload) => ({
  type: DashboardActions.GET_STATISTICAL_POINT_STUDENT_REQUEST,
  payload: payload,
});

export const getStatisticalPointStudentSuccess = (data) => ({
  type: DashboardActions.GET_STATISTICAL_POINT_STUDENT_SUCCESS,
  payload: { data },
});

export const getStatisticalPointStudentFailure = (error) => ({
  type: DashboardActions.GET_STATISTICAL_POINT_STUDENT_FAILURE,
  payload: error,
});
