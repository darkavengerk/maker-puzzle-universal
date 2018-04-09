import { combineReducers } from 'redux';
import * as types from '../types';

const files = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.UPLOADER_FILE_SELECTED:
      return [...state, action.file];
    default:
      return state;
  }
};

const combined = combineReducers({
  files
});

export default combined;
