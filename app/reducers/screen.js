import { combineReducers } from 'redux';
import * as types from '../types';


const screen = (
  state = {showing: 'normal', prev: 'normal', loadingCount: 0},
  action
) => {
  switch (action.type) {      
    
    case types.CREATE_REQUEST:
      return {...state, showing: 'loading', prev: state.showing, loadingCount: 0};
    
    case types.REQUEST_SUCCESS:
      return {...state, showing: state.prev, loadingCount: state.loadingCount + 1}
    
    case types.NOTIFY_BROWSER:
      return {...state, browser: action.data};

    case types.SHOWING_POPUP:
      if (action.data) {
        return {...state, showing: 'popup'};
      }
      return {...state, showing: 'normal'};
    default:
      return state;
  }
};

export default screen;

