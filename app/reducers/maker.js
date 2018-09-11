import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';
import { Maker } from '../utils/objects';

function update(state, newState) {
  return new Maker({...state.raw, ...newState});
}

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
      if(user._id === state._id) {
        portfolio.user = user;
        portfolio.project = project;
        portfolio.company = company;
        let replaced = false;
        const newPortfolios = state.portfolios.map(p => {
          if(p.pid === portfolio.pid) {
            replaced = true;
            return portfolio;
          }
          else return p;
        });
        if(!replaced) newPortfolios.push(portfolio);
        return {...user, portfolios: newPortfolios, isAddingPortfolio: false};
      }
      return state;

    case types.FOLLOWERS_UPDATED:
      return {...state, followers: action.data.following.followers}

    default:
      return state;
  }
};

const context = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.UPDATE_MAKER_CONTEXT:
      if (action.data) return update(state, action.data);
      return state;
    default:
      return update(state, maker(state, action));
  }
};

const reducer = combineReducers({
  maker,
  context
});

export default reducer;

