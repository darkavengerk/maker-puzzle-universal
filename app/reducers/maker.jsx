import { combineReducers } from 'redux';
import * as types from '../types';

const maker = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.maker) return action.data.maker;
      return state;
    default:
      return state;
  }
};

const reducer = combineReducers({
  maker
});

export default reducer;
