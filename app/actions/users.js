import { push } from 'react-router-redux';
import { authService } from '../services';

import * as types from '../types';

function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

export function showingPopup(data) {
  return { type: types.SHOWING_POPUP, data };
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
      alert('잘못된 로그인 정보입니다');
      dispatch(loginError(''));
    }
  };
}

export function signUp(data) {
  const checklist = ['name', 'email', 'password', 'passwordCheck', 'gender', 'year', 'agreed'];

  return async dispatch => {
    for(let check of checklist) {
      if(!data[check]) {
        alert('모든 항목을 채워주세요');
        return;
      }
    }
    if(data.password !== data.passwordCheck) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    data.birthYear = data.year.value;

    dispatch(beginSignUp());
    try {
      const {data: newUser} = await authService().signUp(data);
      alert('회원가입 완료!');
      dispatch(signUpSuccess('', newUser));
      dispatch(push('/maker/' + newUser.userid));
    }
    catch(err) {
      if(err.response.status === 409) {
        alert(data.email + ' : 이미 가입된 이메일입니다.');
      }
      else alert('내부 서버 에러: 관리자에게 문의하세요.');
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
