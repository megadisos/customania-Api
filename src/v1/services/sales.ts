import { Sale, SaleStatus } from "../models/sales"
const ModelUsers = require('../database/models/users')
const ModelSale = require('../database/models/sales')
const mongooseTypes = require('mongoose');

/**
 * Register New Sale
 * @param sale model
 */
const registerNewSale = async (sale:Sale) => {
    let isUsernameExist = false
    if(sale.userId && sale.userId.length === 24 ) {
            isUsernameExist = await ModelUsers.findOne({_id:sale.userId})
    }

const isTransactionIdCreated = await ModelSale.findOne({transactionId:sale.transactionId})

const saleObj = {
    userId: isUsernameExist?sale.userId:null,
    transactionId:sale.transactionId,
    status:sale.status,
    status_detail:sale.status_detail,
    payment_method_id:sale.payment_method_id,
    payer:sale.payer,
    additional_info:sale.additional_info,
    isDelivery:sale.isDelivery,
    delivery:sale.delivery?sale.delivery:null,
    delivery_status:sale.delivery_status,
    items:sale.items,
    ammount:sale.ammount
}
if(isTransactionIdCreated) {
    try {
        const rpSale = await ModelSale.replaceOne({transactionId:sale.transactionId},saleObj)
        return {error:null,
            data:rpSale}
    } catch (error) {
        return {error}
    }
   
}
    const nSAle = new ModelSale(saleObj)
    try {
        const savedSale = await nSAle.save();
       return {error:null,
                data:savedSale}
    } catch (error) {
        return {error}
    }
  }

  /**
 * Register New Sale
 * @param newStatus model
 * @param transactionId string
 */

const updateSaleStaus = async (newStatus:SaleStatus,transactionId:string) =>{
    const isTransactionIdCreated = await ModelSale.findOne({transactionId:transactionId})
    if(!isTransactionIdCreated) return {error:'La transaccion ID no existe'}
    try {
        const upSale = await ModelSale.updateOne(
            {transactionId:transactionId},
            {
                status:newStatus.status,
                status_detail:newStatus.status_detail,
                delivery_status:isTransactionIdCreated.isDelivery?newStatus.delivery_status:'to_deliver'
            })
        return {error:null,
            data:isTransactionIdCreated}
    } catch (error) {
        return {error}
    }
}

  /**
 * Get User sales
 * @param newStatus model
 * @param transactionId string
 */
const getUserSales = async (userId:string) =>{
    try {
       if(userId.length < 24) return {error:'not valid user Id',data:null}
        const objectIdUserId = new mongooseTypes.Types.ObjectId(userId)
        const sales =  await ModelSale.find({userId:objectIdUserId}).sort({ creationdate: -1 })
        return {error:null,data:sales}
    } catch (error) {
        return {error:error,data:null}
    }
}

/**
 * Get Sales by page
 */
const getSalesByPage = async (skip:number,limit:number) => {
  
    const sales = await ModelSale.find().skip(skip).limit(limit)
    return sales
  }
/**
 * Get Users count
 */
const getUserSalesCount = async (userId:String) =>{
    const objectIdUserId = new mongooseTypes.Types.ObjectId(userId)
    const productsCount = await ModelSale.count({userId:objectIdUserId})
    return productsCount
  }
  /**
 * Get All sales
 * @param newStatus model
 * @param transactionId string
 */
  const getAllSales = async () =>{
    try {
        const sales =  await ModelSale.find()
        return {error:null,data:sales}
    } catch (error) {
        return {error:error,data:null}
    }
}

  module.exports = {
    registerNewSale,
    updateSaleStaus,
    getUserSales,
    getAllSales,
    getUserSalesCount,
    getSalesByPage
}