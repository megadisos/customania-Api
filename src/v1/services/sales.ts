import { Sale, SaleStatus } from "../models/sales"
const ModelUsers = require('../database/models/users')
const ModelSale = require('../database/models/sales')
const mongoose = require('mongoose');
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
  module.exports = {
    registerNewSale,
    updateSaleStaus
}