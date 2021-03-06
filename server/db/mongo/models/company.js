/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {default as Portfolio} from './portfolio_schema';
import {default as Product} from './product_schema';

const {AutoComplete} = require('../utils/autocomplete')
const ObjectId = mongoose.Schema.Types.ObjectId;


const Schema = new mongoose.Schema({
  name: { type: String, unique: true},
  link_name: { type: String, unique: true },
  profilePicture: {type: ObjectId, ref: 'ImageFile'},
  owners: [{type: ObjectId, ref: 'User'}],
  projects: [{type: ObjectId, ref: 'Project'}],
  users: [{type: ObjectId, ref: 'User'}],
  followers: [{type: ObjectId, ref: 'User'}],
  features: [{
    title: String,
    repr: String,
    content: String,
    order: Number,
    placeholder: String,
    optional: Boolean // whether it is mandatory or not
  }],
  portfolios : [Portfolio],
  companyPortfolios : [Portfolio],
  products : [Product],
  score: {type: Number, default: 0},
  count: {type: Number, default: 0},
});

Schema.pre('save', function(next) {
  if(this.name)
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
