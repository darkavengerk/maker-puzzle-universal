import * as types from '../types';
import { Maker } from '../services';

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

export function productEditorStart() {
  return {
    type: types.PRODUCT_EDITOR_START
  }
}

export function productEditorCancel() {
  return {
    type: types.PORTFOLIO_EDITOR_CANCEL
  }
}

export function portfoiloSubmit(portfolio) {
  return async (dispatch, getState) => {
    const { maker, user } = getState();
    const res = await Maker().submitPortfolio({id:maker.maker.userid, data:portfolio});
    if (res.status === 200) {
      dispatch({type:types.PORTFOLIO_EDIT_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.PORTFOLIO_EDIT_FAILURE});
    } 
    return res;
  };
}

export function productSubmit(product) {
  return async (dispatch, getState) => {
    const { company, user } = getState();
    const res = await Maker().submitProduct({id:user.account.userid, data:product});
    if (res.status === 200) {
      dispatch({type:types.PRODUCT_EDIT_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.PRODUCT_EDIT_FAILURE});
    } 
    return res;
  };
}