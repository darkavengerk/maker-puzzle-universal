import { combineReducers } from 'redux';
import * as types from '../types';

const people = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.people) return action.data.people;
      return state;
    default:
      return state;
  }
};

const topicReducer = combineReducers({
  people
});

export default topicReducer;
