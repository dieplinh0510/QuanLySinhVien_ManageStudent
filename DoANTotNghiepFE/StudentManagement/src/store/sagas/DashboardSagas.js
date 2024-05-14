import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/DashboardServices';
import * as DashboardActions from '../actions/DashboardActions';
import * as DashboardTypes from '../types/DashboardTypes';

// API get statistical-point
function* getStatisticalPointSaga(payload) {
  try {
    const data = yield call(api.getStatisticalPoint, payload.payload);
    yield put(DashboardActions.getStatisticalPointSuccess(data));
  } catch (error) {
    yield put(DashboardActions.getStatisticalPointFailure(error.message));
  }
}

// API get statistical-point student
function* getStatisticalPointStudentSaga(payload) {
  try {
    const data = yield call(api.getStatisticalPointStudent, payload.payload);
    yield put(DashboardActions.getStatisticalPointStudentSuccess(data));
  } catch (error) {
    yield put(DashboardActions.getStatisticalPointStudentFailure(error.message));
  }
}


export default function* dashboardWatcherSaga() {
  yield takeLatest(DashboardTypes.GET_STATISTICAL_POINT_REQUEST, getStatisticalPointSaga);
  yield takeLatest(DashboardTypes.GET_STATISTICAL_POINT_STUDENT_REQUEST, getStatisticalPointStudentSaga);
}