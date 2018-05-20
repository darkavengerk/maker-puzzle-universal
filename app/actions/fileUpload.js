/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { Image } from '../services';


function createTopicRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

function createTopicFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function uploadFile(userid, file, cb) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (file.name && file.name.trim().length <= 0) return;

    let reader = new FileReader();

    reader.onloadend = async () => {
      file.src = reader.result;

      const res = await Image().upload({ data : {file:file, name:file.name, userid:userid}});
      
      if (res.status === 200) {
        if(cb) cb(null, res.data);
      }

      return dispatch({
        type: types.UPLOADER_FILE_SELECTED,
        file: file
      });
    }

    reader.readAsDataURL(file);
  };
}
