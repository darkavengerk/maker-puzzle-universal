import { combineReducers } from 'redux';
import * as types from '../types';


const more = (
  state = { hasMore: false },
  action
) => {
  switch (action.type) {      
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.more) {
        const { more } = action.data;
        if(state[more.topic] && state[more.topic][more.subtype] && state[more.topic][more.subtype].length >= 0) {
          return {...state, topic: more.topic, subtype: more.subtype, title: more.title, hasMore: true};
        }
        const subset = {...(state[more.topic] || {})};
        subset[more.subtype] = more.result;
        return {...state, [more.topic]: subset, hasMore: true, topic: more.topic, subtype: more.subtype, title: more.title};
      }
      return state;
    case types.LOAD_MORE_DATA:
      const { title, topic, subtype, result } = action.data;
      const subset = {...(state[topic] || {})};
      subset[subtype] = (subset[subtype] || []).concat(result);
      return {...state, [topic]: subset, hasMore: result.length > 0, topic, subtype, title};
    default:
      return state;
  }
};

// const reducer = combineReducers(more);

export default more;

