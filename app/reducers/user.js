import { combineReducers } from 'redux';
import * as types from '../types';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const attempt = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGIN_MENU:
      return 'login';
    case types.SIGNUP_MENU:
      return 'signup';
    case types.PORTFOLIO_EDITOR_START:
      return 'edit:portfolio'
    case types.PRODUCT_EDITOR_START:
      return 'edit:product'

    case types.PORTFOLIO_EDITOR_CANCEL:
    case types.PORTFOLIO_EDIT_SUCCESS:
    case types.COMPANY_PORTFOLIO_EDITOR_CANCEL:
    case types.COMPANY_PORTFOLIO_EDIT_SUCCESS:
    case types.PRODUCT_EDITOR_CANCEL:
    case types.PRODUCT_EDIT_SUCCESS:
    case types.CANCEL_LOGIN:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.DISMISS_MESSAGE:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const account = (
  state = {},
  action
) => {
  const user = action.data;
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return user;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return {};
    case types.PROFILE_EDIT_SUCCESS:
      const {features, about, picture, companyProfile} = action.data;
      return {...state, features, about, picture, companyProfile}
    case types.FOLLOWERS_UPDATED:
      if(action.data.follower.userid === state.userid)
        return {...state, followings: action.data.follower.followings};
      if(action.data.following.userid === state.userid)
        return {...state, followers: action.data.following.followers};
      return state;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  message,
  account,
  attempt
});

export default userReducer;
