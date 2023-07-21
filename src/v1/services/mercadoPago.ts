import { type PaymentInfo, type Prefrence } from '../models/mercadoPago'
const mercadopago = require('mercadopago')
require('dotenv').config()
/**
 * Mercado Pago authentication
 */
const authenticationMercadoPago = () => {
  mercadopago.configure({
    access_token: process.env.MPAccessToken
  })
}
/**
 * Create preference
 * @param preference Prefrence interface
 */
const createPreferenceId = (preference: Prefrence) => {
  authenticationMercadoPago()
  return mercadopago.preferences.create(preference)
    .then(function (response) {
    // Este valor es el ID de preferencia que se enviará al ladrillo al inicio
      return response.body.id
    }).catch(function (error) {
      console.log(error)
    })
}

/**
 * Create preference
 * @param preference Prefrence interface
 */
const processPayment = (paymentInfo: PaymentInfo) => {
  authenticationMercadoPago()
  return mercadopago.payment.save(paymentInfo)
    .then((resp) => {
      return resp.body
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = {
  createPreferenceId,
  processPayment
}
