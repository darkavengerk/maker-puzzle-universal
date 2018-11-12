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

export function addOwnCompany(userid, name, cb) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const res = await Maker().addOwnCompany({id:userid, data: { name }});
    
    if (res.status === 200) {
      dispatch({type:types.OWNER_ADDED_COMPANY, data: res.data});
      if(cb) cb();
    }
    return res;
  };
}

export function changePortfoiloOrder(oldIndex, index) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const res = await Maker().changePortfoiloOrder({id: user.account.userid, data: { oldIndex, index }});
    
    if (res.status === 200) {
      dispatch({type:types.REQUEST_SUCCESS, data: {maker: res.data}});
    }
    else {
      // dispatch({type:types.PROFILE_EDIT_FAILURE});
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
    const { user, maker } = getState();
    const id = (portfolio.user && portfolio.user.userid)? portfolio.user.userid : user.account.userid;
    const res = await Maker().submitPortfolio({id, data:portfolio});
    if (res.status === 200) {
      dispatch({type:types.PORTFOLIO_EDIT_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.PORTFOLIO_EDIT_FAILURE});
    } 
    return res;
  };
}

export function deletePortfoilo(portfolio) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const res = await Maker().deletePortfolio({id:user.account.userid, pid:portfolio.pid});
    if (res.status === 200 && !res.data.error) {
      dispatch({type:types.PORTFOLIO_DELETE_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.PORTFOLIO_DELETE_FAILURE, data: res.data});
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

