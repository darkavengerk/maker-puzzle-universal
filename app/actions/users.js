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

export function cancelLogin() {
  return { type: types.CANCEL_LOGIN };
}

export function loginMenu() {
  return { type: types.LOGIN_MENU };
}

export function manualLogin(data) {
  return async (dispatch) => {
    dispatch(beginLogin());
    try {
      const {data: user} = await authService().login(data);
      dispatch(loginSuccess('You have been successfully logged in', user));
      // dispatch(push(`/${user.type}/${user.userid}`));
    }
    catch(err) {
      alert('Oops! Invalid username or password');
      dispatch(loginError(''));
    }
  };
}

export function signUp(data) {
  const checklist = ['name', 'email', 'password', 'passwordCheck', 'gender', 'year', 'agreed'];

  return async dispatch => {
    for(let check of checklist) {
      if(!data[check]) {
        alert('Fill up all the required information.');
        return;
      }
    }
    if(data.password !== data.passwordCheck) {
      alert('Password incorrect.');
      return;
    }

    data.birthYear = data.year.value;

    dispatch(beginSignUp());
    try {
      const {data: newUser} = await authService().signUp(data);
      alert('You have successfully registered an account!');
      dispatch(signUpSuccess('', newUser));
      // dispatch(push('/'));
    }
    catch(err) {
      alert('Oops! Something went wrong when signing up');
      dispatch(signUpError(''));
    }
  };
}

export function logOut() {
  return async (dispatch) => {
    dispatch(beginLogout());

    try {
      const response = await authService().logOut();
      dispatch(logoutSuccess());
      return response;
    }
    catch(err) {
      dispatch(logoutError());
    }
  };
}
