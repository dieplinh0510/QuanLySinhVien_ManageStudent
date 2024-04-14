import { all } from 'redux-saga/effects';
import studentSagas from './StudentSagas';
import authSagas from './AuthSagas';

export default function* rootSaga() {
  yield all([
    studentSagas(),
    authSagas(),
  ]);
}