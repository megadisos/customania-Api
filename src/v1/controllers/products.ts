const ProductsServices = require('../services/products')
/**
 *Get New Preference ID
 * @param req Express Request
 * @param res Express Response
 */
 const getProducts = async (req, res) => {
    const products = await  ProductsServices.getAllProducts()
    res.send([products])
  }
  

  module.exports ={
    getProducts
  }