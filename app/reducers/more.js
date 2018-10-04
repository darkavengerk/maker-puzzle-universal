import { combineReducers } from 'redux';
import * as types from '../types';


const more = (
  state = {},
  action
) => {
  switch (action.type) {      
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.more) return action.data.more;
      return state;
    default:
      return state;
  }
};

// const reducer = combineReducers(more);

export default more;

