const mongooseUsers =  require('mongoose');

const usersSchema = new mongooseUsers.Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  creationdate: {
    required: true,
    type: Date,
    default:Date.now
  },
  username: {
    required: true,
    type: String
  },
  superadmin: {
    required: true,
    type: Boolean,
    default:false
  },
  
})
module.exports  =  mongooseUsers.model('Users', usersSchema)
