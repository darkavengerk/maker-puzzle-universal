import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';
import { Maker } from '../utils/objects';

function update(state, newState) {
  return new Maker({...state.raw, ...newState});
}

const maker = (
  state = {portfolios:[]},
  action
) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
        return {portfolios:[], picture: null};
      // if(action.pathname && !action.pathname.startsWith('/maker/'))
      // return state;
      
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.maker) return action.data.maker;
      return state;

    case types.OWNER_ADDED_COMPANY:
      if (action.data && action.data.maker) return action.data.maker;
      return state;

    case types.PROFILE_EDIT_SUCCESS:
      const {features, about, picture} = action.data;
      return {...state, features, about, picture}
    
    case types.PORTFOLIO_DELETE_SUCCESS:
      const pidDeleted = action.data.pid;
      if(pidDeleted) {
        const portfolios = state.portfolios.filter(p => p.pid !== pidDeleted);
        return {...state, portfolios: portfolios};
      }
      else return state;

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
        return {...state, portfolios: newPortfolios};
      }
      return state;

    case types.FOLLOWERS_UPDATED:
      if(action.data.following.userid === state.userid)
        return {...state, followers: action.data.following.followers};
      if(action.data.follower.userid === state.userid)
        return {...state, followings: action.data.follower.followings};
      return state;
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
    case types.CREATE_REQUEST:
      return {};
    case types.REQUEST_SUCCESS:
    case types.PROFILE_EDIT_SUCCESS:
    case types.PORTFOLIO_DELETE_SUCCESS:
    case types.PORTFOLIO_EDIT_SUCCESS:
    case types.FOLLOWERS_UPDATED:
      return update(state, maker(state, action));
    default:
      return state;
  }
};

const reducer = combineReducers({
  maker,
  context
});

export default reducer;

