import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';

const maker = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
      return action.data;
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.maker) return action.data.maker;
      return state;
    case types.PROFILE_EDIT_SUCCESS:
      const data = action.data;
      return {...state, features: data.features, about: data.about, profile: data.profile}
    default:
      return state;
  }
};

const reducer = combineReducers({
  maker
});

export default reducer;

