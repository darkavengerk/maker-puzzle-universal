/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { voteService } from '../services';


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

export function uploadFile(file) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (file.name && file.name.trim().length <= 0) return;

    const { fileUpload : { files }} = getState();
    let reader = new FileReader();

    reader.onloadend = () => {
      file.src = reader.result;
      return dispatch({
        type: types.UPLOADER_FILE_SELECTED,
        file: file
      });
    }

    reader.readAsDataURL(file);
  };
}
