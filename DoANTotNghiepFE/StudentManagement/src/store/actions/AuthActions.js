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