const MPServices = require("../services/mercadoPago");

/**
 *Get New Preference ID
 * @param req Express Request
 * @param res Express Response 
 */
const getNewPreferenceId = async (req,res) =>{
    
    const {body} = req
    const preferenceId = await MPServices.createPreferenceId(body)
    res.send(preferenceId)
}

/**
 *Get New Preference ID
 * @param req Express Request
 * @param res Express Response 
 */
 const getProcessPayment = async (req,res) =>{
    const {body} = req
    const response = await MPServices.processPayment(body)
    const jsonResponse = {
        status: response && response.status,
        status_detail: response && response.status_detail,
        id:response && response.id
    }
    res.send(jsonResponse)
}

module.exports = {
    getNewPreferenceId,
    getProcessPayment
}