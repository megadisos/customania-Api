import { Schema } from "mongoose";

const mongooseAuth =  require('mongoose');

const authSchema = new mongooseAuth.Schema({
  userid: {
    required: true,
    type: Schema.ObjectId
  },
  token: {
    required: true,
    type: String
  },
  creationdate: {
    required: true,
    type: Date,
    default:Date.now
  },  
})
module.exports  =  mongooseAuth.model('Auth', authSchema)
