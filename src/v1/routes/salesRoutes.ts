const SalesController =  require('../controllers/sales')
const expressSales = require('express')
const routerSales = expressSales.Router()

routerSales.post('/new-sale', SalesController.registerSaleController)
routerSales.post('/update-sale/:id', SalesController.updateSaleControllerByTransactionId)

module.exports = routerSales