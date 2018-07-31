import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';

const company = (
  state = {portfolios:[], companyPortfolios:[], products:[] },
  action
) => {
  switch (action.type) {
    
    case types.LOGIN_SUCCESS_USER:
      return action.data;
    
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.company) return action.data.company;
      return state;
    
    case types.PORTFOLIO_EDITOR_START:
      return {...state, isAddingPortfolio: true}

    case types.PRODUCT_EDITOR_START:
      return {...state, isAddingProduct: true}

    case types.PORTFOLIO_EDITOR_CANCEL:
      return {...state, isAddingPortfolio: false}
    
    case types.PORTFOLIO_EDIT_SUCCESS:
      const { company, portfolio } = action.data;
      if(company._id === state._id)
        return {...state, portfolios: [...state.portfolios, portfolio], isAddingPortfolio: false};
      return state;

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

