import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/AuthServices';
import * as AuthActions from '../actions/AuthActions';
import * as AuthTypes from '../types/AuthTypes';

function* loginSaga(action) {
  try {
    const response = yield call(api.login, action.payload);
    yield put(AuthActions.loginSuccess(response));
  } catch (error) {
    yield put(AuthActions.loginFailure(error.message));
  }
}

function* logoutSaga() {
  try {
    yield put(AuthActions.logoutSuccess());
  } catch (error) {
    yield put(AuthActions.logoutFailure(error.message));
  }
}

function* watchAuthSaga() {
  yield takeEvery(AuthTypes.LOGIN_REQUEST, loginSaga);
  yield takeEvery(AuthTypes.LOGOUT_REQUEST, logoutSaga);
}

export default watchAuthSaga;
