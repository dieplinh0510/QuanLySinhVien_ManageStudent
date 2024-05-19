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

function* changePasswordSaga(action) {
  try {
    const response = yield call(api.changePassword, action.payload);
    yield put(AuthActions.changePasswordSuccess(response));
  } catch (error) {
    yield put(AuthActions.changePasswordFailure(error.message));
  }
}

function* registerSaga(action) {
  try {
    const response = yield call(api.register, action.payload);
    yield put(AuthActions.registerSuccess(response));
  } catch (error) {
    yield put(AuthActions.registerFailure(error.message));
  }
}

// API forgot password
function* forgotPasswordSaga(action) {
  try {
    const response = yield call(api.forgotPassword, action.payload);
    yield put(AuthActions.forgotPasswordSuccess(response));
  } catch (error) {
    yield put(AuthActions.forgotPasswordFailure(error.message));
  }
}

// API OTP
function* otpSaga(action) {
  try {
    const response = yield call(api.otp, action.payload);
    yield put(AuthActions.otpSuccess(response));
  } catch (error) {
    yield put(AuthActions.otpFailure(error.message));
  }
}

// OTP change
function* otpChangeSaga(action) {
  yield put(AuthActions.otpChange(action.payload));
}

// API change password with OTP
function* changePasswordWithOtpSaga(action) {
  try {
    const response = yield call(api.changePasswordWithOtp, action.payload);
    yield put(AuthActions.changePasswordOtpSuccess(response));
  } catch (error) {
    yield put(AuthActions.changePasswordOtpFailure(error.message));
  }
}


function* watchAuthSaga() {
  yield takeEvery(AuthTypes.LOGIN_REQUEST, loginSaga);
  yield takeEvery(AuthTypes.LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(AuthTypes.CHANGE_PASSWORD_REQUEST, changePasswordSaga);
  yield takeEvery(AuthTypes.REGISTER_REQUEST, registerSaga);
  yield takeEvery(AuthTypes.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeEvery(AuthTypes.OTP_REQUEST, otpSaga);
  yield takeEvery(AuthTypes.OTP_CHANGE, otpChangeSaga);
  yield takeEvery(AuthTypes.CHANGE_PASSWORD_OTP_REQUEST, changePasswordWithOtpSaga);
}

export default watchAuthSaga;
