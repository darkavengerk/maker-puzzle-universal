/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const Portfolio = require('./portfolio');

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,
  type: { type: String, default: 'person', required: true }, //person, company

  profile: {
    name: { type: String, default: '' },
    userid: { type: String, required: true },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

  makerProfile: {
    companies: [{
      cid: ObjectId,
      name: String,
      period: String,
      position: String,
      order: Number
    }],
    abilities: [{
      title: String,
      ability: Number,
      order: Number
    }]
  },

  companyProfile: {
    projects: [ObjectId]
  },

  factors: [{
    title: String,
    content: String,
    order: Number,
    optional: Boolean // whether it is mandatory or not
  }],

  about: String,

  portfolios : [Portfolio],

  resetPasswordToken: String,
  resetPasswordExpires: Date,
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

export default mongoose.model('User', UserSchema);
