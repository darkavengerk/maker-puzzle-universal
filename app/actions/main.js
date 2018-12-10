import * as types from '../types';
import { Main } from '../services';

export function loadMoreData(data) {
  return async (dispatch, getState) => {
    console.log(data);
    const res = await Main().loadMore(data);
    
    if (res.status === 200) {
      dispatch({type:types.LOAD_MORE_DATA, data: res.data});
    }
    else {
    } 
    return res;
  };
}

