import * as AuthTypes from '../types/AuthTypes';

export const loginRequest = (payload) => ({
  type: AuthTypes.LOGIN_REQUEST,
  payload: payload,
});

export const loginSuccess = (data) => ({
  type: AuthTypes.LOGIN_SUCCESS,
  payload: { data },
});

export const loginFailure = (error) => ({
  type: AuthTypes.LOGIN_FAILURE,
  payload: error,
});


// Logout
export const logoutRequest = () => ({
  type: AuthTypes.LOGOUT_REQUEST,
  payload: {},
});

export const logoutSuccess = () => ({
  type: AuthTypes.LOGOUT_SUCCESS,
  payload: {},
});

export const logoutFailure = (error) => ({
  type: AuthTypes.LOGOUT_FAILURE,
  payload: error,
});

// Change password
export const changePasswordRequest = (payload) => ({
  type: AuthTypes.CHANGE_PASSWORD_REQUEST,
  payload: payload,
});

export const changePasswordSuccess = (data) => ({
  type: AuthTypes.CHANGE_PASSWORD_SUCCESS,
  payload: { data },
});

export const changePasswordFailure = (error) => ({
  type: AuthTypes.CHANGE_PASSWORD_FAILURE,
  payload: error,
});

// Register
export const registerRequest = (payload) => ({
  type: AuthTypes.REGISTER_REQUEST,
  payload: payload,
});

export const registerSuccess = (data) => ({
  type: AuthTypes.REGISTER_SUCCESS,
  payload: { data },
});

export const registerFailure = (error) => ({
  type: AuthTypes.REGISTER_FAILURE,
  payload: error,
});

// API forgot password
export const forgotPasswordRequest = (payload) => ({
  type: AuthTypes.FORGOT_PASSWORD_REQUEST,
  payload: payload,
});

export const forgotPasswordSuccess = (data) => ({
  type: AuthTypes.FORGOT_PASSWORD_SUCCESS,
  payload: { data },
});

export const forgotPasswordFailure = (error) => ({
  type: AuthTypes.FORGOT_PASSWORD_FAILURE,
  payload: error,
});

// API OTP
export const otpRequest = (payload) => ({
  type: AuthTypes.OTP_REQUEST,
  payload: payload,
});

export const otpSuccess = (data) => ({
  type: AuthTypes.OTP_SUCCESS,
  payload: { data },
});

export const otpFailure = (error) => ({
  type: AuthTypes.OTP_FAILURE,
  payload: error,
});

export const otpChange = (data) => ({
  type: AuthTypes.OTP_CHANGE,
  payload: { data },
});

// API change password with OTP
export const changePasswordOtpRequest = (payload) => ({
  type: AuthTypes.CHANGE_PASSWORD_OTP_REQUEST,
  payload: payload,
});

export const changePasswordOtpSuccess = (data) => ({
  type: AuthTypes.CHANGE_PASSWORD_OTP_SUCCESS,
  payload: { data },
});

export const changePasswordOtpFailure = (error) => ({
  type: AuthTypes.CHANGE_PASSWORD_OTP_FAILURE,
  payload: error,
});
