const SalesServices = require('../services/sales')
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

  module.exports = {
    registerSaleController,
    updateSaleControllerByTransactionId
  }