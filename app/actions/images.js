/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types';
import { File } from '../services';


function createTopicRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function loadImage(imageid) {
  return (dispatch, getState) => {

    if(!imageid) return {};

    const { image } = getState();

    if(image[imageid]) {
      return image[imageid];
    }

    File().loadImage({ imageid })
    .then(res => {
      if (res.status === 200) {
        dispatch({type:types.UPDATE_IMAGE_URLS, data: res.data});
      }
    })
    .catch(err => {
      console.log(err);
    });

    dispatch({type:types.UPDATE_IMAGE_URLS, data: {_id: imageid} });

    return {_id: imageid};
  };
}
