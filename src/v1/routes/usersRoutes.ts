const UsersController = require('../controllers/users')
const expressUsers = require('express')
const routerUsers = expressUsers.Router()

routerUsers.get('/:id', UsersController.getUserController)

module.exports = routerUsers