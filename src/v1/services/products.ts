const ModelProduct = require('../database/models/products')
/**
 * Get All products
 */
const getAllProducts = async () => {
    const products = await ModelProduct.find()
    return products
  }


 /**
 * Get Product by id
 * @param id
 */
const getProductById = async (id:string) => {
  const product = await ModelProduct.findById(id)
  return product
}


  module.exports = {
    getAllProducts,
    getProductById
  }