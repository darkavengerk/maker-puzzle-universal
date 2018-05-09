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