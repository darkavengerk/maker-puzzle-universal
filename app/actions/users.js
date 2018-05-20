import { push } from 'react-router-redux';
import { authService } from '../services';

import * as types from '../types';

function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message, data) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    data
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message, data) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message,
    data
  };
}

function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin(data) {
  return async (dispatch) => {
    dispatch(beginLogin());

    try {
      const response = await authService().login(data);
      dispatch(loginSuccess('You have been successfully logged in', response.data));
      dispatch(push('/maker/'+response.data.userid));
    }
    catch(err) {
      dispatch(loginError('Oops! Invalid username or password'));
    }
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return authService().signUp(data)
      .then((response) => {
          dispatch(signUpSuccess('You have successfully registered an account!', data));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then((response) => {
          dispatch(logoutSuccess());
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
}
