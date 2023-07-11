const MPServices = require("../services/mercadoPago");

/**
 *Get New Preference ID
 * @param req Express Request
 * @param res Express Response 
 */
const getNewPreferenceId = async (req,res) =>{
    const {body} = req
    const preferenceId = await MPServices.createPreferenceId(body)
    res.send({preferenceId})
}

module.exports = {
    getNewPreferenceId
}