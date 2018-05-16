import { combineReducers } from 'redux';
import * as types from '../types';
import cloneDeep from 'lodash/cloneDeep';




const maker = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.maker) return action.data.maker;
      return state;
    case types.PROFILE_EDIT_SUCCESS:
      const data = action.data;
      return {...state, features: data.features, about: data.about, profile: data.profile}
    default:
      return state;
  }
};

const context = (
  state = {},
  action
) => {
  
  let data = action.data;

  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (data && data.maker) {
        return data.maker;
      }
      return state;

    case types.PROFILE_EDIT_ITEM_UPDATE:
      if(data.key==='about') 
        return {...state, about:data.text };
      else
        return {...state, features: updateFeature(state, data.key, data.text) };
    case types.PROFILE_EDIT_START:
      return {...state, editing: true};
    case types.PROFILE_EDIT_CANCEL:
      return {...state, features:action.data.maker.features, editing:false}
    case types.PROFILE_EDIT_FAILURE:
      return {...state, editing:true}
    case types.PROFILE_EDIT_SUCCESS:
      return {...state, editing:false}
    case types.UPDATE_PROFILE_IMG:
      let newState = {...state};
      newState.profile.picture = action.data;
      return newState;
    default:
      return state;
  }
};

const updateFeature = (maker, key, text) => {

  const features = maker.features;
  const updatedFeatures = features.map(feature => {
    if(feature.title === key) {
      return {...feature, content:text}
    }
    return feature;
  });
  return updatedFeatures;
};

const reducer = combineReducers({
  maker,
  context
});

export default reducer;

