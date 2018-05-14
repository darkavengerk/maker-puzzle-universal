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
  return {
    type: types.PROFILE_EDIT_REQUEST
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