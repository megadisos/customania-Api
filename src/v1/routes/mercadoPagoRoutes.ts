
const MPController = require("../controllers/mercadoPago")
const expressMP = require('express')
const router = expressMP.Router()

router.get('/generar-preference-id',MPController.getNewPreferenceId)

module.exports =  router