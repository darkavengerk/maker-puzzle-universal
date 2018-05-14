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
      return {...state, features: updateFeature(state, data.key, data.text)};
    case types.PROFILE_EDIT_START:
      return {...state, editing: true};
    case types.PROFILE_EDIT_CANCEL:
      return {...state, features:action.data.maker.features, editing:false}
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
