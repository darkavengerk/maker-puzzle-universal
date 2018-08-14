import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';

const maker = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      if(action.pathname && !action.pathname.startsWith('/maker/'))
        return {};
      return state;
      
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.maker) return action.data.maker;
      return state;

    case types.PROFILE_EDIT_SUCCESS:
      const {features, about, picture} = action.data;
      return {...state, features, about, picture}
    
    case types.PORTFOLIO_EDITOR_START:
      return {...state, isAddingPortfolio: true}

    case types.PORTFOLIO_EDITOR_CANCEL:
      return {...state, isAddingPortfolio: false}
    
    case types.PORTFOLIO_EDIT_SUCCESS:
      const { user, company, project, portfolio } = action.data;
      portfolio.user = user;
      portfolio.project = project;
      portfolio.company = company;
      if(user._id === state._id)
        return {...state, portfolios: [...state.portfolios, portfolio], isAddingPortfolio: false};
      return state;

    default:
      return state;
  }
};

const reducer = combineReducers({
  maker
});

export default reducer;

