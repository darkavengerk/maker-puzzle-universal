import * as types from '../types';
import { Main } from '../services';

export function loadMoreData(data) {
  return async (dispatch, getState) => {
    const res = await Main().loadMore(data);
    
    if (res.status === 200) {
      dispatch({type:types.LOAD_MORE_DATA, data: res.data});
    }
    else {
    } 
    return res;
  };
}

export function loadSearchData(data, cb) {
  return async (dispatch, getState) => {
    const res = await Main().loadSearch(data);
    
    if (res.status === 200) {
      dispatch({type:types.LOAD_SEARCH_DATA, data: res.data});
      if(cb) cb(res);
    }
    else {
    } 
    return res;
  };
}

export function notifyBrowser(data) {
  return async (dispatch, getState) => {
    dispatch({type:types.NOTIFY_BROWSER, data});
  };
}

