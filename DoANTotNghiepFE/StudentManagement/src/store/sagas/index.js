import { all } from 'redux-saga/effects';
import studentSagas from './StudentSagas';
import authSagas from './AuthSagas';
import watchCourseSaga from './CourseSagas';
import watchClassSaga from './ClassSagas';
import subjectWatcherSaga from './SubjectSagas';
import uploadWatcherSaga from './UploadSagas';
import pointInputWatcherSaga from './PointInputSagas';
import teacherSagas from './TeacherSagas';

export default function* rootSaga() {
  yield all([
    studentSagas(),
    authSagas(),
    watchCourseSaga(),
    watchClassSaga(),
    subjectWatcherSaga(),
    uploadWatcherSaga(),
    pointInputWatcherSaga(),
    teacherSagas(),
  ]);
}