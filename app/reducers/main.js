import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';
import { Maker } from '../utils/objects';


const main = (
  state = {},
  action
) => {
  switch (action.type) {      
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.main) return action.data.main;
      return state;
    default:
      return state;
  }
};

// const reducer = combineReducers(main);

export default main;

