import { combineReducers } from 'redux';
import * as types from '../types';


const search = (
  state = {
    result:{
      portfolios:[],
      total: 0
    },
    hasMore: false
  },
  action
) => {
  switch (action.type) {      
    case types.CREATE_REQUEST:
      return {...state, loading: true};
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.search) {
        return {...action.data.search, loading: false, hasMore: true};
        // return {result:{portfolios:[], total:0}, loading: false, hasMore: true};
      }
      else return state;
    case types.LOAD_SEARCH_DATA:
      const data = action.data.result.portfolios;
      const newState = {...state, hasMore: data.length > 0};
      const portfolios = [...state.result.portfolios, ...data];
      newState.result.portfolios = portfolios;
      return newState;
    default:
      return state;
  }
};

export default search;

