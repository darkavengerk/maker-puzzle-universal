/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {default as Product} from './product_schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

// const Schema = new mongoose.Schema(Product);

const PortfolioModel = mongoose.model('Product', Product);

export default PortfolioModel;