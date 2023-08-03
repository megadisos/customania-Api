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
 * Get All products by category
 */
const getAllProductsByCategory = async (category:string) => {
  const products = await ModelProduct.find({type:category})
  return products
}
/**
* Get All products by category
*/
const getProductsCountByCategory = async (category:string) =>{
const productsCount = await ModelProduct.count({type:category})
return productsCount
}

/**
 * Get All products
 */
const getProductsByPageByCategory = async (category:string,skip:number,limit:number) => {
  
  const products = await ModelProduct.find({type:category}).skip(skip).limit(limit)
  return products
}

/**
 * Get All products
 */
const getProductsByPage = async (skip:number,limit:number) => {
  
    const products = await ModelProduct.find().skip(skip).limit(limit)
    return products
  }

/**
 * Get All offer Products
 * @param limit
 */
  const getProductsByOffer = async (limit:number) =>{
    const offerProducts = await ModelProduct.find({ offer: { $ne: 0 } } ).sort({ offer: -1 }).limit(limit || 10)
    return offerProducts
  }

  /**
 * Get The recent products
 *  @param limit
 */
  const getProductsByDate = async (limit:number) =>{
    const recentProducts = await ModelProduct.find().sort({ created: -1 }).limit(limit || 10)
    return recentProducts
  }

    /**
 * Get The recent products
 *  @param limit
 */
    const getProductsByRating = async (limit:number) =>{
      const recentProducts = await ModelProduct.find().sort({ rating: -1 }).limit(limit || 10)
      return recentProducts
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
    getProductsByPage,
    getProductsByOffer,
    getProductsByDate,
    getProductsByRating,
    getProductsCountByCategory,
    getAllProductsByCategory,
    getProductsByPageByCategory
  }