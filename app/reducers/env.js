import { combineReducers } from 'redux';
import * as types from '../types';
import ComponentsLoader from '../utils/ComponentsLoader';

const loader = new ComponentsLoader();
const mobileLoader = loader.mobile();
const webLoader = loader.web();

const env = (
  state = {mobile: null, loader: webLoader},
  action
) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      console.log({...state, loader: state.mobile? mobileLoader : webLoader});
      return {...state, loader: state.mobile? mobileLoader : webLoader};
    default:
      return state;
  }
};

export default env;

