import _ from 'lodash';
import  { models } from '../db';
import fs  from 'fs-extra';

const { 
  User,
  Image : ImageFile 
} = models;


/**
 * List
 */
export async function upload(req, res) {
  const data = req.body;
  const userid = data.userid;
  var chopper_index = 0; // safeguard
  var base64_marker = ';base64,';
  chopper_index = data.file.src.indexOf(base64_marker) + base64_marker.length;
  // Remove obsolete header
  var binary_buffer = Buffer.from(data.file.src.substr(chopper_index), 'base64');
  try {
    await User.update({userid}, {$inc:{uploadCount:1}});
    const userFound = await User.findOne({userid});
    const fname = '/images/' + userid + '/' + userFound.uploadCount + '.' + _.last(data.name.split('.'));
    await fs.outputFile('public' + fname, binary_buffer, 'Binary');
    const image = await ImageFile.create({original: fname});
    res.send(image);
  }
  catch(e) {
    res.status(400).send('Upload failed');
  }
}

export async function image(req, res) {
  const imageid = req.params.image;
  const imageFound = await ImageFile.findOne({ _id: imageid });
  res.json(imageFound);
}

export default {
  upload,
  image
};
