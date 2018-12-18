import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../reducers/user';
import fileUpload from '../reducers/fileUpload';
import topic from '../reducers/topic';
import message from '../reducers/message';
import people from '../reducers/people';
import maker from '../reducers/maker';
import main from '../reducers/main';
import more from '../reducers/more';
import search from '../reducers/search';
import company from '../reducers/company';
import project from '../reducers/project';
import param from '../reducers/param';
import image from '../reducers/image';
import screen from '../reducers/screen';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

const rootReducer = (state = {}, action) => {
  // const languageCodes = state.languages.map(language => language.code);
  const oldState = {...state};
  const makerState = oldState.maker;
  const userState = oldState.user;
  const account = {authenticated: userState.authenticated, userid: userState.authenticated? userState.account.userid : null};
  delete oldState.maker;

  const newState = combineReducers({
    isFetching,
    topic,
    fileUpload,
    main,
    more,
    search,
    user,
    // message,
    routing,
    people,
    // maker,
    project,
    company,
    param,
    image,
    screen
  })(oldState, action);

  return {
    ...newState, 
    maker: maker(makerState, {...action, account })
  };
};

export default rootReducer;
