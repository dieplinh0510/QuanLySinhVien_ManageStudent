import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/PointInputServices';
import * as PointInputActions from '../actions/PointInputActions';
import * as PointInputTypes from '../types/PointInputTypes';

// API get all student in classroom
function* getAllStudentInClassSaga(payload) {
  try {
    const data = yield call(api.getAllStudent, payload.payload);
    yield put(PointInputActions.getStudentColumnSuccess(data));
  } catch (error) {
    yield put(PointInputActions.getStudentColumnFailure(error.message));
  }
}
// API get all classroom
function* getAllClassroomSaga() {
  try {
    const data = yield call(api.getAllClassroom);
    yield put(PointInputActions.getAllClassroomSuccess(data));
  } catch (error) {
    yield put(PointInputActions.getAllClassroomFailure(error.message));
  }
}

// API edit point
function* editPointSaga(payload) {
  try {
    yield call(api.editPoint, payload.payload);
    yield put(PointInputActions.editPointSuccess());
    // Call get all student in class
    console.log(payload.payload.searchPayload)
    yield put(PointInputActions.getStudentColumnRequest(payload.payload.searchPayload));
  } catch (error) {
    yield put(PointInputActions.editPointFailure(error.message));
  }
}

// API delete point
function* deletePointSaga(payload) {
  try {
    yield call(api.deletePoint, payload.payload);
    yield put(PointInputActions.deletePointSuccess());
    // Call get all student in class
    yield put(PointInputActions.getStudentColumnRequest({
      classroomCode: payload.payload.classroomCode
    }));
  } catch (error) {
    yield put(PointInputActions.deletePointFailure(error.message));
  }
}

export default function* pointInputWatcherSaga() {
  yield takeLatest(PointInputTypes.GET_ALL_STUDENT_REQUEST, getAllStudentInClassSaga);
  yield takeLatest(PointInputTypes.GET_ALL_CLASSROOM_REQUEST, getAllClassroomSaga);
  yield takeLatest(PointInputTypes.EDIT_POINT_REQUEST, editPointSaga);
  yield takeLatest(PointInputTypes.DELETE_POINT_REQUEST, deletePointSaga);
}