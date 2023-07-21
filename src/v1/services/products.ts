const ModelProduct = require('../database/models/products')
/**
 * Get All products
 */
const getAllProducts = async () => {
    const products = await ModelProduct.find()
    return products
  }


  module.exports = {
    getAllProducts
  }