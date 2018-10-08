import * as types from '../types';
import { Project } from '../services';

export function featureEditSave(data) {
  return async (dispatch, getState) => {
    const { project } = getState();
    const res = await Project().updateProjectFeatures({link_name:project.project.link_name, data});
    
    if (res.status === 200) {
      dispatch({type:types.PROJECT_PROFILE_EDIT_SUCCESS, data});
    }
    else {
      dispatch({type:types.PROJECT_PROFILE_EDIT_FAILURE});
    } 
    return res;
  };

}