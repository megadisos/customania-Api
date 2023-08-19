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
 * Get user sale
 * @param req Express Request
 * @param res Express Response
 */
const getUserSalesController = async (req, res) => {
  const LIMIT =2;
  const { page } = req.query;
  const userId = req.params.id;

  const sales = await SalesServices.getUserSales(userId);
  const totalSales = sales.length;

  const currentPage = parseInt(page) || 1;
  const pagination = SharedServices.paginate(totalSales, currentPage, LIMIT);
  if (!Array.isArray(sales)) {
    return res.status(500).send('Error retrieving user sales');
  }
  const offset = pagination.offset;
  const limit = pagination.limit;

  const userSales = sales.slice(offset, offset + limit);
  return res.status(200).send({ data: userSales, metadata: pagination });
};
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