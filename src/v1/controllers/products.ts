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
  console.log('este es el total ',count)
  if(count === 0) return res.send({data:{},metadata})
  if(count < LIMIT) {
    const products = await  ProductsServices.getAllProducts()
    return res.send({data:products,metadata})
  }
  const pages = Math.ceil(count / LIMIT)

  if(page > pages) return res.status(400).send('La pagina no existe')
  const limit = LIMIT;
  const skip = LIMIT * (page - 1);
   console.log(skip,limit)
   const filteredProducts = await ProductsServices.getProductsByPage(skip,limit)
   return res.status(200).send({data:filteredProducts,metadata})
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