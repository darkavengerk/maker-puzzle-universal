/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {default as Portfolio} from './portfolio';

const {AutoComplete} = require('../utils/autocomplete')
const ObjectId = mongoose.Schema.Types.ObjectId;


const Schema = new mongoose.Schema({
  link_name: { type: String, unique: true },
  name: { type: String, unique: true},
  profilePicture: String,
  companies: [{type: ObjectId, ref: 'User'}],
  users: [{type: ObjectId, ref: 'User'}],
  features: [{
    title: String,
    content: String,
    editable: Boolean,
    optional: Boolean // whether it is mandatory or not
  }],
  portfolios : [Portfolio]
});

Schema.pre('save', function(next) {
  this.link_name = this.name.replace(/\s/g, '_');
  next();
});

const ProjectModel = mongoose.model('Project' , Schema);

var configuration = {
    autoCompleteFields : ['name'],
    dataFields: ['name'],
    maximumResults: 10,
    model: ProjectModel
}

var projectNameAutoComplete = new AutoComplete(configuration, function(){
  console.log("Loaded " + projectNameAutoComplete.getCacheSize() + " projects in auto complete");
});

export default ProjectModel;

export const autoComplete = projectNameAutoComplete;
