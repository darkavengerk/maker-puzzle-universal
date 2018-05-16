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

    reader.onloadend = () => {
      file.src = reader.result;

      Image().upload({ data : {file:file, name:file.name, userid:userid}}).then((res) => {
        if (res.status === 200) {
          if(cb) cb(null, res.data);
        }
      })
      .catch((res) => {
        console.log(res);
        // return dispatch(createTopicFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });

      return dispatch({
        type: types.UPLOADER_FILE_SELECTED,
        file: file
      });
    }

    reader.readAsDataURL(file);
  };
}
