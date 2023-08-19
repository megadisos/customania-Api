const ProductsServices = require('../services/products')
const SharedService =  require('../services/shared')
const LIMIT = 12

/**
 * Get All Products
 * @param req Express Request
 * @param res Express Response
 */
const getProductsController = async (req, res) => {
  let { page, category } = req.query;
  page = parseInt(page);
  const limit = LIMIT;

  const count = category
    ? await ProductsServices.getProductsCountByCategory(category)
    : await ProductsServices.getProductsCount();

  const pagination = SharedService.paginate(count, page, limit);

  const metadata = {
    items: limit,
    totalItems: count,
    ...pagination,
  };

  if (count === 0) return res.send({ data: {}, metadata });

  // if (pagination.currentPage > pagination.totalPages) {
  //   return res.status(400).send('La pagina no existe');
  // }

  let products;

  if (count < limit) {
    products = category
      ? await ProductsServices.getAllProductsByCategory(category)
      : await ProductsServices.getAllProducts();
  } else {
    const skip = pagination.offset;
    products = category
      ? await ProductsServices.getProductsByPageByCategory(category, skip, limit)
      : await ProductsServices.getProductsByPage(skip, limit);
  }

  return res.status(200).send({ data: products, metadata });
};
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

  /**
 *Update product quantity
 * @param req Express Request
 * @param res Express Response
 */

 const updateProductQuantityController= async (req, res) => {
  const { body } = req
  const productId = req.params.id
console.log(body,productId)
  const response = await ProductsServices.updateProductQuantityById(productId,body)
  if(response.error === null) return res.status(200).send(response)
  return res.status(400).send(response.error)
}
  
  module.exports ={
    getProductsController,
    getProductsByIdController,
    getProductsByOfferController,
    getProductsByDateController,
    getProductsByRatingController,
    updateProductQuantityController
  }