import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/CourseServices';
import * as CourseActions from '../actions/CourseActions';
import * as CourseTypes from '../types/CourseTypes';

function* getListCourseSaga(action) {
  try {
    const response = yield call(api.getListCourse, action.payload);
    yield put(CourseActions.getListCourseSuccess(response));
  } catch (error) {
    yield put(CourseActions.getListCourseFailure(error.message));
  }
}

function* watchCourseSaga() {
  yield takeEvery(CourseTypes.GET_COURSES_REQUEST, getListCourseSaga);
}

export default watchCourseSaga;
