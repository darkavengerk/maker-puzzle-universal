/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {default as Portfolio} from './portfolio';

const ObjectId = mongoose.Schema.Types.ObjectId;
const {AutoComplete} = require('../utils/autocomplete')

const Schema = new mongoose.Schema({
  workType: String,
  name: String,
  link_name: String,
  location: String,
  homepage: String,
  telephone: String,
  capacity: String,
  profileImage: String,
  backImage: String,
  tags: [String],
  projects: [{type: ObjectId, ref: 'Project'}],
  users: [{type: ObjectId, ref: 'User'}],
  images: [{
    rid: Number
  }],
  portfolios : [Portfolio]
});

Schema.pre('save', function(next) {
  this.link_name = this.name.replace(/\s/g, '_');
  next();
});

const model = mongoose.model('Company' , Schema);

var configuration = {
    autoCompleteFields : ['name'],
    dataFields: ['name'],
    maximumResults: 10,
    model: model
}

var projectNameAutoComplete = new AutoComplete(configuration, function(){
  console.log("Loaded " + projectNameAutoComplete.getCacheSize() + " companies in auto complete");
});

export default model;

export const autoComplete = projectNameAutoComplete;