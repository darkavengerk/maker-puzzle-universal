import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';

const company = (
  state = {portfolios:[], companyPortfolios:[], products:[], features:[] },
  action
) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
    if(action.pathname && !action.pathname.startsWith('/company/'))
        return {portfolios:[], companyPortfolios:[], products:[], features:[] };
      return state;
    
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.company) return action.data.company;
      return state;

    case types.COMPANY_PROFILE_EDIT_SUCCESS:
      const { features, profilePicture } = action.data;
      return {...state, features, profilePicture}
    
    case types.PORTFOLIO_DELETE_SUCCESS:
      const pidDeleted = action.data.pid;
      if(pidDeleted) {
        const portfolios = state.portfolios.filter(p => p.pid !== pidDeleted);
        const cPortfolios = state.companyPortfolios.filter(p => p.pid !== pidDeleted);
        return {...state, portfolios: portfolios, companyPortfolios: cPortfolios};
      }
      else return state;

    case types.OWNER_ADDED_COMPANY:
      if (action.data && action.data.company && action.data.company.name === state.name) {
        return {...state, owners: [...(state.owners || []), action.data.maker]};
      }
      return state;
    
    case types.COMPANY_PORTFOLIO_EDIT_SUCCESS:
      const { company, project, portfolio } = action.data;
      portfolio.project = project;
      portfolio.company = company;

      let replaced = false;
      const newPortfolios = state.companyPortfolios.map(p => {
        if(p.pid === portfolio.pid) {
          replaced = true;
          return portfolio;
        }
        else return p;
      });
      if(!replaced) newPortfolios.unshift(portfolio);
      return {...state, companyPortfolios: newPortfolios};

    case types.PRODUCT_EDIT_SUCCESS:
      const { product } = action.data;
      return {...state, products: [...state.products, product]};

    case types.COMPANY_FOLLOWERS_UPDATED:
      return {...state, followers: action.data.following.followers}

    default:
      return state;
  }
};

const reducer = combineReducers({
  company
});

export default reducer;

