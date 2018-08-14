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
    
    case types.PORTFOLIO_EDITOR_START:
      return {...state, isAddingPortfolio: true}

    case types.PRODUCT_EDITOR_START:
      return {...state, isAddingProduct: true}

    case types.COMPANY_PORTFOLIO_EDITOR_CANCEL:
      return {...state, isAddingPortfolio: false}
    
    case types.COMPANY_PORTFOLIO_EDIT_SUCCESS:
      const { company, project, portfolio } = action.data;
      portfolio.project = project;
      portfolio.company = company;
      return {...state, companyPortfolios: [...state.companyPortfolios, portfolio], isAddingPortfolio: false};

    case types.PRODUCT_EDIT_SUCCESS:
      const { product } = action.data;
      return {...state, products: [...state.products, product], isAddingProduct: false};

    default:
      return state;
  }
};

const reducer = combineReducers({
  company
});

export default reducer;

