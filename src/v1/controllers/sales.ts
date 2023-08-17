const SalesServices = require('../services/sales')
const SharedServices =  require('../services/shared')

/**
 *Register new sale
 * @param req Express Request
 * @param res Express Response
 */
 const registerSaleController= async (req, res) => {
    const { body } = req
    console.log(body)
    const sale = await SalesServices.registerNewSale(body)
    if(sale.error === null) return res.status(200).send(sale)
    return res.status(400).send(sale.error)
  }

  /**
 *Update sale status
 * @param req Express Request
 * @param res Express Response
 */

 const updateSaleControllerByTransactionId= async (req, res) => {
  const { body } = req
  const transactionId = req.params.id

  const sale = await SalesServices.updateSaleStaus(body,transactionId)
  if(sale.error === null) return res.status(200).send(sale)
  return res.status(400).send(sale.error)
}

/**
 *Get user sale
 * @param req Express Request
 * @param res Express Response
 */
 const getUserSalesController= async (req, res) => {
  const LIMIT = 1
  const {page} = req.query
  const userId = req.params.id
  const salesCount = await SalesServices.getUserSalesCount(userId)
  console.log(salesCount)
  const pagination =  SharedServices.applyPagination(LIMIT,page,salesCount)

  if(pagination.msg === 'no-data') return res.status(200).send({data:[],error:null,metadata:pagination.metadata})
  
  if(pagination.msg === 'no-page') return res.status(400).send({data:null,error:'No page'})
  
  
  if(pagination.msg === 'less-limit'){
    const sale = await SalesServices.getUserSales(userId)
    return res.status(200).send({...sale,metadata:pagination.metadata})
  } 
  if(pagination.msg === 'data'){
    const sale = await SalesServices.getSalesByPage(pagination.skip,pagination.limit)
    return res.status(200).send({data:sale,error:null,metadata:pagination.metadata})
  } 
  }

  /**
 *Get sales
 * @param req Express Request
 * @param res Express Response
 */
 const getSalesController= async (req, res) => {

  const sale = await SalesServices.getAllSales()
  if(sale.error === null) return res.status(200).send(sale)
  return res.status(400).send(sale.error)
}
  module.exports = {
    registerSaleController,
    updateSaleControllerByTransactionId,
    getUserSalesController,
    getSalesController
  }