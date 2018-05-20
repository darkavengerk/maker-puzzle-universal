import * as types from '../types';
import { Maker } from '../services';

export function featureEdited(key, text) {
  return {
    type: types.PROFILE_EDIT_ITEM_UPDATE,
    data : {
      text: text,
      key: key
    }
  };
}

export function featureEditStart() {
  return {
    type: types.PROFILE_EDIT_START
  };
}

export function featureEditSave() {
  return async (dispatch, getState) => {
    const { maker } = getState();
    const res = await Maker().updateMakerFeatures({id:maker.maker.userid, data:maker.context});
    
    if (res.status === 200) {
      return dispatch({type:types.PROFILE_EDIT_SUCCESS, data:maker.context});
    }
    return dispatch({type:types.PROFILE_EDIT_FAILURE});
  };
}

export function updateProfileImage(img) {
  return {
    type: types.UPDATE_PROFILE_IMG, 
    data: img
  };
}

export function featureEditCancel(maker) {
  return {
    type: types.PROFILE_EDIT_CANCEL,
    data: {
      maker: maker
    }
  };
}