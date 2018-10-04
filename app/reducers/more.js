import { combineReducers } from 'redux';
import * as types from '../types';


const more = (
  state = { hasMore: false },
  action
) => {
  switch (action.type) {      
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.more) return {...action.data.more, hasMore: true};
      return state;
    case types.LOAD_MORE_DATA:
      const topic = action.data.topic;
      return {...state, [topic]: state[topic].concat(action.data[topic]), hasMore: action.data[topic].length > 0};
    default:
      return state;
  }
};

// const reducer = combineReducers(more);

export default more;

