import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';
import { Maker } from '../utils/objects';

function update(state, newState) {
  return new Maker({...state.raw, ...newState});
}

const context = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      if(action.pathname && !action.pathname.startsWith('/maker/'))
        return {};
      return state;
        
    case types.UPDATE_MAKER_CONTEXT:
      if (action.data) return update(state, action.data);
      return state;

    case types.REQUEST_SUCCESS:
      if (action.data && action.data.maker) return update(state, action.data.maker);
      return state;

    case types.PROFILE_EDIT_SUCCESS:
      const {features, about, picture} = action.data;
      return update(state, {features, about, picture});
    
    case types.PORTFOLIO_EDITOR_START:
      return update(state, {isAddingPortfolio: true})

    case types.PORTFOLIO_EDITOR_CANCEL:
      return update(state, {isAddingPortfolio: false})

    case types.PORTFOLIO_EDIT_SUCCESS:
      const { user, company, project, portfolio } = action.data;
      portfolio.user = user;
      portfolio.project = project;
      portfolio.company = company;
      if(user._id === state._id)
        return update(state, {portfolios: [...state.portfolios, portfolio], isAddingPortfolio: false}); 
      return state;

    case types.FOLLOWERS_UPDATED:
      return update(state, {followers: action.data.following.followers})
    
    default:
      return state;
  }
};

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
        return {...user, portfolios: [...state.portfolios, portfolio], isAddingPortfolio: false};
      return state;

    case types.FOLLOWERS_UPDATED:
      return {...state, followers: action.data.following.followers}

    default:
      return state;
  }
};

const reducer = combineReducers({
  maker,
  context
});

export default reducer;

