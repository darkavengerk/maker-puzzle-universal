import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';

const project = (
  state = {},
  action
) => {
  switch (action.type) {
    
    case types.CREATE_REQUEST:
      return {};
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.project) return action.data.project;
      return state;

    default:
      return state;
  }
};

const reducer = combineReducers({
  project
});

export default reducer;

