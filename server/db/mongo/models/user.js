/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import {default as Portfolio} from './portfolio_schema';

const ObjectId = mongoose.Schema.Types.ObjectId;
const {AutoComplete} = require('../utils/autocomplete');

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({

  email: { type: String, unique: true, lowercase: true },
  userid: { type: String, unique: true, required: true },
  password: String,
  tokens: Array,

  uploadCount: {type: Number, default: 0},

  type: { type: String, default: 'maker', required: true },

  name: { type: String, default: '' },
  picture: {type: ObjectId, ref: 'ImageFile'},

  companiesOwned: [{type: ObjectId, ref: 'Company'}],

  makerProfile: {
    gender: { type: String, default: '' },
    companiesInfo: [{type: ObjectId, ref: 'Company'}],
    companies: [{
      name: String,
      link_name: String,
      period: {type: String, default: ''},
      position: {type: String, default: ''},
      order: Number,
      current: Boolean,
      profileImage: String,
    }],
    abilities: [{
      title: String,
      ability: Number,
      order: Number
    }]
  },

  features: [{
    title: String,
    repr: String,
    content: String,
    order: Number,
    placeholder: String,
    optional: Boolean // whether it is mandatory or not
  }],

  about: {
    type: String,
    default: ''
  },

  portfolios : [Portfolio],

  followings: [{type: ObjectId, ref: 'User'}],
  companyFollowings: [{type: ObjectId, ref: 'Company'}],
  followers: [{type: ObjectId, ref: 'User'}],

  marketingAgreed : { 
    type: Boolean,
    default: false
  },
  gender : String,
  birthYear: Number,

  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  score: {type: Number, default: 0},
  count: {type: Number, default: 0},
});

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

UserSchema.statics = {};

export default mongoose.model('User' , UserSchema);