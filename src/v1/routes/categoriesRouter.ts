const CatController = require('../controllers/categories')
const expressCat = require('express')
const routerCat = expressCat.Router()

routerCat.get('',CatController.getCategoriesController)


module.exports = routerCat