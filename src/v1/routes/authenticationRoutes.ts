const AuthController = require('../controllers/authentication')
const expressAuth = require('express')
const routerAuth = expressAuth.Router()

routerAuth.post('/register', AuthController.registerUserController)
routerAuth.post('/login', AuthController.loginUserController)
routerAuth.post('/valid-token', AuthController.isTokenValidController)
routerAuth.post('/logout', AuthController.logOutUserController)

module.exports = routerAuth