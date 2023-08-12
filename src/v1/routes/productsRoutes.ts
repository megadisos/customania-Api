const ProdsController = require('../controllers/products')
const expressProds = require('express')
const routerProds = expressProds.Router()

routerProds.get('/products', ProdsController.getProductsController)
routerProds.get('/products/offer', ProdsController.getProductsByOfferController)
routerProds.get('/products/recents', ProdsController.getProductsByDateController)
routerProds.get('/products/ratings', ProdsController.getProductsByRatingController)
routerProds.get('/products/:id', ProdsController.getProductsByIdController)
routerProds.post('/products/update/:id', ProdsController.updateProductQuantityController)

module.exports = routerProds