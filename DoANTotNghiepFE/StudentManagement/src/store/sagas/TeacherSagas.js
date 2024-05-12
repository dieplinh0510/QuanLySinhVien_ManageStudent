import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/TeacherServices';
import * as TeacherActions from '../actions/TeacherActions';
import * as TeacherTypes from '../types/TeacherTypes';
import { getAllStudent } from '../../api/TeacherServices';

function* getAllTeacherSaga(action) {
  try {
    const response = yield call(api.searchTeachers, action.payload);
    yield put(TeacherActions.getAllTeacherSuccess(response));
  } catch (error) {
    yield put(TeacherActions.getAllTeacherFailure(error.message));
  }
}

function* createTeacherSaga(action) {
  try {
    const response = yield call(api.createTeacher, action.payload);
    yield put(TeacherActions.createTeacherSuccess(response));
    yield put(TeacherActions.getAllTeacherRequest(action.payload.searchPayload))
  } catch (error) {
    yield put(TeacherActions.createTeacherFailure(error.message));
  }
}

function* updateTeacherSaga(action) {
  try {
    const response = yield call(api.updateTeacher, action.payload);
    yield put(TeacherActions.updateTeacherSuccess(response));
    yield put(TeacherActions.getAllTeacherRequest(action.payload.searchPayload))
  } catch (error) {
    yield put(TeacherActions.updateTeacherFailure(error.message));
  }
}

// API get all my class
function* searchMyClassesSaga(action) {
  try {
    const response = yield call(api.searchMyClasses, action.payload);
    yield put(TeacherActions.searchMyClassesSuccess(response));
  } catch (error) {
    yield put(TeacherActions.searchMyClassesFailure(error.message));
  }
}

function* watchTeacherSaga() {
  yield takeEvery(TeacherTypes.GET_ALL_TEACHERS_REQUEST, getAllTeacherSaga);
  yield takeEvery(TeacherTypes.CREATE_TEACHER_REQUEST, createTeacherSaga);
  yield takeEvery(TeacherTypes.UPDATE_TEACHER_REQUEST, updateTeacherSaga);
  yield takeEvery(TeacherTypes.SEARCH_MY_CLASSES_REQUEST, searchMyClassesSaga);
}

export default watchTeacherSaga;
