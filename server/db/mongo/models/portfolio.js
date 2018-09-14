/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {default as Portfolio} from './portfolio_schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// const Schema = new mongoose.Schema(Portfolio);

const PortfolioModel = mongoose.model('Portfolio' , Portfolio);

export default PortfolioModel;