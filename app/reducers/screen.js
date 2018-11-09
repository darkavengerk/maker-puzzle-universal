import { combineReducers } from 'redux';
import * as types from '../types';


const screen = (
  state = 'normal',
  action
) => {
  switch (action.type) {      
    case types.SHOWING_POPUP:
      if (action.data) {
        return 'popup'
      }
      return 'normal';
    default:
      return state;
  }
};

export default screen;

