const ProductsServices = require('../services/products')
/**
 *Get All Products
 * @param req Express Request
 * @param res Express Response
 */
 const getProductsController = async (req, res) => {
    const products = await  ProductsServices.getAllProducts()
    res.send(products)
  }

  /**
 *Get All Products
 * @param req Express Request
 * @param res Express Response
 */
 const getProductsByIdController = async (req, res) => {
  const id = req.params.id
  const product = await  ProductsServices.getProductById(id)
  res.send(product)
}

  

  module.exports ={
    getProductsController,
    getProductsByIdController
  }