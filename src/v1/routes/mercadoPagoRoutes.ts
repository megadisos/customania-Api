
const MPController = require("../controllers/mercadoPago")
const expressMP = require('express')
const router = expressMP.Router()

router.post('/generar-preference-id',MPController.getNewPreferenceId)
router.post('/process_payment',MPController.getProcessPayment)

module.exports =  router