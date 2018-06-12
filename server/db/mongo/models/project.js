/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const {AutoComplete} = require('../utils/autocomplete')
const ObjectId = mongoose.Schema.Types.ObjectId;

import {default as Portfolio} from './portfolio';

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  catagory: String,
  companies: [{type: ObjectId, ref: 'Company'}],
  users: [{type: ObjectId, ref: 'User'}],
  images: [{
      rid: String
  }],
  portfolios : [Portfolio]
});

const ProjectModel = mongoose.model('Project' , Schema);

var configuration = {
    autoCompleteFields : ['name'],
    dataFields: ['name'],
    maximumResults: 10,
    model: ProjectModel
}

var projectNameAutoComplete = new AutoComplete(configuration, function(){
  console.log("Loaded " + projectNameAutoComplete.getCacheSize() + " words in auto complete");
});

export default ProjectModel;

export const autoComplete = projectNameAutoComplete;
