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

      const res = await File().upload({ data : {file:file, name:file.name, userid:userid}});
      
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

export function uploadImage(userid, file, cb) {
  return async (dispatch, getState) => {
    // If the text box is empty
    if (!file.name || file.name.trim().length === 0) return;

    loadImage.parseMetaData(file, function(data) {

      let orientation = 0;
      //if exif data available, update orientation
      if (data.exif) {
          orientation = data.exif.get('Orientation');
      }

      //https://github.com/blueimp/JavaScript-Load-Image
      const ftype = _.last(file.name.split('.'));
      const loadingImage = loadImage( 
        file,
        async canvas => {
          var base64data = canvas.toDataURL('image/' + ftype);
          const res = await File().upload({ data : {file:base64data, name:file.name, userid:userid}});

          if (res.status === 200) {
            if(cb) cb(null, res.data);
          }

          return dispatch({
            type: types.UPLOADER_FILE_SELECTED,
            file: file
          });
        }, 
        {
          //should be set to canvas : true to activate auto fix orientation
          canvas: true,
          orientation: orientation,
          maxWidth: 1024
        }
      );
    });
  };
}
