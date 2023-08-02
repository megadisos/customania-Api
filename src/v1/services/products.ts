const ModelProduct = require('../database/models/products')
/**
 * Get All products
 */
const getAllProducts = async () => {
    const products = await ModelProduct.find()
    return products
  }
/**
 * Get All products
 */
const getProductsCount = async () =>{
  const productsCount = await ModelProduct.count()
  return productsCount
}
/**
 * Get All products
 */
const getProductsByPage = async (skip:number,limit:number) => {
  
    const products = await ModelProduct.find().skip(skip).limit(limit)
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
    getProductById,
    getProductsCount,
    getProductsByPage
  }