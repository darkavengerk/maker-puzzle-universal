/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {default as Portfolio} from './portfolio';

const {AutoComplete} = require('../utils/autocomplete')
const ObjectId = mongoose.Schema.Types.ObjectId;


const Schema = new mongoose.Schema({
  name: { type: String, unique: true},
  link_name: { type: String, unique: true },
  profilePicture: String,
  owner: {type: ObjectId, ref: 'User', default: null},
  projects: [{type: ObjectId, ref: 'Project'}],
  users: [{type: ObjectId, ref: 'User'}],
  features: [{
    title: String,
    content: String,
    editable: Boolean,
    optional: Boolean // whether it is mandatory or not
  }],
  portfolios : [Portfolio],
  companyPortfolios : [Portfolio]
});

Schema.pre('save', function(next) {
  this.link_name = this.name.replace(/\s/g, '_');
  next();
});

const CompanyModel = mongoose.model('Company' , Schema);

var configuration = {
    autoCompleteFields : ['name'],
    dataFields: ['name'],
    maximumResults: 10,
    model: CompanyModel
}

var companyNameAutoComplete = new AutoComplete(configuration, function(){
  console.log("Loaded " + companyNameAutoComplete.getCacheSize() + " companies in auto complete");
});

export default CompanyModel;

export const autoComplete = companyNameAutoComplete;
