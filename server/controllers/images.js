import _ from 'lodash';
import User from '../db/mongo/models/user';
import fs  from 'fs-extra';

/**
 * List
 */
export function upload(req, res) {
  const data = req.body;
  const userid = data.userid;
  var chopper_index = 0; // safeguard

  var base64_marker = ';base64,';
  chopper_index = data.file.src.indexOf(base64_marker) + base64_marker.length;

  // Remove obsolete header
  var binary_buffer = Buffer.from(data.file.src.substr(chopper_index), 'base64');

  User.update({userid}, {$inc:{uploadCount:1}})
  .then(result => {
    User.findOne({userid})
    .then(userFound => {      
      const fname = '/images/' + userid + '/' + userFound.uploadCount + '__' + data.name;
      fs.outputFile('public' + fname, binary_buffer, 'Binary', (err, result) => {
        res.send(fname);
      });
    });
  })

}



export default {
  upload
};
