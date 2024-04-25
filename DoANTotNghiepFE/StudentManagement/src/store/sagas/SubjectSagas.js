import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/SubjectServices';
import * as SubjectActions from '../actions/SubjectActions';
import * as SubjectTypes from '../types/SubjectTypes';

function* getSubjectsSaga() {
  try {
    const students = yield call(api.getSubjects);
    yield put(SubjectActions.getSubjectsSuccess(students));
  } catch (error) {
    yield put(SubjectActions.getSubjectsFailure(error.message));
  }
}

function* getSubjectDetailSaga(payload) {
  try {
    const students = yield call(api.getSubjectDetail, payload.payload);
    yield put(SubjectActions.getSubjectDetailSuccess(students));
  } catch (error) {
    yield put(SubjectActions.getSubjectDetailFailure(error.message));
  }
}


function* createSubjectSaga(payload) {
  try {
    const data = yield call(api.createSubject, payload.payload);
    yield put(SubjectActions.createSubjectSuccess(data));
    yield put(SubjectActions.getSubjectsRequest());
  } catch (error) {
    yield put(SubjectActions.createSubjectFailure(error.message));
  }
}


function* editSubjectSaga(payload) {
  try {
    const data = yield call(api.updateSubject, payload.payload);
    yield put(SubjectActions.editSubjectSuccess(data));
    yield put(SubjectActions.getSubjectsRequest());
  } catch (error) {
    yield put(SubjectActions.editSubjectFailure(error.message));
  }
}


function* deleteSubjectSaga(payload) {
  try {
    const data = yield call(api.deleteSubject, payload.payload);
    yield put(SubjectActions.deleteSubjectSuccess(data));
    yield put(SubjectActions.getSubjectsRequest());
  } catch (error) {
    yield put(SubjectActions.deleteSubjectFailure(error.message));
  }
}

function* getListSemesterSaga() {
  try {
    const semesters = yield call(api.getListSemester);
    yield put(SubjectActions.getListSemesterSuccess(semesters));
  } catch (error) {
    yield put(SubjectActions.getListSemesterFailure(error.message));
  }
}

function* getSubjectByIdSaga(payload) {
  try {
    const subject = yield call(api.getSubjectDetailById, payload.payload);
    yield put(SubjectActions.getSubjectDetailByIdSuccess(subject));
  } catch (error) {
    yield put(SubjectActions.getSubjectDetailByIdFailure(error.message));
  }
}

export default function* subjectWatcherSaga() {
  yield takeLatest(SubjectTypes.GET_SUBJECTS_REQUEST, getSubjectsSaga);
  yield takeLatest(SubjectTypes.GET_SUBJECT_DETAIL_REQUEST, getSubjectDetailSaga);
  yield takeLatest(SubjectTypes.CREATE_SUBJECT_REQUEST, createSubjectSaga);
  yield takeLatest(SubjectTypes.EDIT_SUBJECT_REQUEST, editSubjectSaga);
  yield takeLatest(SubjectTypes.DELETE_SUBJECT_REQUEST, deleteSubjectSaga);
  yield takeLatest(SubjectTypes.GET_LIST_SEMESTER_REQUEST, getListSemesterSaga);
  yield takeLatest(SubjectTypes.GET_SUBJECT_DETAIL_BY_ID_REQUEST, getSubjectByIdSaga);
}
