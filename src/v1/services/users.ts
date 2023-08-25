const ModelUsers = require('../database/models/users')
const ThirdPt = require('../third-parties');

/**
 * Get User
 * @param user model
 */
const getUser = async (userId:string) => {
    try {
        const objectIdUserId = new ThirdPt.mongoose.Types.ObjectId(userId);
        let user = await ModelUsers.findOne({_id:objectIdUserId})
        if(!user) return {error:"User dont exist",data:null}
        user['password'] = null
        return {error:null,data:user}
    } catch (error) {
        return {error:error,data:null}
    }

  }

  module.exports = {
    getUser
  }