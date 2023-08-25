import { Product } from "../models/products"
import { Items } from "../models/sales"

const ModelProduct = require('../database/models/products')
const ThirdPartyProducts = require('../third-parties');
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
    const offerProducts = await ModelProduct.find({ offer: { $ne: 0 },available: { $ne: 0 } } ).sort({ offer: -1 }).limit(limit || 10)
    return offerProducts
  }

  /**
 * Get The recent products
 *  @param limit
 */
  const getProductsByDate = async (limit:number) =>{
    const recentProducts = await ModelProduct.find({ available: { $ne: 0 } }).sort({ created: -1 }).limit(limit || 10)
    return recentProducts
  }

    /**
 * Get The recent products
 *  @param limit
 */
    const getProductsByRating = async (limit:number) =>{
      const recentProducts = await ModelProduct.find({ available: { $ne: 0 } }).sort({ rating: -1 }).limit(limit || 10)
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

 /**
 * Update Product quantity by id
 * @param productId
 * @param item Items
 */
 const updateProductQuantityById = async (productId:string,item:Items) => {
  const product = await ModelProduct.findById(productId)
  if(!product) return {error:'El producto no existe'}
  let updatedProduct = product
  updatedProduct.available = updatedProduct.available - item.quantity
  if(item.size && item.size !== null) {
    updatedProduct.sizes =  updatedProduct.sizes.map(size=>{
      if(size.size === item.size){
        const newSize = size.available - item.quantity
        return {...size,available:newSize}
      } 
      return size
    })
  } 

  try {
    const upProduct = await ModelProduct.updateOne(
        {_id:productId},updatedProduct)
    return {error:null,
        data:updatedProduct}
} catch (error) {
    return {error,data:null}
}
}



 /**
 * Create product
 * @param product
 */
 const createProduct = async (product:Product) => {
  const existName = await ModelProduct.find({name:product.name})

  if(!existName) return {error:'El nombre ya existe',data:null}

  try {
    const nProduct = new ModelProduct(product)
    const savedProduct = await nProduct.save()
    return {error:null,
        data:savedProduct}
} catch (error) {
    return {error,data:null}
}
}


 /**
 * Delete a product
 * @param product
 */
 const deleteProduct = async (productId:string) => {
  const objectIdProductId = new ThirdPartyProducts.mongooseTypes.Types.ObjectId(productId)
  const product = await ModelProduct.findById(objectIdProductId)


  if(!product) return {error:'El producto no existe',data:null}

  try {
    const deleteProd = await ModelProduct.deleteOne({_id: objectIdProductId })
    return {error:null,
        data:deleteProd}
} catch (error) {
    return {error,data:null}
}
 }

 /**
 * Update  product
 * @param product
 */
 const updateProduct = async (product:Product,productId:string) => {
  const objectIdProductId = new ThirdPartyProducts.mongooseTypes.Types.ObjectId(productId)
  const prod = await ModelProduct.findById(objectIdProductId)

  if(!prod) return {error:'El producto no existe',data:null}
  try {
    const upProd = await ModelProduct.updateOne({_id: objectIdProductId},product)
    return {error:null,
        data:product}
} catch (error) {
    return {error,data:null}
}


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
    getProductsByPageByCategory,
    updateProductQuantityById,
    createProduct,
    deleteProduct,
    updateProduct
  }