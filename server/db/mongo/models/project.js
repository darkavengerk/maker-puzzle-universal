/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {default as Portfolio} from './portfolio_schema';

const {AutoComplete} = require('../utils/autocomplete')
const ObjectId = mongoose.Schema.Types.ObjectId;


const Schema = new mongoose.Schema({
  link_name: { type: String, unique: true },
  name: { type: String, unique: true},
  profilePicture: {type: ObjectId, ref: 'ImageFile'},
  companies: [{type: ObjectId, ref: 'Company'}],
  users: [{type: ObjectId, ref: 'User'}],
  features: [{
    title: String,
    repr: String,
    content: String,
    order: Number,
    placeholder: String,
    optional: Boolean // whether it is mandatory or not
  }],
  portfolios : [Portfolio],
  score: {type: Number, default: 0},
  count: {type: Number, default: 0},
  lastUpdated: {type:Date, default: Date.now},
});

Schema.pre('save', function(next) {
  if(this.name) 
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
