const ProdsController = require('../controllers/products')
const expressProds = require('express')
const routerProds = expressProds.Router()

routerProds.get('/products', ProdsController.getProducts)

module.exports = routerProds