import { combineReducers } from 'redux';
import * as types from '../types';

const images = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.UPDATE_IMAGE_URLS:
      const newImage = action.data;
      return {...state, [newImage._id]: newImage};
    default:
      return state;
  }
};

export default images;
