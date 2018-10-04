import { combineReducers } from 'redux';
import * as types from '../types';


const search = (
  state = {},
  action
) => {
  switch (action.type) {      
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.search) return action.data.search;
      return state;
    default:
      return state;
  }
};

// const reducer = combineReducers(search);

export default search;

