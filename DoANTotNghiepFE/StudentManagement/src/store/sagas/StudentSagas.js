import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/StudentServices';
import * as StudentActions from '../actions/StudentActions';
import * as StudentTypes from '../types/StudentTypes';
import { getStudentAccumulatePointFailure, getStudentAccumulatePointRequest } from '../actions/StudentActions';
import { getAccumulatedPoint } from '../../api/StudentServices';

function* getAllStudentSaga() {
  try {
    const students = yield call(api.getAllStudent);
    yield put(StudentActions.getAllStudentSuccess(students));
  } catch (error) {
    yield put(StudentActions.getAllStudentFailure(error.message));
  }
}


function* searchStudentSaga(payload) {
  try {
    const students = yield call(api.search, payload.payload);
    yield put(StudentActions.searchStudentSuccess(students));
  } catch (error) {
    yield put(StudentActions.searchStudentFailure(error.message));
  }
}


function* createStudentSaga(payload) {
  try {
    const data = yield call(api.createStudent, payload.payload);
    yield put(StudentActions.createStudentSuccess(data));
  } catch (error) {
    yield put(StudentActions.createStudentFailure(error.message));
  }
}


function* editStudentSaga(payload) {
  try {
    const data = yield call(api.editStudent, payload.payload.payload);
    yield put(StudentActions.editStudentSuccess(data));
    yield put(StudentActions.searchStudentRequest(payload.payload.payloadSearch));
  } catch (error) {
    yield put(StudentActions.editStudentFailure(error.message));
  }
}


function* deleteStudentSaga(payload) {
  try {
    const data = yield call(api.deleteStudent, payload.payload.payload);
    yield put(StudentActions.deleteStudentSuccess(data));
    yield put(StudentActions.searchStudentRequest(payload.payload.payloadSearch));
  } catch (error) {
    yield put(StudentActions.deleteStudentFailure(error.message));
  }
}


function* getStudentDetailByIdSaga(payload) {
  try {
    const data = yield call(api.getStudentDetailById, payload.payload);
    yield put(StudentActions.getStudentDetailByIdSuccess(data));
  } catch (error) {
    yield put(StudentActions.getStudentDetailByIdFailure(error.message));
  }
}


function* getStudentMarkByIdSaga(payload) {
  try {
    const data = yield call(api.getStudentMarkById, payload.payload);
    yield put(StudentActions.getStudentMarkByIdSuccess(data));
  } catch (error) {
    yield put(StudentActions.getStudentMarkByIdFailure(error.message));
  }
}


// get accumulate point
function* getAccumulatedPointSaga(payload) {
  try {
    const data = yield call(api.getAccumulatedPoint, payload.payload);
    yield put(StudentActions.getStudentAccumulatePointSuccess(data));
  } catch (error) {
    yield put(StudentActions.getStudentAccumulatePointFailure(error.message));
  }
}

// getStudentDetailByStudentCode
function* getStudentDetailByStudentCodeSaga(payload) {
  try {
    const data = yield call(api.getStudentDetailByStudentCode, payload.payload);
    yield put(StudentActions.getStudentDetailByStudentCodeSuccess(data));
  } catch (error) {
    yield put(StudentActions.getStudentDetailByStudentCodeFailure(error.message));
  }
}

// Get all class to register
function* getAllClassToRegisterSaga(payload) {
  try {
    const data = yield call(api.getAllClassToRegister, payload.payload);
    yield put(StudentActions.getAllClassToRegisterSuccess(data));
  } catch (error) {
    yield put(StudentActions.getAllClassToRegisterFailure(error.message));
  }
}

// Get all subject to register
function* getAllSubjectToRegisterSaga(payload) {
  try {
    const data = yield call(api.getAllSubjectToRegister, payload.payload);
    yield put(StudentActions.getAllSubjectToRegisterSuccess(data));
  } catch (error) {
    yield put(StudentActions.getAllSubjectToRegisterFailure(error.message));
  }
}

export default function* studentWatcherSaga() {
  yield takeLatest(StudentTypes.GET_STUDENTS_REQUEST, getAllStudentSaga);
  yield takeLatest(StudentTypes.SEARCH_STUDENTS_REQUEST, searchStudentSaga);
  yield takeLatest(StudentTypes.CREATE_STUDENT_REQUEST, createStudentSaga);
  yield takeLatest(StudentTypes.EDIT_STUDENT_REQUEST, editStudentSaga);
  yield takeLatest(StudentTypes.DELETE_STUDENT_REQUEST, deleteStudentSaga);
  yield takeLatest(StudentTypes.GET_STUDENT_DETAIL_BY_ID_REQUEST, getStudentDetailByIdSaga);
  yield takeLatest(StudentTypes.GET_STUDENT_MARK_BY_ID_REQUEST, getStudentMarkByIdSaga);
  yield takeLatest(StudentTypes.GET_STUDENT_ACCUMULATE_POINT_REQUEST, getAccumulatedPointSaga);
  yield takeLatest(StudentTypes.GET_STUDENT_DETAIL_BY_STUDENT_CODE_REQUEST, getStudentDetailByStudentCodeSaga);
  yield takeLatest(StudentTypes.GET_ALL_CLASS_TO_REGISTER_REQUEST, getAllClassToRegisterSaga);
  yield takeLatest(StudentTypes.GET_ALL_SUBJECT_TO_REGISTER_REQUEST, getAllSubjectToRegisterSaga);
}
