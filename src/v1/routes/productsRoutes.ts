const ProdsController = require('../controllers/products')
const expressProds = require('express')
const routerProds = expressProds.Router()

routerProds.get('/products', ProdsController.getProductsController)
routerProds.get('/products/:id', ProdsController.getProductsByIdController)

module.exports = routerProds