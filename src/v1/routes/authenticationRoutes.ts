const AuthController = require('../controllers/authentication')
const expressAuth = require('express')
const routerAuth = expressAuth.Router()

routerAuth.post('/register', AuthController.registerUserController)
routerAuth.post('/login', AuthController.loginUserController)

module.exports = routerAuth