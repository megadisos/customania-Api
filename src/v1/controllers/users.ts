const usersServices = require('../services/users') 

const getUserController = async (req, res) => {
    const userId = req.params.id
    const user = await usersServices.getUser(userId)
    if(user.error === null) return res.status(200).send(user)
    return res.status(400).send(user)
  }

  module.exports = {
    getUserController
  }