const express = require('express')
const pagamentoRoutes = require('./pagamento')
const credorRoutes = require('./credor')
const devedorRoutes = require('./enteDevedor')

const api = express.Router()
api.use('/credor', credorRoutes)
api.use('/pagamento', pagamentoRoutes)
api.use('/ente-devedor', devedorRoutes)

const router = express.Router()
router.use('/api', api)

module.exports = router;