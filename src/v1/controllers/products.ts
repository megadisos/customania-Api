const ProductsServices = require('../services/products')
const LIMIT = 12
/**
 *Get All Products
 * @param req Express Request
 * @param res Express Response
 */
 const getProductsController = async (req, res) => {
  let {page,category} = req.query
   console.log(category)
  page = parseInt(page)
  const count = category ? await ProductsServices.getProductsCountByCategory(category): await  ProductsServices.getProductsCount()
  let metadata = { items:LIMIT,
    totalItems: count,
    page:page}
  if(count === 0) return res.send({data:{},metadata})
  const pages = Math.ceil(count / LIMIT)
  metadata['TotalPages'] = pages
  if(page > pages) return res.status(400).send('La pagina no existe')
  console.log(page,pages)
  if(count < LIMIT) {
    const products =category ? await ProductsServices.getAllProductsByCategory(category): await  ProductsServices.getAllProducts()
    return res.send({data:products,metadata})
  }

  
  const limit = LIMIT;
  const skip = LIMIT * (page - 1);
   const filteredProducts = category ? await ProductsServices.getProductsByPageByCategory(category,skip,limit):await ProductsServices.getProductsByPage(skip,limit)
   return res.status(200).send({data:filteredProducts,metadata})
  }
  /**
 *Get 10 Offer products
 * @param req Express Request
 * @param res Express Response
 */
  const getProductsByOfferController = async (req,res) =>{
    let {limit} = req.query
    limit =  parseInt(limit)
    const products = await ProductsServices.getProductsByOffer(limit)
    return res.status(200).send(products)
  }

  /**
 *Get All Products with offer
 * @param req Express Request
 * @param res Express Response
 */
 const getProductsByIdController = async (req, res) => {
  const id = req.params.id
  const product = await  ProductsServices.getProductById(id)
  res.send(product)
}


  /**
 *Get  products by date
 * @param req Express Request
 * @param res Express Response
 */
 const getProductsByDateController = async (req,res) =>{
  let {limit} = req.query
  limit =  parseInt(limit)
  const products = await ProductsServices.getProductsByDate(limit)
  return res.status(200).send(products)
}
  

  /**
 *Get  products by rating
 * @param req Express Request
 * @param res Express Response
 */
 const getProductsByRatingController = async (req,res) =>{
  let {limit} = req.query
  limit =  parseInt(limit)
  const products = await ProductsServices.getProductsByRating(limit)
  return res.status(200).send(products)
}
  
  module.exports ={
    getProductsController,
    getProductsByIdController,
    getProductsByOfferController,
    getProductsByDateController,
    getProductsByRatingController
  }