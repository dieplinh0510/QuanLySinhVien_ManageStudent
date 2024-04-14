import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/StudentServices';
import * as StudentActions from '../actions/StudentActions';
import * as StudentTypes from '../types/StudentTypes';

function* getAllStudentSaga() {
  try {
    const students = yield call(api.getAllStudent);
    yield put(StudentActions.getAllStudentSuccess(students));
  } catch (error) {
    yield put(StudentActions.getAllStudentFailure(error.message));
  }
}

export default function* studentWatcherSaga() {
  yield takeLatest(StudentTypes.GET_STUDENTS_REQUEST, getAllStudentSaga);
}
