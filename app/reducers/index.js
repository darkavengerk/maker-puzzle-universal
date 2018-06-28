import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../reducers/user';
import fileUpload from '../reducers/fileUpload';
import topic from '../reducers/topic';
import message from '../reducers/message';
import people from '../reducers/people';
import maker from '../reducers/maker';
import project from '../reducers/project';
import param from '../reducers/param';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  topic,
  fileUpload,
  user,
  message,
  routing,
  people,
  maker,
  project,
  param
});

export default rootReducer;
