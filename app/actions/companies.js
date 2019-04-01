import * as types from '../types';
import { Company } from '../services';

export function featureEditSave(data) {
  return async (dispatch, getState) => {
    const { company } = getState();
    const res = await Company().updateCompanyFeatures({link_name:company.company.link_name, data});
    
    if (res.status === 200) {
      dispatch({type:types.COMPANY_PROFILE_EDIT_SUCCESS, data});
    }
    else {
      dispatch({type:types.COMPANY_PROFILE_EDIT_FAILURE});
    } 
    return res;
  };
}

export function companyEditSave(company) {
  return async (dispatch, getState) => {
    const res = await Company().updateCompany({link_name:company.company.link_name, company});
    
    if (res.status === 200) {
      dispatch({type:types.COMPANY_PROFILE_EDIT_SUCCESS, data});
    }
    else {
      dispatch({type:types.COMPANY_PROFILE_EDIT_FAILURE});
    } 
    return res;
  };
}

export function changePortfoiloOrder(oldIndex, index) {
  return async (dispatch, getState) => {
    const { company } = getState();
    const res = await Company().changePortfoiloOrder({link_name: company.company.link_name, data: { oldIndex, index }});
    
    if (res.status === 200) {
      dispatch({type:types.REQUEST_SUCCESS, data: {company: res.data}});
    }
    return res;
  };
}

export function companyPortfoiloEditorStart() {
  return {
    type: types.COMPANY_PORTFOLIO_EDITOR_START
  }
}

export function companyPortfoiloEditorCancel() {
  return {
    type: types.COMPANY_PORTFOLIO_EDITOR_CANCEL
  }
}

export function productEditorStart() {
  return {
    type: types.PRODUCT_EDITOR_START
  }
}

export function productEditorCancel() {
  return {
    type: types.PRODUCT_EDITOR_CANCEL
  }
}

export function companyPortfoiloSubmit(portfolio) {
  return async (dispatch, getState) => {
    let { company: { company: { link_name }} } = getState();
    if(!link_name) {
      link_name = portfolio.company.link_name;
    }
    const res = await Company().submitPortfolio({ link_name, data:portfolio });
    if (res.status === 200) {
      dispatch({type:types.COMPANY_PORTFOLIO_EDIT_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.COMPANY_PORTFOLIO_EDIT_FAILURE});
    } 
    return res;
  };
}

export function deleteCompanyPortfoilo(portfolio) {
  return async (dispatch, getState) => {
    const { company: { company: { link_name }} } = getState();
    const res = await Company().deletePortfolio({link_name, pid:portfolio.pid});
    if (res.status === 200 && !res.data.error) {
      dispatch({type:types.PORTFOLIO_DELETE_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.PORTFOLIO_DELETE_FAILURE, data: res.data});
    } 
    return res;
  };
}

export function productSubmit(product) {
  return async (dispatch, getState) => {
    const { company, user } = getState();
    const res = await Company().submitProduct({link_name: company.company.link_name, data:product});
    if (res.status === 200) {
      dispatch({type:types.PRODUCT_EDIT_SUCCESS, data: res.data});
    }
    else {
      dispatch({type:types.PRODUCT_EDIT_FAILURE});
    } 
    return res;
  };
}

export function follow(data) {
  return async (dispatch, getState) => {
    const res = await Company().follow({link_name: data.following.link_name, data: data.follower});
    if (res.status === 200) {
      dispatch({type:types.COMPANY_FOLLOWERS_UPDATED, data: res.data});
    }
    else {
      console.log(res);
    } 
    return res;
  };
}

export function unfollow(data) {
  return async (dispatch, getState) => {
    const res = await Company().unfollow({link_name: data.following.link_name, data: data.follower});
    if (res.status === 200) {
      dispatch({type:types.COMPANY_FOLLOWERS_UPDATED, data: res.data});
    }
    else {
      console.log(res);
    } 
    return res;
  };
}