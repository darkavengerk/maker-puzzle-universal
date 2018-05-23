import * as types from '../types';
import { Maker } from '../services';

export function featureEditSave(data) {
  return async (dispatch, getState) => {
    const { maker } = getState();
    const res = await Maker().updateMakerFeatures({id:maker.maker.userid, data});
    
    if (res.status === 200) {
      dispatch({type:types.PROFILE_EDIT_SUCCESS, data});
    }
    else {
      dispatch({type:types.PROFILE_EDIT_FAILURE});
    } 
    return res;
  };

}

export function portfoiloEditorStart() {
  return {
    type: types.PORTFOLIO_EDITOR_START
  }
}