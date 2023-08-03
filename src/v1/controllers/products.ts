const ProductsServices = require('../services/products')
const LIMIT = 10
/**
 *Get All Products
 * @param req Express Request
 * @param res Express Response
 */
 const getProductsController = async (req, res) => {
  let {page} = req.query
  page = parseInt(page)
  const count =  await  ProductsServices.getProductsCount()
  const metadata = { items:LIMIT,
    totalItems: count,
    page:page}
  if(count === 0) return res.send({data:{},metadata})
  if(count < LIMIT) {
    const products = await  ProductsServices.getAllProducts()
    return res.send({data:products,metadata})
  }
  const pages = Math.ceil(count / LIMIT)

  if(page > pages) return res.status(400).send('La pagina no existe')
  const limit = LIMIT;
  const skip = LIMIT * (page - 1);
   const filteredProducts = await ProductsServices.getProductsByPage(skip,limit)
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