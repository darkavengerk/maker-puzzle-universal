import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';

const project = (
  state = {portfolios:[]},
  action
) => {
  switch (action.type) {
    
    case types.CREATE_REQUEST:
      if(action.pathname && !action.pathname.startsWith('/project/'))
        return {portfolios:[]};
      return state;
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.project) return action.data.project;
      return state;

    case types.PROJECT_PROFILE_EDIT_SUCCESS:
      const { features, profilePicture } = action.data;
      return {...state, features, profilePicture}

    case types.PORTFOLIO_EDIT_SUCCESS:
      const { user, company, project, portfolio } = action.data;
      if(project._id === state._id) {
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

    case types.PORTFOLIO_DELETE_SUCCESS:
      const pidDeleted = action.data.pid;
      if(pidDeleted) {
        const portfolios = state.portfolios.filter(p => p.pid !== pidDeleted);
        return {...state, portfolios};
      }
      else return state;

    default:
      return state;
  }
};

const reducer = combineReducers({
  project
});

export default reducer;

