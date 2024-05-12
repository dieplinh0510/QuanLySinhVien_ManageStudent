import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/ClassServices';
import * as ClassActions from '../actions/ClassActions';
import * as ClassTypes from '../types/ClassTypes';

// API get all class by subjectId
function* getListClassBySubjectSaga(action) {
  try {
    const response = yield call(api.getListClassBySubject, action.payload);
    yield put(ClassActions.getListClassInSubjectSuccess(response));
  } catch (error) {
    yield put(ClassActions.getListClassInSubjectFailure(error.message));
  }
}

// API get all class
function* getAllClassSaga() {
  try {
    const response = yield call(api.getAllClass);
    yield put(ClassActions.getAllClassSuccess(response));
  } catch (error) {
    yield put(ClassActions.getAllClassFailure(error.message));
  }
}

// API create class in subject
function* createClassInSubjectSaga(action) {
  try {
    yield call(api.createClassInSubject, action.payload);
    yield put(ClassActions.createClassInSubjectSuccess());
    yield put(ClassActions.getListClassInSubjectRequest({ subjectId: action.payload.subjectId }));
  } catch (error) {
    yield put(ClassActions.createClassInSubjectFailure(error.message));
  }
}

// API edit class in subject
function* editClassInSubjectSaga(action) {
  try {
    yield call(api.editClassInSubject, action.payload);
    yield put(ClassActions.editClassInSubjectSuccess());
    yield put(ClassActions.getListClassInSubjectRequest({ subjectId: action.payload.subjectId }));
  } catch (error) {
    yield put(ClassActions.editClassInSubjectFailure(error.message));
  }
}

// API get all teachers
function* getListTeacherSaga() {
  try {
    const response = yield call(api.getAllTeachers);
    yield put(ClassActions.getListTeacherSuccess(response));
  } catch (error) {
    yield put(ClassActions.getListTeacherFailure(error.message));
  }
}

// API get list class by course id
function* getListClassByCourseSaga(action) {
  try {
    const response = yield call(api.getListClassByCourseId, action.payload);
    yield put(ClassActions.getListClassByCourseSuccess(response));
  } catch (error) {
    yield put(ClassActions.getListClassByCourseFailure(error.message));
  }
}

// API search class by subject
function* searchClassBySubjectSaga(action) {
  try {
    const response = yield call(api.searchClassInSubject, action.payload);
    yield put(ClassActions.searchClassesBySubjectSuccess(response));
  } catch (error) {
    yield put(ClassActions.searchClassesBySubjectFailure(error.message));
  }
}

// API add student to class
function* addStudentToClassSaga(action) {
  try {
    yield call(api.addStudentToClass, action.payload);
    yield put(ClassActions.addStudentToClassSuccess());
  } catch (error) {
    yield put(ClassActions.addStudentToClassFailure(error.message));
  }
}

// API get all student in class
function* getAllStudentInClassSaga(payload) {
  try {
    const data = yield call(api.getAllStudent, payload.payload);
    yield put(ClassActions.getAllStudentInClassSuccess(data));
  } catch (error) {
    yield put(ClassActions.getAllStudentInClassFailure(error.message));
  }
}

function* watchClassSaga() {
  yield takeEvery(ClassTypes.GET_CLASSES_IN_SUBJECT_REQUEST, getListClassBySubjectSaga);
  yield takeEvery(ClassTypes.GET_ALL_CLASSES_REQUEST, getAllClassSaga);
  yield takeEvery(ClassTypes.CREATE_CLASS_IN_SUBJECT_REQUEST, createClassInSubjectSaga);
  yield takeEvery(ClassTypes.EDIT_CLASS_IN_SUBJECT_REQUEST, editClassInSubjectSaga);
  yield takeEvery(ClassTypes.GET_LIST_TEACHER_REQUEST, getListTeacherSaga);
  yield takeEvery(ClassTypes.GET_CLASSES_BY_COURSE_REQUEST, getListClassByCourseSaga);
  yield takeEvery(ClassTypes.SEARCH_CLASSES_BY_SUBJECT_REQUEST, searchClassBySubjectSaga);
  yield takeEvery(ClassTypes.ADD_STUDENT_TO_CLASS_REQUEST, addStudentToClassSaga);
  yield takeEvery(ClassTypes.GET_ALL_STUDENT_IN_CLASS_REQUEST, getAllStudentInClassSaga);
}

export default watchClassSaga;
