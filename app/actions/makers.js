import * as types from '../types';
import { Maker, Company } from '../services';

export function featureEditSave(data) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const res = await Maker().updateMakerFeatures({id:user.account.userid, data});
    
    if (res.status === 200) {
      dispatch({type:types.PROFILE_EDIT_SUCCESS, data});
    }
    else {
      dispatch({type:types.PROFILE_EDIT_FAILURE});
    } 
    return res;
  };

}

export function portfoiloEditorStart() {
  return {
    type: types.PORTFOLIO_EDITOR_START
  }
}

export function portfoiloEditorCancel() {
  return {
    type: types.PORTFOLIO_EDITOR_CANCEL
  }
}

export function updateContext(data) {
  return {
    type: types.UPDATE_MAKER_CONTEXT, data
  }
}

export function portfoiloSubmit(portfolio) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const res = await Maker().submitPortfolio({id:user.account.userid, data:portfolio});
    if (res.status === 200) {
      dispatch({type:types.PORTFOLIO_EDIT_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.PORTFOLIO_EDIT_FAILURE});
    } 
    return res;
  };
}

export function follow(data) {
  return async (dispatch, getState) => {
    const res = await Maker().follow({id: data.follower.userid, data: data.following});
    if (res.status === 200) {
      dispatch({type:types.FOLLOWERS_UPDATED, data: res.data});
    }
    else {
      console.log(res);
    } 
    return res;
  };
}

export function unfollow(data) {
  return async (dispatch, getState) => {
    const res = await Maker().unfollow({id: data.follower.userid, data: data.following});
    if (res.status === 200) {
      dispatch({type:types.FOLLOWERS_UPDATED, data: res.data});
    }
    else {
      console.log(res);
    } 
    return res;
  };
}

