import { User } from "../models/authentication"
const ModelUsers = require('../database/models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Register New User
 * @param user model
 */
const registerNewUser = async (user:User) => {
    const isEmailExist = await ModelUsers.findOne({email:user.email})
    const isUsernameExist = await ModelUsers.findOne({username:user.username})
    if(isEmailExist) return {error:'Email ya registrado'}
    if(isUsernameExist) return {error:'Usuario ya registrado'}
      // hash contraseña
      const salt = await bcrypt.genSalt(12);
      const bpassword = await bcrypt.hash(user.password, salt);

    const nUser = new ModelUsers({
        username:user.username,
        password:bpassword,
        email:user.email,
        superadmin:false
    })
    try {
        const savedUser = await nUser.save();
       return {error:null,
                data:savedUser}
    } catch (error) {
        return {error}
    }
  }


  /**
 * Login User
 * @param user model
 */
const loginUser = async (user:User) => {
    const luser = await ModelUsers.findOne({username:user.username})
    if(!luser) return {error:'Usuario no existe'}

    // validacion de password
    const validPassword = await bcrypt.compare(user.password,luser.password)
    if(!validPassword) return {error:'Password no valido'}

     // create token
     const token = jwt.sign({
        name: user.username,
        id: user._id
    }, process.env.SERVER_TOKEN)

    return {error:null,data:'authenticado',token:token}

  }


  const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.SERVER_TOKEN)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}


module.exports = {
    registerNewUser,
    loginUser,
    verifyToken
}