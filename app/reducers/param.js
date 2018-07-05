import { combineReducers } from 'redux';
import * as types from '../types';

const param = (
  state = {},
  action
) => {
  switch (action.type) {
    
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.param) return action.data.param;
      return state;
    case types.CREATE_REQUEST:
      return {};

    default:
      return state;
  }
};

export default param;

