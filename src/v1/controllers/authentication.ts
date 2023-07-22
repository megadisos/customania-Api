const AutServices =  require('../services/authentication')
/**
 *Register new user
 * @param req Express Request
 * @param res Express Response
 */
 const registerUserController= async (req, res) => {
    const { body } = req
    const user = await AutServices.registerNewUser(body)
    if(user.error === null) return res.status(200).send(user)
    return res.status(400).send(user.error)
  }

  /**
 *Login user
 * @param req Express Request
 * @param res Express Response
 */
 const loginUserController= async (req, res) => {
    const { body } = req
    const response = await AutServices.loginUser(body)
    if(response.error === null){
        
        return res.status(200).header('auth-token',response.token).send(response)
    } 
    return res.status(400).send(response.error)
  }
  
  module.exports = {
    registerUserController,
    loginUserController
  }