import { Schema } from "mongoose";

const mongo =  require('../../third-parties/index');

const categoriesSchema = new mongo.mongoose.Schema({

  name: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  }, 
})
module.exports  =  mongo.mongoose.model('CAtegories', categoriesSchema)
