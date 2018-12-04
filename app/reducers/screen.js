import { combineReducers } from 'redux';
import * as types from '../types';


const screen = (
  state = {showing: 'normal', loadingCount: 0},
  action
) => {
  switch (action.type) {      
    case types.REQUEST_SUCCESS:
      return {...state, loadingCount: state.loadingCount + 1}
    case types.SHOWING_POPUP:
      if (action.data) {
        return {...state, showing: 'popup'};
      }
      return {...state, showing: 'normal'};;
    default:
      return state;
  }
};

export default screen;
